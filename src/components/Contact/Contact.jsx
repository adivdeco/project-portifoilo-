import React from 'react';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section className={styles.contactSection}>
      <div className={styles.contactContainer}>
        <div className={styles.textContent}>
          <h2 className={styles.title}>
            Initiate <span className="text-gradient">Contact</span>
          </h2>
          <p className={styles.subtitle}>
            Ready to bring an impossible idea to life? Reach out and let's architect something beautiful.
          </p>
        </div>

        <form className={`${styles.form} glass`}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Identification</label>
            <input type="text" id="name" placeholder="Enter your name" required />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="email">Transmission Vector</label>
            <input type="email" id="email" placeholder="Enter your email address" required />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="message">Message Payload</label>
            <textarea id="message" rows="5" placeholder="What are we building?" required></textarea>
          </div>
          
          <button type="submit" className={styles.submitBtn}>
            Transmit Message
          </button>
        </form>
      </div>
    </section>
  );
}
