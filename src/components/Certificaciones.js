import React from 'react';
import { FaDatabase, FaChartLine, FaRobot, FaBrain, FaExternalLinkAlt } from 'react-icons/fa';
import '../style/Certificaciones.css';

const Certificaciones = () => {
  return (
    <section id="certificaciones" className="section">
      <h2 className="section-title"><span>03.</span> Certificaciones</h2>
      <div className="cert-grid">
        {/* 1. Big Data */}
        <div className="cert-card">
          <div className="cert-header">
            <FaDatabase className="cert-lib-icon" />
            <a href="/certificaciones/BigDataProfessional.png" target="_blank" rel="noopener noreferrer" className="cert-link">
              <FaExternalLinkAlt />
            </a>
          </div>
          <img src="/certificaciones/BigDataProfessional.png" alt="Big Data Professional" className="cert-image" />
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
            <a href="/certificaciones/DataStorytellingProfessional.png" target="_blank" rel="noopener noreferrer" className="cert-link">
              <FaExternalLinkAlt />
            </a>
          </div>
          <img src="/certificaciones/DataStorytellingProfessional.png" alt="Data Storytelling Professional" className="cert-image" />
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
            <a href="/certificaciones/IAExpert.png" target="_blank" rel="noopener noreferrer" className="cert-link">
              <FaExternalLinkAlt />
            </a>
          </div>
          <img src="/certificaciones/IAExpert.png" alt="Artificial Intelligence Expert" className="cert-image" />
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
            <a href="/certificaciones/BigSchool.png" target="_blank" rel="noopener noreferrer" className="cert-link">
              <FaExternalLinkAlt />
            </a>
          </div>
          <img src="/certificaciones/BigSchool.png" alt="Iniciación al Desarrollo con IA" className="cert-image" />
          <h3 className="cert-title">Iniciación al Desarrollo con IA</h3>
          <p className="cert-org">BIG school | Oct 2025</p>
          <ul className="cert-skills">
            <li>Prompt Engineering</li>
            <li>Brais Moure & R. Fons</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Certificaciones;
