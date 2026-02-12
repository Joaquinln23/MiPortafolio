import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaBars, FaTimes, FaExternalLinkAlt, FaBrain, FaDatabase, FaChartLine, FaRobot } from 'react-icons/fa';
import Proyectos from './components/proyectos';
import './App.css';

const MatrixText = () => {
  const textRef = useRef(null);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@&*%";
  const originalText = "Ingeniero en Informática.";
  let interval = null;

  const handleMouseOver = () => {
    let iteration = 0;
    clearInterval(interval);
    interval = setInterval(() => {
      if (!textRef.current) return;
      textRef.current.innerText = originalText
        .split("")
        .map((letter, index) => {
          if (index < iteration) return originalText[index];
          return letters[Math.floor(Math.random() * 42)];
        })
        .join("");
      if (iteration >= originalText.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
  };

  return (
    <h2 ref={textRef} onMouseOver={handleMouseOver} className="job-title matrix-effect">
      {originalText}
    </h2>
  );
};

// --- COMPONENTE DE FORMULARIO INTEGRADO CON TU API ---
const ContactForm = () => {
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación de spam local
    const storageKey = `msg_count_${formData.email}`;
    const currentCount = parseInt(localStorage.getItem(storageKey) || "0");

    if (currentCount >= 5) {
      alert("Has alcanzado el límite de 5 mensajes permitidos para este correo.");
      return;
    }

    setIsSending(true);

    try {
      // LLAMADA A TU API EN VERCEL (/api/contact.js)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        localStorage.setItem(storageKey, (currentCount + 1).toString());
        alert(`¡Mensaje enviado con éxito! (Mensajes: ${currentCount + 1}/5)`);
        setFormData({ name: '', email: '', message: '' }); // Limpia el formulario
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
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
        <label className={formData.name ? "active" : ""}>Tu Nombre</label>
      </div>

      <div className="input-group">
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        <label className={formData.email ? "active" : ""}>Correo Electrónico</label>
      </div>

      <div className="input-group">
        <textarea 
          name="message" 
          value={formData.message} 
          onChange={handleChange} 
          required 
          rows="5"
        ></textarea>
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

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const updateMousePosition = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setShowNav(currentScroll < lastScroll || currentScroll < 100);
      lastScroll = currentScroll;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App" style={{ background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)` }}>
      <nav className={`navbar ${showNav ? 'visible' : 'hidden'}`}>
        <div className="nav-container">
          <div className="logo">JL.</div>
          <div className="menu-icon" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="#inicio" onClick={toggleMenu}>Inicio</a></li>
            <li><a href="#about" onClick={toggleMenu}>Sobre Mí</a></li>
            <li><a href="#proyectos" onClick={toggleMenu}>Proyectos</a></li>
            <li><a href="#contacto" onClick={toggleMenu}>Contacto</a></li>
          </ul>
        </div>
      </nav>

      <main className="main-content">
        <section id="inicio" className="hero-section">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="greeting">Hola, mi nombre es</span>
            <h1 className="name-title">Joaquín Leiva.</h1>
            <MatrixText />
            <p className="hero-description">Apasionado por el desarrollo web y APIs. Construyendo soluciones innovadoras desde Chile.</p>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/joaquinleiva23/" target="_blank" rel="noopener noreferrer" className="social-icon"><FaLinkedin size={28} /></a>
              <a href="https://github.com/Joaquinln23" target="_blank" rel="noopener noreferrer" className="social-icon"><FaGithub size={28} /></a>
            </div>
          </motion.div>
        </section>

        <section id="about" className="section">
          <h2 className="section-title"><span>01.</span> Sobre Mí</h2>
          <div className="about-container">
            <div className="about-text">
              <p>¡Hola! Mi nombre es <strong>Joaquín Leiva</strong>. Soy un <strong>Ingeniero en Informática</strong> graduado de <strong>Duoc UC</strong>.</p>
              <p>Recientemente, he potenciado mi perfil técnico con certificaciones como <strong>AI Expert</strong> y <strong>Big Data Professional</strong>.</p>
              <ul className="skill-list">
                <li>C# / .NET Core</li>
                <li>SQL Server (Stored Procedures)</li>
                <li>JavaScript (ES6+) / React</li>
                <li>Artificial Intelligence</li>
                <li>Big Data Analytics</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="proyectos" className="section">
          <h2 className="section-title"><span>02.</span> Proyectos</h2>
          <Proyectos />
        </section>

        <section id="certificaciones" className="section">
          <h2 className="section-title"><span>04.</span> Certificaciones</h2>
          <div className="cert-grid">
            <div className="cert-card">
              <div className="cert-header"><FaDatabase className="cert-lib-icon" /><a href="/diplomas/big-data.pdf" target="_blank" className="cert-link"><FaExternalLinkAlt /></a></div>
              <h3 className="cert-title">Big Data Professional</h3>
            </div>
            <div className="cert-card">
              <div className="cert-header"><FaChartLine className="cert-lib-icon" /><a href="/diplomas/data-storytelling.pdf" target="_blank" className="cert-link"><FaExternalLinkAlt /></a></div>
              <h3 className="cert-title">Data Storytelling</h3>
            </div>
            <div className="cert-card">
              <div className="cert-header"><FaRobot className="cert-lib-icon" /><a href="/diplomas/ia-expert.pdf" target="_blank" className="cert-link"><FaExternalLinkAlt /></a></div>
              <h3 className="cert-title">AI Expert</h3>
            </div>
            <div className="cert-card">
              <div className="cert-header"><FaBrain className="cert-lib-icon" /><a href="/diplomas/big-school.pdf" target="_blank" className="cert-link"><FaExternalLinkAlt /></a></div>
              <h3 className="cert-title">Iniciación IA</h3>
            </div>
          </div>
        </section>

        <section id="contacto" className="section contact-section">
          <h2 className="section-title"><span>03.</span> Contacto</h2>
          <div className="contact-container">
            <h3>¿Hablamos?</h3>
            <p className="hero-description" style={{margin: '0 auto 30px'}}>Mi bandeja de entrada siempre está abierta.</p>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Diseñado & Construido por Joaquín Leiva</p>
      </footer>
    </div>
  );
}

export default App;