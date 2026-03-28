import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MonolithCard from './MonolithCard';
import styles from './Projects.module.css';

const projects = [
  {
    id: 1,
    title: 'Paradox',
    description: 'Real-time comms platform with end-to-end encryption.',
    stack: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    link: '#'
  },
  {
    id: 2,
    title: 'Neerman',
    description: 'Construction estimation & AI billing system.',
    stack: ['Flutter', 'Python', 'TensorFlow', 'PostgreSQL'],
    link: '#'
  },
  {
    id: 3,
    title: 'Code Hunter',
    description: 'An immersive competitive coding game for developers.',
    stack: ['Three.js', 'WebGL', 'React', 'Zustand'],
    link: '#'
  }
];

export default function ProjectList() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section className={styles.projectSection} ref={containerRef}>
      <h2 className={styles.sectionTitle}>
        <span className="text-gradient">Selected</span> Monoliths
      </h2>

      <div className={styles.projectGrid}>
        <motion.div style={{ y: y1 }} className={styles.column}>
          <MonolithCard project={projects[0]} />
          <MonolithCard project={projects[2]} />
        </motion.div>
        
        <motion.div style={{ y: y2 }} className={styles.columnOffset}>
          <MonolithCard project={projects[1]} />
        </motion.div>
      </div>
    </section>
  );
}
