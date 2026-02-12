// Archivo: api/contact.js
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  // 1. Validamos que solo aceptemos solicitudes POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  // 2. Configuración del transporte 
  // Usamos el host y puerto explícito para evitar bloqueos y asegurar SSL
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true para puerto 465 (SSL)
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  // 3. Configuración del mensaje (Cuerpo en texto plano y HTML)
  const mailOptions = {
    from: `"Portafolio Joaquín" <${process.env.EMAIL_USER}>`,
    to: 'joaquinln.23@gmail.com', 
    replyTo: email, 
    subject: `🚀 Nuevo contacto de: ${name}`,
    text: `Has recibido un nuevo mensaje:\n\nNombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #0a192f; color: #ccd6f6; padding: 20px; border-radius: 10px;">
        <h2 style="color: #64ffda;">🚀 Nuevo mensaje desde tu Portafolio</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <div style="background-color: #112240; padding: 15px; border-radius: 5px; margin-top: 10px;">
          <p><strong>Mensaje:</strong></p>
          <p>${message}</p>
        </div>
        <br>
        <hr style="border-color: #233554;">
        <p style="font-size: 0.8rem; color: #8892b0;">Enviado desde joaquincode.vercel.app</p>
      </div>
    `,
  };

  try {
    // 4. Enviar el correo
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Correo enviado' });
  } catch (error) {
    console.error('Error en Nodemailer:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Error interno al enviar el correo',
      details: error.message 
    });
  }
}