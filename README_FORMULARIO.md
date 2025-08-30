# Formulario de Contacto ARREGLA - Instrucciones de Instalación

## 📋 Archivos incluidos

- `index.html` - Página web principal con el formulario
- `process_form.php` - Script PHP que procesa el formulario y envía emails
- `config.php` - Archivo de configuración (opcional)
- `README_FORMULARIO.md` - Este archivo con instrucciones

## 🚀 Instalación y Configuración

### 1. Subir archivos al servidor

Sube todos los archivos a tu servidor web (que soporte PHP):
- `index.html`
- `process_form.php`
- `config.php` (opcional)

### 2. Configurar el email

**Opción A: Configuración simple (recomendada)**
Edita el archivo `process_form.php` y cambia estas líneas:

```php
$to_email = "contacto@arregla.com"; // Cambia por tu email
$from_email = "noreply@arregla.com"; // Cambia por tu email de envío
```

**Opción B: Usar archivo de configuración**
Si prefieres usar el archivo `config.php`, edítalo con tus datos y modifica `process_form.php` para que lo use.

### 3. Configurar permisos

Asegúrate de que el directorio `uploads/` tenga permisos de escritura:
```bash
chmod 755 uploads/
```

### 4. Probar el formulario

1. Abre tu sitio web en el navegador
2. Llena el formulario con datos de prueba
3. Verifica que recibas el email

## 📧 Características del formulario

### ✅ Validaciones incluidas:
- Campos obligatorios
- Validación de email
- Validación de archivos (PDF, JPG, PNG)
- Tamaño máximo de archivo (10MB)
- Autorización requerida

### 📎 Archivos adjuntos:
- Soporte para PDF, JPG y PNG
- Máximo 10MB por archivo
- Los archivos se envían como adjuntos en el email

### 🎨 Notificaciones:
- Mensajes de éxito y error
- Animaciones suaves
- Auto-ocultación después de 5 segundos

## 🔧 Personalización

### Cambiar el email de destino:
```php
$to_email = "tu-email@tudominio.com";
```

### Cambiar el asunto del email:
```php
$subject = "Tu asunto personalizado";
```

### Modificar validaciones:
Edita las validaciones en `process_form.php` según tus necesidades.

## 🛠️ Solución de problemas

### El formulario no envía emails:
1. Verifica que tu servidor soporte PHP
2. Confirma que la función `mail()` esté habilitada
3. Revisa los logs de error del servidor

### Los archivos no se suben:
1. Verifica permisos del directorio `uploads/`
2. Confirma que el directorio existe
3. Revisa la configuración de `upload_max_filesize` en PHP

### Emails van a spam:
1. Configura SPF, DKIM y DMARC en tu dominio
2. Usa un email válido de tu dominio como remitente
3. Considera usar un servicio de email transaccional

## 📞 Soporte

Si tienes problemas con la instalación:
1. Revisa los logs de error del servidor
2. Verifica que todos los archivos estén subidos correctamente
3. Confirma que PHP esté funcionando en tu servidor

## 🔒 Seguridad

- El formulario incluye validación tanto en frontend como backend
- Los archivos se validan antes de subir
- Se limpian los datos de entrada para prevenir XSS
- Los archivos temporales se eliminan después del envío

## 📝 Notas importantes

- Este formulario usa la función `mail()` de PHP, que puede no funcionar en todos los servidores
- Para mayor confiabilidad, considera usar un servicio como SendGrid, Mailgun o AWS SES
- Los archivos se almacenan temporalmente y se eliminan después del envío
- El formulario está optimizado para móviles y escritorio
