import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../style/Proyectos.css';

const PRIVATE_PROJECTS = [
  {
    id: 'fogon',
    name: 'El Fogón de Casa',
    image: '/proyectos/ElFogonDeCasa.png',
    description:
      'Sitio web para restaurante con diseño elegante, menú interactivo por categorías, sección de reservas y timeline de historia. Desarrollado como demo para cliente del rubro gastronómico.',
    html_url: null,
    homepage: 'https://elfogondecasa.vercel.app/',
    language: 'TypeScript',
    stargazers_count: 0,
  },
  {
    id: 'archivo-expedientes',
    name: 'Archivo de Expedientes',
    image: '/proyectos/ArchivoDeExpedientes.png',
    description:
      'Plataforma web para juego de misterio en vivo. Incluye casos con PIN de acceso, reproductores de audio/video como evidencias, registro de jugadores vía email, notificaciones con Resend API y panel de veredicto final.',
    html_url: null,
    homepage: 'https://archivo-expedientes.vercel.app/',
    language: 'TypeScript',
    stargazers_count: 0,
  },
  {
    id: 'agendapro',
    name: 'AgendaPro',
    image: '/proyectos/AgendaPro.png',
    description: 'Sistema de reservas con panel admin, flujo multi-paso, integración WhatsApp (CallMeBot API) y gestión de sesiones JWT.',
    homepage: 'https://joaquincode.vercel.app/',
    language: 'React / Node.js',
    stargazers_count: 0,
  },
  {
    id: 'transgaspi',
    name: 'Transgaspi',
    image: '/proyectos/TransGaspi.png',
    description: 'Landing page para empresa de transporte y maquinaria pesada. Catálogo de flota, conversión vía WhatsApp y despliegue en producción.',
    homepage: 'https://transgaspi.vercel.app/',
    language: 'React / Vite',
    stargazers_count: 0,
  },
  {
    id: 'caterina-artist',
    name: 'Caterina Artist',
    image: '/proyectos/CaterinaArtist.png',
    description: 'Portafolio para artista visual con galería interactiva y diseño responsivo.',
    homepage: 'https://caterinaartist.netlify.app/',
    language: 'React',
    stargazers_count: 0,
  },
  {
    id: 'mi-portafolio',
    name: 'Mi Portafolio',
    image: '/proyectos/MiPortafolio.png',
    description: 'Portafolio personal desarrollado con React, Framer Motion y CSS Modules.',
    homepage: 'https://joaquincode.vercel.app/',
    language: 'React',
    stargazers_count: 0,
  },
];

function Proyectos() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    setRepos(PRIVATE_PROJECTS);
  }, []);

  return (
    <div className="projects-container">
      <div className="project-grid">
        {repos.map((repo) => (
          <motion.div
            key={repo.id}
            className="project-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="card-inner">
              <header>
                {repo.image && (
                  <div className="project-image-wrapper">
                    <img src={repo.image} alt={repo.name} />
                  </div>
                )}
                <h3 className="project-title">
                  <a
                    href={repo.homepage || repo.html_url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {typeof repo.id === 'string'
                      ? repo.name
                      : repo.name.replace(/-/g, ' ')}
                  </a>
                </h3>
                <p className="project-description">
                  {repo.description || 'Desarrollando soluciones innovadoras.'}
                </p>
              </header>

              <footer>
                <ul className="project-tech-list">
                  {repo.language && <li>{repo.language}</li>}
                </ul>
              </footer>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Proyectos;