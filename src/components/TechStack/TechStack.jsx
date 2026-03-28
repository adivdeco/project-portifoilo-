import React from 'react';
import styles from './TechStack.module.css';

const technologies = [
  "HTML", "CSS", "JavaScript", "React", "Node.js", "Express.js", 
  "MongoDB", "Three.js", "Framer Motion", "Tailwind", "Git"
];

export default function TechStack() {
  return (
    <section className={styles.techSection}>
      <h2 className={styles.title}>
        <span className="text-gradient">What I know</span> till now...
      </h2>
      <div className={styles.marqueeContainer}>
        {/* Double track for infinite seamless scrolling */}
        <div className={styles.track}>
          <div className={styles.marqueeGroup}>
            {technologies.map((tech, i) => (
              <div key={i} className={`${styles.techPill} glass`}>
                {tech}
              </div>
            ))}
          </div>
          <div className={styles.marqueeGroup}>
            {technologies.map((tech, i) => (
              <div key={`dup-${i}`} className={`${styles.techPill} glass`}>
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
