import React from 'react';

function ProjectCard({ name, description, previewImages, previewImage, files, link }) {
  const images = previewImages?.length
    ? previewImages
    : previewImage ? [previewImage] : [];

  const links = files?.length
    ? files
    : link ? [{ label: 'View Project', url: link }] : [];

  return (
    <li className="project-card">
      {images.length > 0 && (
        <div className="project-previews">
          {images.map((src, i) =>
            src.toLowerCase().endsWith('.pdf') ? (
              <embed
                key={i}
                src={src}
                type="application/pdf"
                className="project-thumbnail"
              />
            ) : (
              <img
                key={i}
                src={src}
                alt={`${name} preview ${i + 1}`}
                className="project-thumbnail"
                onError={e => e.target.style.display = 'none'}
              />
            )
          )}
        </div>
      )}
      <h2>{name}</h2>
      <p>{description}</p>
      {links.length > 0 && (
        <div className="project-links">
          {links.map((f, i) => (
            <a key={i} href={f.url} target="_blank" rel="noopener noreferrer">
              {f.label || 'View Project'}
            </a>
          ))}
        </div>
      )}
    </li>
  );
}

export default ProjectCard;
