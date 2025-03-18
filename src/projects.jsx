import React from 'react';
import ProjectItem from './Project1';
import ProjectItem2 from './Project2';
import ProjectItem3 from './Project3';
import ProjectItem4 from './Project4';
import ProjectItem5 from './Project5';
import ProjectItem6 from './Project6';
import './projects.css';

function Projects() {
  return (
    <section id="projects">
      <div>
        <h1>Projects</h1>
        <ul>
          <ProjectItem />
          <ProjectItem2 />
          <ProjectItem3 />
          <ProjectItem4 />
          <ProjectItem5 />
          <ProjectItem6 />
        </ul>
      </div>
    </section>
  );
}

export default Projects;
















/*import React from 'react';
import './projects.css';

function Projects() {
  const projectList = [
    {
      name: 'Research Poster',
      description: 'Poster for my Research Project',
      link: 'file:///C:/Users/toast/Downloads/2024_DSRE620_WESTT480_HNRST480%20(4).pdf'
    },
    {
      name: 'Figma Widgets',
      description: 'Repository of My Figma Projects',
      link: 'https://figma.com/files/team/1439652508043341675/recents-and-sharing?fuid=1439652504503942558'
    }
  ];

  return (
    <section id="projects">
      <div>
      <h1>Projects</h1>
      <ul>
        {projectList.map((project, index) => (
          <li key={index}>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
          </li>
        ))}
      </ul>
      </div>
    </section>
  );
}

export default Projects;*/