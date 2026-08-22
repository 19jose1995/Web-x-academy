<?php

$type = $_POST['type'] ?? 'registro';

if ($type === 'pedido') {
    $package = filter_input(INPUT_POST, 'package', FILTER_SANITIZE_STRING);
    $name    = filter_input(INPUT_POST, 'name',    FILTER_SANITIZE_STRING);
    $contact = filter_input(INPUT_POST, 'contact', FILTER_SANITIZE_STRING);

    $to      = 'info@xacademy.com.do';
    $subject = 'Nuevo pedido en X Academy';
    $message  = "Nuevo pedido recibido en X Academy:\r\n\r\n";
    $message .= "Paquete: $package\r\n";
    $message .= "Nombre: $name\r\n";
    $message .= "Contacto: $contact\r\n";

    $headers = "From: no-reply@xacademy.com.do\r\n";
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

// 1) Destino del correo:
$to      = 'info@xacademy.com.do';
$subject = 'Nuevo registro en X Academy';

// 2) Recogida y saneamiento de datos:
$name     = filter_input(INPUT_POST, 'name',     FILTER_SANITIZE_STRING);
$birthday = filter_input(INPUT_POST, 'birthday', FILTER_SANITIZE_STRING);
$guardian = filter_input(INPUT_POST, 'guardian', FILTER_SANITIZE_STRING);
$email    = filter_input(INPUT_POST, 'email',    FILTER_VALIDATE_EMAIL);
$phone    = filter_input(INPUT_POST, 'phone',    FILTER_SANITIZE_STRING);
$class    = filter_input(INPUT_POST, 'class',    FILTER_SANITIZE_STRING);

// 3) Construcción del mensaje:
$message  = "Nuevo registro recibido en X Academy:\r\n\r\n";
$message .= "Nombre completo: $name\r\n";
$message .= "Fecha de nacimiento: $birthday\r\n";
$message .= "Tutor legal: $guardian\r\n";
$message .= "Correo electrónico: $email\r\n";
$message .= "Teléfono: $phone\r\n";
$message .= "Clase elegida: $class\r\n";

// 4) Cabeceras:
$headers  = "From: no-reply@xacademy.com.do\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// 5) Envío y redirección:
if ( mail($to, $subject, $message, $headers) ) {
    header('Location: gracias.html');
    exit;
} else {
    echo 'Error al enviar el formulario. Por favor, intenta de nuevo.';
}
?>
