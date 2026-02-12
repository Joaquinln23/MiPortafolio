import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaRegFolder, FaExternalLinkAlt, FaStar } from 'react-icons/fa';

function Proyectos() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    // Filtramos para no mostrar todos los repos (opcional, puedes ajustar el número)
    axios.get('https://api.github.com/users/Joaquinln23/repos?sort=updated&per_page=6')
      .then(response => {
        setRepos(response.data);
      })
      .catch(error => {
        console.error('Error fetching repos:', error);
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
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                      <FaExternalLinkAlt size={20} />
                    </a>
                  </div>
                </div>
                <h3 className="project-title">
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    {repo.name.replace(/-/g, ' ')} {/* Limpia los guiones del nombre */}
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