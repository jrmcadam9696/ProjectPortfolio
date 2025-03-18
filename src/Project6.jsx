import React from 'react';


function ProjectItem6() {
  const projectList = [
    {
      name: 'Car Rental Database',
      description: 'Database/ Psuedo Interface for Storing/ Renting out Vehicles',
      link: ''
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

export default ProjectItem6;