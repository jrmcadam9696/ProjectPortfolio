import React, { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from './firebase';
import ProjectCard from './ProjectCard';
import './projects.css';

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      const q = query(collection(db, 'projects'), orderBy('createdAt'));
      const snapshot = await getDocs(q);
      setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    fetchProjects();
  }, []);

  return (
    <section id="projects">
      <div>
        <h1>Projects</h1>
        <ul>
          {projects.map(project => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Projects;
