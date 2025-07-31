<?php
// 1) Destino del correo:
$to      = 'info@xacademy.com.do';
$subject = 'Nuevo registro en X Academy';

// 2) Recogida y saneamiento de datos:
$name     = filter_input(INPUT_POST, 'name',     FILTER_SANITIZE_STRING);
$birthday = filter_input(INPUT_POST, 'birthday', FILTER_SANITIZE_STRING);
$guardian = filter_input(INPUT_POST, 'guardian', FILTER_SANITIZE_STRING);
<<<<<<< HEAD
=======
$interest = filter_input(INPUT_POST, 'interest', FILTER_SANITIZE_STRING);
>>>>>>> e35b3d432a8050c4433dec60043ef7c793c83c4f
$email    = filter_input(INPUT_POST, 'email',    FILTER_VALIDATE_EMAIL);
$phone    = filter_input(INPUT_POST, 'phone',    FILTER_SANITIZE_STRING);
$class    = filter_input(INPUT_POST, 'class',    FILTER_SANITIZE_STRING);

// 3) Construcción del mensaje:
$message  = "Nuevo registro recibido en X Academy:\r\n\r\n";
$message .= "Nombre completo: $name\r\n";
$message .= "Fecha de nacimiento: $birthday\r\n";
$message .= "Tutor legal: $guardian\r\n";
<<<<<<< HEAD
=======
$message .= "Áreas de interés: $interest\r\n";
>>>>>>> e35b3d432a8050c4433dec60043ef7c793c83c4f
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
