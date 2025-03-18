import React from 'react';

function ProjectItem2() {
  const projectList = [
    {
      name: 'Figma Widgets',
      description: 'Repository of My Figma Projects',
      link: 'https://figma.com/files/team/1439652508043341675/recents-and-sharing?fuid=1439652504503942558'
    }
  ];

  return (
    <>
      {projectList.map((project, index) => (
        <li key={index}>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
          <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
        </li>
      ))}
    </>
  );
}

export default ProjectItem2;