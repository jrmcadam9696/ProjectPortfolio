function ProjectCard({ name, description, link }) {
  return (
    <li>
      <h2>{name}</h2>
      <p>{description}</p>
      {link && <a href={link} target="_blank" rel="noopener noreferrer">View Project</a>}
    </li>
  );
}