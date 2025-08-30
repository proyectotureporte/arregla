# Formulario ARREGLA - Configuración para Vercel

## 🚀 Instalación en Vercel

### 1. **Subir archivos a Vercel**
- Sube todos los archivos a tu repositorio de GitHub
- Conecta el repositorio con Vercel
- Vercel detectará automáticamente que es un proyecto Node.js

### 2. **Configurar variables de entorno en Vercel**

Ve a tu proyecto en Vercel → Settings → Environment Variables y agrega:

```
EMAIL_USER = tu-email@gmail.com
EMAIL_PASS = tu-contraseña-de-aplicacion
TO_EMAIL = contacto@arregla.com.co
```

### 3. **Configurar Gmail para envío de emails**

#### Opción A: Gmail con contraseña de aplicación
1. Ve a tu cuenta de Google
2. Activa la verificación en 2 pasos
3. Genera una "Contraseña de aplicación" para Gmail
4. Usa esa contraseña en `EMAIL_PASS`

#### Opción B: Otros proveedores
Puedes cambiar el servicio en `api/send-form.js`:
```javascript
const transporter = nodemailer.createTransporter({
  service: 'outlook', // o 'yahoo', 'hotmail', etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

### 4. **Desplegar**
```bash
vercel --prod
```

## 📧 **Configuración de Email**

### **Email de destino:** `contacto@arregla.com.co`

### **Formato del email:**
- **Asunto:** "Nombre de Cliente de Ciudad - Arregla.com.co"
- **Contenido:** Informe profesional con todos los datos del formulario
- **Formato:** HTML con diseño corporativo

## 🔧 **Archivos importantes:**

- `index.html` - Página web principal
- `api/send-form.js` - Función serverless para procesar formularios
- `package.json` - Dependencias de Node.js
- `vercel.json` - Configuración de Vercel

## ✅ **Características:**

- ✅ Formulario funcional en Vercel
- ✅ Validación completa de datos
- ✅ Email HTML profesional
- ✅ Respuestas JSON consistentes
- ✅ Manejo de errores
- ✅ Responsive design

## 🛠️ **Solución de problemas:**

### Error: "Failed to execute 'json' on 'Response'"
- ✅ **Solucionado:** Ahora usa Vercel Functions en lugar de PHP

### Error: "Email no enviado"
1. Verifica las variables de entorno en Vercel
2. Confirma que la contraseña de aplicación sea correcta
3. Revisa los logs de Vercel Functions

### Error: "Function timeout"
- La función tiene 30 segundos de timeout configurado
- Si es necesario, se puede aumentar en `vercel.json`

## 📱 **URL del formulario:**
Una vez desplegado, el formulario estará disponible en:
`https://tu-proyecto.vercel.app`

## 🔒 **Seguridad:**
- Variables de entorno protegidas
- Validación de datos en frontend y backend
- Headers CORS configurados
- Manejo seguro de errores
