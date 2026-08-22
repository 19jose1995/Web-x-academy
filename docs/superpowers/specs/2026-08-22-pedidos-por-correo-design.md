# Pedidos de paquetes por correo — Diseño

## Contexto

X Academy tiene un componente `PackagesSection.jsx` completo (4 paquetes de clases con precio en RD$) que nunca se montó en la página. El objetivo es activarlo y conectarlo a un flujo de "pedido": el visitante elige un paquete, deja sus datos de contacto, y el pedido llega por correo a `info@xacademy.com.do` para que el staff lo siga manualmente (llamada/WhatsApp para coordinar pago). **No hay pago en línea** — es explícitamente fuera de alcance.

El sitio ya tiene un patrón probado para esto: `RegistrationForm.jsx` envía datos a `send_email.php` (PHP `mail()` en el hosting compartido). Este diseño reutiliza y extiende ese patrón en vez de introducir infraestructura nueva.

**Hallazgo relacionado (no en alcance de este trabajo, documentado para referencia):** `RegistrationForm.jsx`'s `handleSubmit` no llama a `e.preventDefault()`, así que la pantalla de éxito animada ("🎉 ¡Registro enviado!") casi nunca se ve — el navegador ya está navegando a `/send_email.php` → `gracias.html` antes de que React re-renderice. Este diseño no repite ese patrón: el envío de pedidos usa `fetch()` con `preventDefault()` correcto desde el inicio.

## Alcance

**Incluye:**
- Reescribir y montar `PackagesSection.jsx` (grid de 4 paquetes, alineado a `DESIGN.md`: relleno sólido de color de marca, iconos `lucide-react`, borde delgado).
- Modal de pedido (subcomponente dentro de `PackagesSection.jsx`) con 2 campos: nombre completo, teléfono o correo.
- Envío vía `fetch()` a una rama nueva de `send_email.php` existente.
- Confirmación y manejo de error dentro del propio modal, sin navegación fuera de la SPA.

**Explícitamente fuera de alcance:**
- Pago en línea / pasarela de pago.
- Persistencia de pedidos en base de datos (el correo ES el registro del pedido).
- Modificar el flujo de `RegistrationForm.jsx` existente (incluyendo el bug de `preventDefault` mencionado arriba — se documenta, no se corrige aquí).
- Selección de múltiples paquetes o cantidad en un mismo pedido (un pedido = un paquete).

## Componentes

### `PackagesSection.jsx` (reescrito)

- Se importa y monta en `App.jsx`, después de la sección Horarios.
- Datos de los 4 paquetes se mantienen (título, precio, subtítulo, clases incluidas, color de marca por paquete), pero el color se resuelve contra la paleta de `DESIGN.md` (magenta/azul/verde/naranja) en vez de valores sueltos como `#5568af` o `#ff8c00`.
- Cada tarjeta: relleno sólido del color de categoría (no gradiente, no borde de 4px), icono `lucide-react` en vez de emoji, reutilizando el mismo mapeo ya establecido en el resto del sitio:
  - Stage Star (🎤) → `Mic2`
  - Arte en Movimiento (🩰) → `Music2`
  - Pequeños en Escena (🌟) → `Sparkles`
  - Street Vibes (🔥) → `Flame`
- Botón "Inscribirme" abre el modal de pedido con `estado local` (`selectedPackage`), igual patrón que `Gallery.jsx` (lightbox) y `MaestrosDestacados.jsx` (perfil).

### Modal de pedido (subcomponente interno)

- Overlay + panel, mismo lenguaje visual que los otros modales del sitio (fondo oscuro semitransparente, panel blanco/oscuro centrado, botón de cierre con icono `X` de lucide).
- Encabezado muestra el paquete elegido (nombre + precio), no editable desde el modal (para cambiar de paquete, se cierra y se elige otro).
- Campos:
  - **Nombre completo** (texto, requerido)
  - **Teléfono o correo electrónico** (texto, requerido, un solo campo — sin validación estricta de formato ya que acepta cualquiera de los dos)
- Botón "Enviar pedido".

## Datos y flujo de envío

1. Usuario llena el modal y da clic en "Enviar pedido".
2. `onSubmit` llama `e.preventDefault()`, arma un `FormData` (o `URLSearchParams`) con: `type=pedido`, `package=<título del paquete>`, `name`, `contact`.
3. `fetch('/send_email.php', { method: 'POST', body: ... })`.
4. Éxito (HTTP 200): modal cambia a estado de confirmación inline — "¡Pedido recibido! Te contactaremos pronto para coordinar los detalles y el pago." + botón de cerrar.
5. Error (fetch falla o respuesta no-200): modal muestra mensaje de error con botón "Reintentar" y un enlace de respaldo a WhatsApp (`https://wa.me/18093815369`) con el paquete pre-mencionado en el texto del mensaje.

## Backend: `send_email.php`

Se extiende el archivo existente, no se crea uno nuevo. Al inicio del script:

```php
$type = $_POST['type'] ?? 'registro';

if ($type === 'pedido') {
    $package = filter_input(INPUT_POST, 'package', FILTER_SANITIZE_STRING);
    $name    = filter_input(INPUT_POST, 'name',    FILTER_SANITIZE_STRING);
    $contact = filter_input(INPUT_POST, 'contact', FILTER_SANITIZE_STRING);

    $to      = 'info@xacademy.com.do';
    $subject = 'Nuevo pedido en X Academy';
    $message = "Nuevo pedido recibido en X Academy:\r\n\r\n";
    $message .= "Paquete: $package\r\n";
    $message .= "Nombre: $name\r\n";
    $message .= "Contacto: $contact\r\n";

    $headers  = "From: no-reply@xacademy.com.do\r\n";
    // "contact" puede ser teléfono o correo; solo se usa como Reply-To si es un correo válido
    // (un teléfono ahí generaría una cabecera Reply-To inválida).
    if (filter_var($contact, FILTER_VALIDATE_EMAIL)) {
        $headers .= "Reply-To: $contact\r\n";
    }
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $subject, $message, $headers)) {
        http_response_code(200);
        echo 'OK';
    } else {
        http_response_code(500);
        echo 'ERROR';
    }
    exit;
}

// --- lógica de registro existente, sin cambios, sigue aquí abajo ---
```

La rama `registro` (el formulario actual) queda intacta — mismo comportamiento, misma redirección a `gracias.html`. La rama `pedido` nunca redirige: responde texto plano + código HTTP, que es lo que el `fetch()` del frontend necesita para decidir éxito/error.

## Limitación conocida

`npm run dev` (Vite) no ejecuta PHP. Durante desarrollo solo se puede verificar la UI del modal y que el `fetch()` se dispare correctamente (se puede comprobar con las devtools de red, aunque la petición falle contra `/send_email.php` en local). La entrega real de correo solo se confirma desplegando al hosting real — igual que ya ocurre hoy con el formulario de registro existente.

## Testing

No hay framework de pruebas automatizadas en este proyecto. Verificación manual:
- En local: abrir cada paquete, confirmar que el modal se abre con el paquete correcto, que la validación de campos requeridos funciona, y que el estado de error se muestra correctamente cuando el `fetch` falla (esperado en local, ya que no hay servidor PHP).
- Después de desplegar: enviar un pedido de prueba real por cada uno de los 4 paquetes y confirmar que el correo llega a `info@xacademy.com.do` con los datos correctos.
