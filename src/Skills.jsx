import React from 'react';

const skillGroups = [
  {
    category: 'Programming Languages',
    skills: ['Python', 'Java', 'SQL', 'React', 'JavaScript', 'TypeScript']
  },
  {
    category: 'UX/UI Design & Development',
    skills: ['HTML', 'CSS', 'Figma', '3D Printing', 'Prototyping', 'UI Wireframing']
  },
  {
    category: 'IT Support',
    skills: ['AV Support', 'Windows + Mac Reimaging', 'Linux Distributions', 'Remote Desktop Support']
  },
  {
    category: 'UX Research',
    skills: ['A/B Testing', 'Web Scraping', 'LaTeX', 'Qualitative Data Analysis', 'Annotation & Coding', 'Usability Testing', 'Card Sorting', 'Qualtrics']
  },
  {
    category: 'Microsoft',
    skills: ['Excel', 'Word', 'Suite', 'Power BI', 'Outlook']
  }
];

function SkillSection() {
  return (
    <section id="skills">
      <h1>Skills</h1>
      <div style={styles.grid}>
        {skillGroups.map(group => (
          <div key={group.category} style={styles.card}>
            <h3 style={styles.category}>{group.category}</h3>
            <div style={styles.tagRow}>
              {group.skills.map(skill => (
                <span key={skill} style={styles.tag}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1.25rem',
    marginTop: '1.5rem',
    textAlign: 'left'
  },
  card: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(106, 90, 205, 0.4)',
    borderRadius: '10px',
    padding: '1.25rem',
  },
  category: {
    margin: '0 0 0.75rem 0',
    fontSize: '0.75rem',
    fontWeight: '700',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    background: 'linear-gradient(to right, #09f1b8, #00a2ff, #ff00d2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  tagRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem'
  },
  tag: {
    fontSize: '0.85rem',
    padding: '4px 12px',
    borderRadius: '20px',
    border: '1px solid rgba(106, 90, 205, 0.5)',
    color: 'rgba(255,255,255,0.85)',
    background: 'rgba(106, 90, 205, 0.12)',
    letterSpacing: '0.02em'
  }
};

export default SkillSection;
