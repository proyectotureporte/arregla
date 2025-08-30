<?php
// Configuración de email para ARREGLA
// IMPORTANTE: Cambia estos valores por los tuyos antes de usar

// Email donde recibirás los formularios
$config['to_email'] = "contacto@arregla.com";

// Email desde el cual se enviarán los mensajes (debe ser un email válido de tu dominio)
$config['from_email'] = "noreply@arregla.com";

// Nombre que aparecerá como remitente
$config['from_name'] = "ARREGLA - Formulario de Contacto";

// Asunto del email
$config['subject'] = "Nuevo formulario de contacto - ARREGLA";

// Configuración del servidor SMTP (opcional, para usar en lugar de mail() de PHP)
$config['smtp'] = [
    'host' => 'smtp.gmail.com', // Cambia por tu servidor SMTP
    'port' => 587,
    'username' => 'tu-email@gmail.com', // Cambia por tu email
    'password' => 'tu-password', // Cambia por tu contraseña
    'encryption' => 'tls'
];

// Configuración de archivos
$config['upload'] = [
    'max_size' => 10 * 1024 * 1024, // 10MB máximo
    'allowed_types' => ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'],
    'upload_dir' => 'uploads/'
];

// Configuración de validación
$config['validation'] = [
    'required_fields' => ['name', 'cedula', 'ciudad', 'telefono', 'email', 'autorizacion'],
    'email_regex' => '/^[^\s@]+@[^\s@]+\.[^\s@]+$/'
];

return $config;
?>
