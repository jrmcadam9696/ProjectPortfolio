import React from 'react';


function ProjectItem3() {
  const projectList = [
    {
      name: 'Digital Afterlife',
      description: 'UI Design for an App where users can generate Digital personas',
      link: 'https://www.figma.com/design/UWh5TDnn9Y6tPqc4dRUyeI/Prototype-Play?node-id=0-1&p=f&t=Hhwgchb6tEQbFsYy-0',
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

export default ProjectItem3;