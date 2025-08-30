// Vercel Function para procesar el formulario
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  // Configurar headers CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Método no permitido'
    });
  }

  // Verificar variables de entorno
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Variables de entorno faltantes');
    return res.status(500).json({
      success: false,
      message: 'La configuración del servidor de correo está incompleta. Por favor, contacta al administrador del sitio.'
    });
  }

  try {
    const { name, cedula, ciudad, telefono, email, autorizacion, attachment } = req.body;

    // Validaciones
    const errors = [];
    if (!name || !name.trim()) errors.push('El nombre es requerido');
    if (!cedula || !cedula.trim()) errors.push('La cédula es requerida');
    if (!ciudad || !ciudad.trim()) errors.push('La ciudad es requerida');
    if (!telefono || !telefono.trim()) errors.push('El teléfono es requerido');
    if (!email || !email.trim() || !isValidEmail(email)) errors.push('El email es requerido y debe ser válido');
    if (!autorizacion) errors.push('Debe autorizar el tratamiento de datos');

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Errores de validación',
        errors: errors
      });
    }

    // Configurar el transporter de email para Zoho
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.eu',
      port: 465,
      secure: true, // true para 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // --- INICIO CAMBIOS ---
    // 1. Generar timestamp en zona horaria de Colombia
    const now = new Date();
    const colombiaDate = now.toLocaleDateString('es-CO', { timeZone: 'America/Bogota' });
    const colombiaTime = now.toLocaleTimeString('es-CO', { timeZone: 'America/Bogota', hour12: true });
    // --- FIN CAMBIOS ---

    // Crear el asunto del email
    const subject = `${name} de ${ciudad} - Arregla.com.co`;

    // Crear el contenido del email HTML
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
            .email-container { max-width: 700px; margin: 20px auto; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); overflow: hidden; }
            .header { background: linear-gradient(135deg, #0052cc 0%, #3b82f6 100%); color: white; padding: 30px 20px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
            .header .subtitle { margin: 10px 0 0 0; font-size: 16px; opacity: 0.9; }
            .content { padding: 40px 30px; }
            .report-title { font-size: 24px; font-weight: 600; color: #0052cc; margin-bottom: 30px; text-align: center; border-bottom: 3px solid #0052cc; padding-bottom: 15px; }
            .client-info { background: #f8f9fa; border-radius: 8px; padding: 25px; margin-bottom: 30px; border-left: 5px solid #0052cc; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
            .info-item { display: flex; flex-direction: column; }
            .info-label { font-weight: 600; color: #0052cc; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; }
            .info-value { font-size: 16px; color: #333; font-weight: 500; }
            .authorization-section { background: #e8f5e8; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 5px solid #28a745; }
            .footer { background: #f8f9fa; padding: 25px; text-align: center; color: #666; font-size: 14px; border-top: 1px solid #e9ecef; }
            .footer .logo { font-weight: 700; color: #0052cc; font-size: 18px; }
            .timestamp { color: #6c757d; font-size: 12px; margin-top: 10px; }
            @media (max-width: 600px) { .info-grid { grid-template-columns: 1fr; } .email-container { margin: 10px; } .content { padding: 20px 15px; } }
        </style>
    </head>
    <body>
        <div class='email-container'>
            <div class='header'><h1>ARREGLA</h1><p class='subtitle'>Salvamos tu patrimonio</p></div>
            <div class='content'>
                <div class='report-title'>📋 INFORME DE CONTACTO CLIENTE</div>
                <div class='client-info'>
                    <h3 style='margin-top: 0; color: #0052cc; font-size: 20px;'>👤 Información del Cliente</h3>
                    <div class='info-grid'>
                        <div class='info-item'><div class='info-label'>Nombre Completo</div><div class='info-value'>${name}</div></div>
                        <div class='info-item'><div class='info-label'>Cédula de Identidad</div><div class='info-value'>${cedula}</div></div>
                        <div class='info-item'><div class='info-label'>Ciudad</div><div class='info-value'>${ciudad}</div></div>
                        <div class='info-item'><div class='info-label'>Teléfono</div><div class='info-value'>${telefono}</div></div>
                    </div>
                    <div class='info-item' style='margin-top: 15px;'><div class='info-label'>Correo Electrónico</div><div class='info-value'>${email}</div></div>
                </div>
                <div class='authorization-section'><h4 style='margin-top: 0; color: #28a745;'>✅ Autorización Legal</h4><p style='margin: 0; font-weight: 500;'>El cliente ha autorizado el tratamiento de datos personales y la consulta en centrales de riesgo.</p></div>
                <div style='background: #e3f2fd; border-radius: 8px; padding: 20px; margin-top: 25px; border-left: 5px solid #2196f3;'><h4 style='margin-top: 0; color: #1976d2;'>📞 Próximos Pasos</h4><p style='margin: 0; font-weight: 500;'>Cliente solicita diagnóstico gratuito. Se recomienda contactar dentro de las próximas 24 horas para agendar cita de evaluación.</p></div>
            </div>
            <div class='footer'>
                <div class='logo'>ARREGLA.COM.CO</div>
                <p>Expertos en negociación, finanzas y derecho financiero</p>
                <div class='timestamp'>Informe generado el ${colombiaDate} a las ${colombiaTime}</div>
            </div>
        </div>
    </body>
    </html>
    `;

    // --- INICIO CAMBIOS ---
    // 2. Preparar el objeto de opciones del correo
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.TO_EMAIL || 'contacto@arregla.com.co',
      subject: subject,
      html: htmlContent,
      replyTo: email,
      attachments: [] // Inicializar array de adjuntos
    };

    // 3. Si hay un adjunto, procesarlo y añadirlo
    if (attachment && attachment.content) {
        // Extraer el contenido Base64 puro del Data URL
        const base64Data = attachment.content.split(';base64,').pop();
        
        mailOptions.attachments.push({
            filename: attachment.filename,
            content: base64Data,
            contentType: attachment.contentType,
            encoding: 'base64'
        });
    }
    // --- FIN CAMBIOS ---

    // Enviar el email
    await transporter.sendMail(mailOptions);

    // Respuesta exitosa
    return res.status(200).json({
      success: true,
      message: 'Formulario enviado correctamente. Te contactaremos pronto.'
    });

  } catch (error) {
    console.error('Error al procesar formulario:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor. Por favor, inténtalo de nuevo.',
      debug: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

// Función para validar email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
