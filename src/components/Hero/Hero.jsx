import React from 'react';
import GravityCanvas from './GravityCanvas';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <div className={styles.textContent}>
          <h1 className={styles.title}>
            The Architect of<br />
            <span className="text-gradient">Digital Physics</span>
          </h1>
          <p className={styles.subtitle}>
            Adiv Singh &mdash; Full-Stack Developer + Physics Aficionado
          </p>
        </div>
      </div>
      <div className={styles.canvasContainer}>
        <GravityCanvas />
      </div>
    </section>
  );
}
