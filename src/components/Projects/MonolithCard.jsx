import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Projects.module.css';

export default function MonolithCard({ project }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className={`${styles.monolith} glass`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.monolithInner}>
        {/* The Front face (UI Skin) */}
        <motion.div 
          className={styles.frontFace}
          animate={{ 
            clipPath: isHovered 
              ? 'polygon(0 0, 100% 0, 100% 0%, 0% 0%)' 
              : 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' 
          }}
          transition={{ duration: 0.6, ease: "circInOut" }}
        >
          <div className={styles.uiMockupPlaceholder}>
            <h3>{project.title}</h3>
            <p>Hover to peel back UI</p>
          </div>
        </motion.div>

        {/* The Back face (Backend architecture / X-Ray) */}
        <div className={styles.backFace}>
          <div className={styles.schematicView}>
            <h4>Architecture</h4>
            <ul>
              {project.stack.map(tech => (
                <li key={tech}>&lt; {tech} /&gt;</li>
              ))}
            </ul>
            <p className={styles.desc}>{project.description}</p>
            <a href={project.link} className={styles.exploreBtn}>Explore API</a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
