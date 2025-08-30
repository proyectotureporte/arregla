<?php
// Configurar headers para JSON
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Habilitar reporte de errores para debug
error_reporting(E_ALL);
ini_set('display_errors', 0); // No mostrar errores en pantalla, solo en logs

// Configuración de email - CAMBIA ESTOS VALORES
$to_email = "ferneyolicas@gmail.com"; // Cambia por tu email
$from_email = "ferneyolicas@gmail.com"; // Cambia por tu email de envío

// Función para enviar respuesta JSON
function sendJsonResponse($success, $message, $errors = null) {
    $response = ["success" => $success, "message" => $message];
    if ($errors !== null) {
        $response["errors"] = $errors;
    }
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    exit;
}

// Verificar que el formulario fue enviado por POST
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    http_response_code(405);
    sendJsonResponse(false, "Método no permitido");
}

// Iniciar try-catch para capturar errores
try {

// Función para limpiar datos de entrada
function clean_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Recoger y limpiar los datos del formulario
$name = clean_input($_POST['name'] ?? '');
$cedula = clean_input($_POST['cedula'] ?? '');
$ciudad = clean_input($_POST['ciudad'] ?? '');
$telefono = clean_input($_POST['telefono'] ?? '');
$email = clean_input($_POST['email'] ?? '');
$autorizacion = isset($_POST['autorizacion']) ? 'Sí' : 'No';

// Validaciones básicas
$errors = [];

if (empty($name)) {
    $errors[] = "El nombre es requerido";
}

if (empty($cedula)) {
    $errors[] = "La cédula es requerida";
}

if (empty($ciudad)) {
    $errors[] = "La ciudad es requerida";
}

if (empty($telefono)) {
    $errors[] = "El teléfono es requerido";
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "El email es requerido y debe ser válido";
}

if (!isset($_POST['autorizacion'])) {
    $errors[] = "Debe autorizar el tratamiento de datos";
}

// Si hay errores, devolverlos
if (!empty($errors)) {
    http_response_code(400);
    sendJsonResponse(false, "Errores de validación", $errors);
}

// Procesar archivo adjunto si existe
$attachment_info = "";
$attachment_path = null;

if (isset($_FILES['document']) && $_FILES['document']['error'] == 0) {
    $file = $_FILES['document'];
    $file_name = $file['name'];
    $file_size = $file['size'];
    $file_tmp = $file['tmp_name'];
    $file_type = $file['type'];
    
    // Validar tipo de archivo
    $allowed_types = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!in_array($file_type, $allowed_types)) {
        $errors[] = "Tipo de archivo no permitido. Solo se permiten PDF, JPG y PNG";
    }
    
    // Validar tamaño (máximo 10MB)
    if ($file_size > 10 * 1024 * 1024) {
        $errors[] = "El archivo es demasiado grande. Máximo 10MB";
    }
    
    if (empty($errors)) {
        // Crear directorio de uploads si no existe
        $upload_dir = "uploads/";
        if (!file_exists($upload_dir)) {
            mkdir($upload_dir, 0755, true);
        }
        
        // Generar nombre único para el archivo
        $file_extension = pathinfo($file_name, PATHINFO_EXTENSION);
        $unique_name = uniqid() . '_' . time() . '.' . $file_extension;
        $attachment_path = $upload_dir . $unique_name;
        
        // Mover archivo
        if (move_uploaded_file($file_tmp, $attachment_path)) {
            $attachment_info = "Archivo adjunto: $file_name ($file_size bytes)";
        } else {
            $errors[] = "Error al subir el archivo";
        }
    }
}

// Si hay errores con el archivo, devolverlos
if (!empty($errors)) {
    http_response_code(400);
    sendJsonResponse(false, "Errores de validación", $errors);
}

// Crear el asunto del email con formato personalizado
$subject = "$name de $ciudad - Arregla.com.co";

// Crear el contenido del email con formato profesional
$message = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            padding: 0; 
            background-color: #f5f5f5;
        }
        .email-container { 
            max-width: 700px; 
            margin: 20px auto; 
            background: white; 
            border-radius: 12px; 
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header { 
            background: linear-gradient(135deg, #0052cc 0%, #3b82f6 100%); 
            color: white; 
            padding: 30px 20px; 
            text-align: center; 
        }
        .header h1 { 
            margin: 0; 
            font-size: 28px; 
            font-weight: 700; 
        }
        .header .subtitle { 
            margin: 10px 0 0 0; 
            font-size: 16px; 
            opacity: 0.9; 
        }
        .content { 
            padding: 40px 30px; 
        }
        .report-title {
            font-size: 24px;
            font-weight: 600;
            color: #0052cc;
            margin-bottom: 30px;
            text-align: center;
            border-bottom: 3px solid #0052cc;
            padding-bottom: 15px;
        }
        .client-info {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 25px;
            margin-bottom: 30px;
            border-left: 5px solid #0052cc;
        }
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
        }
        .info-item {
            display: flex;
            flex-direction: column;
        }
        .info-label {
            font-weight: 600;
            color: #0052cc;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
        }
        .info-value {
            font-size: 16px;
            color: #333;
            font-weight: 500;
        }
        .authorization-section {
            background: #e8f5e8;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            border-left: 5px solid #28a745;
        }
        .attachment-section {
            background: #fff3cd;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            border-left: 5px solid #ffc107;
        }
        .footer { 
            background: #f8f9fa; 
            padding: 25px; 
            text-align: center; 
            color: #666; 
            font-size: 14px;
            border-top: 1px solid #e9ecef;
        }
        .footer .logo {
            font-weight: 700;
            color: #0052cc;
            font-size: 18px;
        }
        .timestamp {
            color: #6c757d;
            font-size: 12px;
            margin-top: 10px;
        }
        @media (max-width: 600px) {
            .info-grid {
                grid-template-columns: 1fr;
            }
            .email-container {
                margin: 10px;
            }
            .content {
                padding: 20px 15px;
            }
        }
    </style>
</head>
<body>
    <div class='email-container'>
        <div class='header'>
            <h1>ARREGLA</h1>
            <p class='subtitle'>Salvamos tu patrimonio</p>
        </div>
        
        <div class='content'>
            <div class='report-title'>
                📋 INFORME DE CONTACTO CLIENTE
            </div>
            
            <div class='client-info'>
                <h3 style='margin-top: 0; color: #0052cc; font-size: 20px;'>👤 Información del Cliente</h3>
                <div class='info-grid'>
                    <div class='info-item'>
                        <div class='info-label'>Nombre Completo</div>
                        <div class='info-value'>$name</div>
                    </div>
                    <div class='info-item'>
                        <div class='info-label'>Cédula de Identidad</div>
                        <div class='info-value'>$cedula</div>
                    </div>
                    <div class='info-item'>
                        <div class='info-label'>Ciudad</div>
                        <div class='info-value'>$ciudad</div>
                    </div>
                    <div class='info-item'>
                        <div class='info-label'>Teléfono</div>
                        <div class='info-value'>$telefono</div>
                    </div>
                </div>
                <div class='info-item' style='margin-top: 15px;'>
                    <div class='info-label'>Correo Electrónico</div>
                    <div class='info-value'>$email</div>
                </div>
            </div>
            
            <div class='authorization-section'>
                <h4 style='margin-top: 0; color: #28a745;'>✅ Autorización Legal</h4>
                <p style='margin: 0; font-weight: 500;'>El cliente ha autorizado el tratamiento de datos personales y la consulta en centrales de riesgo.</p>
            </div>
            
            <div class='attachment-section'>
                <h4 style='margin-top: 0; color: #856404;'>📎 Documentos Adjuntos</h4>
                <p style='margin: 0; font-weight: 500;'>" . ($attachment_info ? $attachment_info : "No se adjuntaron documentos") . "</p>
            </div>
            
            <div style='background: #e3f2fd; border-radius: 8px; padding: 20px; margin-top: 25px; border-left: 5px solid #2196f3;'>
                <h4 style='margin-top: 0; color: #1976d2;'>📞 Próximos Pasos</h4>
                <p style='margin: 0; font-weight: 500;'>Cliente solicita diagnóstico gratuito. Se recomienda contactar dentro de las próximas 24 horas para agendar cita de evaluación.</p>
            </div>
        </div>
        
        <div class='footer'>
            <div class='logo'>ARREGLA.COM.CO</div>
            <p>Expertos en negociación, finanzas y derecho financiero</p>
            <div class='timestamp'>
                Informe generado el " . date('d/m/Y') . " a las " . date('H:i:s') . "
            </div>
        </div>
    </div>
</body>
</html>
";

// Configurar headers del email
$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: ' . $from_email,
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion()
];

// Si hay archivo adjunto, usar multipart
if ($attachment_path && file_exists($attachment_path)) {
    $boundary = md5(time());
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: multipart/mixed; boundary="' . $boundary . '"',
        'From: ' . $from_email,
        'Reply-To: ' . $email,
        'X-Mailer: PHP/' . phpversion()
    ];
    
    $body = "--$boundary\r\n";
    $body .= "Content-Type: text/html; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= $message . "\r\n";
    
    // Adjuntar archivo
    $file_content = file_get_contents($attachment_path);
    $file_content = chunk_split(base64_encode($file_content));
    $file_name = $_FILES['document']['name'];
    
    $body .= "--$boundary\r\n";
    $body .= "Content-Type: application/octet-stream; name=\"$file_name\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n";
    $body .= "Content-Disposition: attachment; filename=\"$file_name\"\r\n\r\n";
    $body .= $file_content . "\r\n";
    $body .= "--$boundary--\r\n";
    
    $message = $body;
}

// Enviar email
$mail_sent = mail($to_email, $subject, $message, implode("\r\n", $headers));

// Limpiar archivo temporal
if ($attachment_path && file_exists($attachment_path)) {
    unlink($attachment_path);
}

// Respuesta
if ($mail_sent) {
    sendJsonResponse(true, "Formulario enviado correctamente. Te contactaremos pronto.");
} else {
    http_response_code(500);
    sendJsonResponse(false, "Error al enviar el formulario. Por favor, inténtalo de nuevo.");
}

} catch (Exception $e) {
    // Capturar cualquier error inesperado
    error_log("Error en process_form.php: " . $e->getMessage());
    http_response_code(500);
    sendJsonResponse(false, "Error interno del servidor. Por favor, inténtalo de nuevo.");
}
?>
