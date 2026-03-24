import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaRegFolder, FaExternalLinkAlt, FaStar } from 'react-icons/fa';

const PRIVATE_PROJECTS = [
  {
    id: 'fogon',
    name: 'El Fogón de Casa',
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
    description:
      'Plataforma web para juego de misterio en vivo. Incluye casos con PIN de acceso, reproductores de audio/video como evidencias, registro de jugadores vía email, notificaciones con Resend API y panel de veredicto final.',
    html_url: null,
    homepage: 'https://archivo-expedientes.vercel.app/',
    language: 'TypeScript',
    stargazers_count: 0,
  },
];

function Proyectos() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.github.com/users/Joaquinln23/repos?sort=updated&per_page=6')
      .then((response) => {
        const filtered = response.data.filter(
          (repo) => !['fogon', 'archivo-expedientes'].includes(repo.name)
        );
        const combined = [...PRIVATE_PROJECTS, ...filtered].slice(0, 6);
        setRepos(combined);
      })
      .catch((error) => {
        console.error('Error fetching repos:', error);
        setRepos(PRIVATE_PROJECTS);
      });
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
                <div className="project-top">
                  <div className="folder-icon">
                    <FaRegFolder size={40} />
                  </div>
                  <div className="project-links">
                    {(repo.homepage || repo.html_url) && (
                      <a
                        href={repo.homepage || repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaExternalLinkAlt size={20} />
                      </a>
                    )}
                  </div>
                </div>
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
                  {repo.description || 'Desarrollando soluciones innovadoras para este repositorio.'}
                </p>
              </header>

              <footer>
                <ul className="project-tech-list">
                  {repo.language && <li>{repo.language}</li>}
                  {repo.stargazers_count > 0 && (
                    <li className="stars">
                      <FaStar /> {repo.stargazers_count}
                    </li>
                  )}
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