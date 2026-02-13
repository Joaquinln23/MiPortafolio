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

// --- COMPONENTE DE FORMULARIO ---
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
            <li><a href="#certificaciones" onClick={toggleMenu}>Certificaciones</a></li>
            <li><a href="#contacto" onClick={toggleMenu}>Contacto</a></li>
          </ul>
        </div>
      </nav>

      <main className="main-content">
        {/* --- HERO --- */}
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

         {/* --- SOBRE MÍ --- */}
        <section id="about" className="section">
  <h2 className="section-title"><span>01.</span> Sobre Mí</h2>
  <div className="about-container">
    <div className="about-text">
      <p>
        ¡Hola! Mi nombre es <strong>Joaquín Leiva</strong>. Soy un <strong>Ingeniero en Informática </strong> 
         graduado de <strong>Duoc UC</strong>, con un enfoque integral en el ciclo completo de desarrollo de software.
      </p>
      <p>
        Mi experiencia abarca desde el diseño de bases de datos y arquitecturas por capas,
        hasta la implementación de interfaces interactivas y escalables.
        Me especializo en transformar problemas complejos en soluciones digitales eficientes y modernas.
      </p>
      <p>
        Recientemente, he potenciado mi perfil técnico con certificaciones como <strong>AI Expert</strong> y  
        <strong> Big Data Professional</strong>, lo que me permite integrar análisis avanzado de datos y modelos
        inteligentes en cada proyecto que desarrollo.
      </p>
      <p>Aquí tienes las tecnologías con las que trabajo principalmente:</p>
      
      <ul className="skill-list">
        <li>C# / .NET Core</li>
        <li>ASP.NET (Arquitectura por capas)</li>
        <li>SQL Server (Stored Procedures)</li>
        <li>JavaScript (ES6+) / React</li>
        <li>Artificial Intelligence (Prompt Engineering)</li>
        <li>Big Data Analytics</li>
      </ul>
    </div>
    
    <div className="about-image">
      <div className="image-wrapper">
        <div className="image-overlay"></div>
        <img src="profile.jpg" alt="Joaquín Leiva" />
      </div>
    </div>
  </div>
</section>

        {/* --- PROYECTOS --- */}
        <section id="proyectos" className="section">
          <h2 className="section-title"><span>02.</span> Proyectos</h2>
          <Proyectos />
        </section>

          {/* --- SECCIÓN CERTIFICACIONES --- */}
<section id="certificaciones" className="section">
  <h2 className="section-title"><span>04.</span> Certificaciones</h2>
  <div className="cert-grid">
    
    {/* 1. Big Data */}
    <div className="cert-card">
      <div className="cert-header">
        <FaDatabase className="cert-lib-icon" />
        <a href="/diplomas/big-data.pdf" target="_blank" rel="noopener noreferrer" className="cert-link">
          <FaExternalLinkAlt />
        </a>
      </div>
      <h3 className="cert-title">Big Data Professional Certificate - BDPC</h3>
      <p className="cert-org">CertiProf | Oct 2025</p>
      <ul className="cert-skills">
        <li>Arquitecturas</li>
        <li>Procesamiento</li>
      </ul>
    </div>

    {/* 2. Data Storytelling */}
    <div className="cert-card">
      <div className="cert-header">
        <FaChartLine className="cert-lib-icon" />
        <a href="/diplomas/data-storytelling.pdf" target="_blank" rel="noopener noreferrer" className="cert-link">
          <FaExternalLinkAlt />
        </a>
      </div>
      <h3 className="cert-title">Data Storytelling Professional Certificate</h3>
      <p className="cert-org">CertiProf | Oct 2025</p>
      <ul className="cert-skills">
        <li>Visualización</li>
        <li>Insights</li>
      </ul>
    </div>

    {/* 3. IA Experto */}
    <div className="cert-card">
      <div className="cert-header">
        <FaRobot className="cert-lib-icon" />
        <a href="/diplomas/ia-expert.pdf" target="_blank" rel="noopener noreferrer" className="cert-link">
          <FaExternalLinkAlt />
        </a>
      </div>
      <h3 className="cert-title">Artificial Intelligence Expert - CAIEC®</h3>
      <p className="cert-org">CertiProf | Oct 2025</p>
      <ul className="cert-skills">
        <li>Machine Learning</li>
        <li>Deep Learning</li>
      </ul>
    </div>

    {/* 4. Iniciación IA - BIG School */}
    <div className="cert-card">
      <div className="cert-header">
        <FaBrain className="cert-lib-icon" />
        <a href="/diplomas/big-school.pdf" target="_blank" rel="noopener noreferrer" className="cert-link">
          <FaExternalLinkAlt />
        </a>
      </div>
      <h3 className="cert-title">Iniciación al Desarrollo con IA</h3>
      <p className="cert-org">BIG school | Oct 2025</p>
      <ul className="cert-skills">
        <li>Prompt Engineering</li>
        <li>Brais Moure & R. Fons</li>
      </ul>
    </div>

  </div>
</section>

        {/* --- CONTACTO --- */}
        <section id="contacto" className="section contact-section">
          <h2 className="section-title"><span>04.</span> Contacto</h2>
          <div className="contact-container">
            <h3>¿Hablamos?</h3>
             <p className="hero-description" style={{margin: '0 auto 30px'}}>
              Mi bandeja de entrada siempre está abierta. Ya sea que tengas una pregunta o simplemente quieras saludar, ¡haré todo lo posible por responderte!
            </p>
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