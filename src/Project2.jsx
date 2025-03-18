import React from 'react';


function ProjectItem() {
  const projectList = [
    {
      name: 'Research Poster',
      description: 'Research/ Infographic poster for solutions to excess medical waste',
      link: './2024_DSRE620_WESTT480_HNRST480%20(4).pdf'
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

export default ProjectItem