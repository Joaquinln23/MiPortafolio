import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaBars, FaTimes } from 'react-icons/fa';
import Proyectos from './components/proyectos';
import MatrixText from './components/MatrixText';
import ContactForm from './components/ContactForm';
import Certificaciones from './components/Certificaciones';
import Footer from './components/Footer';
import { useMousePosition, useScrollVisibility } from './hooks/useLayoutEffects';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const mousePosition = useMousePosition();
  const showNav = useScrollVisibility();

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
                Recientemente, he potenciado mi perfil técnico con certificaciones como <strong>AI Expert</strong>, 
                <strong>Big Data Professional</strong> y <strong>Data Storytelling Professional</strong>, lo que me permite integrar análisis avanzado de datos, narración de insights y modelos
                inteligentes en cada proyecto que desarrollo.
              </p>
              <p>Aquí tienes las tecnologías con las que trabajo principalmente:</p>
              
              <ul className="skill-list">
                <li>C# / .NET Core</li>
                <li>ASP.NET (Arquitectura por capas)</li>
                <li>SQL Server (Stored Procedures)</li>
                <li>JavaScript (ES6+) / React / Next.js</li>
                <li>Artificial Intelligence & Prompt Engineering</li>
                <li>Big Data & Data Storytelling</li>
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

        <section id="proyectos" className="section">
          <h2 className="section-title"><span>02.</span> Proyectos</h2>
          <Proyectos />
        </section>

        <Certificaciones />

        <section id="contacto" className="section">
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
      <Footer />
    </div>
  );
}

export default App;

