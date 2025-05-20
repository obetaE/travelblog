import React from 'react'
import styles from "./contact.module.css"
import Image from "next/image";
import { MapPin, Mail, Phone, Clock, Send } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heroSection}>
        <Image
          src="https://cdn.pixabay.com/photo/2022/09/20/10/11/street-7467503_640.jpg"
          alt="Contact Background"
          fill
          className={styles.heroImage}
          priority
        />
        <div className={styles.heroOverlay} />
        
        <div className={styles.contactCard}>
          <div className={styles.contactInfo}>
            <h1>Let's Start a Conversation</h1>
            <p className={styles.introText}>Whether you have a project in mind or just want to chat, we're here to listen.</p>
            
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <MapPin size={24} className={styles.icon} />
                <div>
                  <h3>Visit Us</h3>
                  <p>123 Creative Street<br/>Digital City, DX 45678</p>
                </div>
              </div>
              
              <div className={styles.infoItem}>
                <Mail size={24} className={styles.icon} />
                <div>
                  <h3>Email Us</h3>
                  <p>hello@creativehub.com<br/>support@creativehub.com</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <Phone size={24} className={styles.icon} />
                <div>
                  <h3>Call Us</h3>
                  <p>+1 (555) 123-4567<br/>Mon-Fri: 9am - 5pm EST</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <Clock size={24} className={styles.icon} />
                <div>
                  <h3>Office Hours</h3>
                  <p>Monday - Friday: 9am - 6pm<br/>Saturday: 10am - 2pm</p>
                </div>
              </div>
            </div>

            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialIcon} aria-label="Twitter">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  {/* Twitter icon path */}
                </svg>
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  {/* Instagram icon path */}
                </svg>
              </a>
              <a href="#" className={styles.socialIcon} aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  {/* LinkedIn icon path */}
                </svg>
              </a>
            </div>
          </div>

          <form className={styles.contactForm}>
            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label htmlFor="firstName">First Name</label>
                <input 
                  id="firstName" 
                  type="text" 
                  placeholder="Enter your first name"
                  className={styles.formInput}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="lastName">Last Name</label>
                <input 
                  id="lastName" 
                  type="text" 
                  placeholder="Enter your last name"
                  className={styles.formInput}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label htmlFor="email">Email Address</label>
                <input 
                  id="email" 
                  type="email" 
                  placeholder="your.email@example.com"
                  className={styles.formInput}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="phone">Phone Number</label>
                <input 
                  id="phone" 
                  type="tel" 
                  placeholder="+1 (555) 000-0000"
                  className={styles.formInput}
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                className={styles.formTextarea}
                placeholder="How can we help you?"
                rows="5"
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              <Send size={18} className={styles.buttonIcon} />
              Send Message
            </button>
          </form>
        </div>
      </div>
{/* 
      <div className={styles.mapSection}>
        <iframe
          title="Office Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.6789"
          className={styles.map}
          allowFullScreen
          loading="lazy"
        />
      </div> */}
    </div>
  );
}

export default ContactPage;