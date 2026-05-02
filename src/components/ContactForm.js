import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../style/ContactForm.css';

const ContactForm = () => {
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storageKey = `msg_count_${formData.email}`;
    const currentCount = parseInt(localStorage.getItem(storageKey) || "0");

    if (currentCount >= 5) {
      alert("Has alcanzado el límite de 5 mensajes permitidos para este correo.");
      return;
    }

    setIsSending(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        localStorage.setItem(storageKey, (currentCount + 1).toString());
        alert(`¡Mensaje enviado con éxito! (Mensajes: ${currentCount + 1}/5)`);
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert("Hubo un error al enviar el mensaje al servidor.");
      }
    } catch (error) {
      alert("Error de conexión con el servidor.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <motion.form 
      className="contact-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="input-group">
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        <label className={formData.name ? "active" : ""}>Tu Nombre</label>
      </div>
      <div className="input-group">
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        <label className={formData.email ? "active" : ""}>Correo Electrónico</label>
      </div>
      <div className="input-group">
        <textarea name="message" value={formData.message} onChange={handleChange} required rows="5"></textarea>
        <label className={formData.message ? "active" : ""}>Mensaje</label>
      </div>
      <motion.button 
        type="submit" 
        className="submit-btn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isSending}
      >
        {isSending ? "Enviando..." : "Enviar Mensaje"}
      </motion.button>
    </motion.form>
  );
};

export default ContactForm;