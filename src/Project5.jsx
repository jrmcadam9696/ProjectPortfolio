import React from 'react';


function ProjectItem5() {
  const projectList = [
    {
      name: 'PennScribe',
      description: 'Blogging Wesite(Fullstack)',
      link: './PenScribe_Screenshots.pdf'
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

export default ProjectItem5;