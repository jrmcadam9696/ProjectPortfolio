import React from 'react';
import './info.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faFigma } from '@fortawesome/free-brands-svg-icons';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';

function Info() {
  return (
    <section id="about">
      <h1>About Me</h1>
      <p>Hi! I am currently a graduate student at Drexel University studying Human-Computer Interaction and User Experience, and you stumbled upon my portfolio project.</p>
      <div id="plinks">
        <a href="https://github.com/jrmcadam9696" aria-label="GitHub" className="link">
          <FontAwesomeIcon icon={faGithub} size="2x" />
          <span className="link-text">GitHub</span>
        </a>
        <a href="https://www.figma.com/files/team/1439652508043341675/recents-and-sharing?fuid=1439652504503942558" aria-label="Figma" className="link">
          <FontAwesomeIcon icon={faFigma} size="2x" />
          <span className="link-text">Figma</span>
        </a>
        <a href="https://www.canva.com" aria-label="Canva" className="link">
          <FontAwesomeIcon icon={faCopyright} size="2x" />
          <span className="link-text">Canva</span>
        </a>
      </div>
    </section>
  );
}

export default Info;