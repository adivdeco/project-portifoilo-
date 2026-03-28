import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Home, User, Mail, FolderGit2 } from 'lucide-react';
import styles from './MagneticDock.module.css';

function DockIcon({ children, mouseX }) {
  const ref = useRef(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Calculate width/scale based on distance to cursor
  const widthSync = useTransform(distance, [-150, 0, 150], [60, 100, 60]);
  const width = useSpring(widthSync, { stiffness: 400, damping: 25 });

  return (
    <motion.div 
      ref={ref} 
      style={{ width }} 
      className={`${styles.dockIcon} magnetic`}
    >
      {children}
    </motion.div>
  );
}

export default function MagneticDock() {
  const mouseX = useMotionValue(Infinity);

  return (
    <div 
      className={styles.dockContainer}
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      <motion.div className={`${styles.dock} glass`}>
        <DockIcon mouseX={mouseX}>
          <Home size={24} color="var(--color-text-primary)" />
        </DockIcon>
        <DockIcon mouseX={mouseX}>
          <User size={24} color="var(--color-text-primary)" />
        </DockIcon>
        <DockIcon mouseX={mouseX}>
          <FolderGit2 size={24} color="var(--color-text-primary)" />
        </DockIcon>
        <DockIcon mouseX={mouseX}>
          <Mail size={24} color="var(--color-text-primary)" />
        </DockIcon>
      </motion.div>
    </div>
  );
}
