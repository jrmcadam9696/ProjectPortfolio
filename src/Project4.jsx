import React from 'react';


function ProjectItem4() {
  const projectList = [
    {
      name: 'Isight',
      description: 'UI design for an voiceassited browser plugin that assists visually imapired users',
      link: 'https://www.figma.com/design/0uQdFxJQOzPuGNwcKgh3cZ/info-609?node-id=1-12&p=f&t=Cgz8MCExnkPUSxu4-0'
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

export default ProjectItem4;