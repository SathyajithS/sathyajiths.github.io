"use client";

import { useEffect, useRef } from "react";
import styles from "./ContactSection.module.css";

export default function ContactSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    let gsap, ScrollTrigger;
    const init = async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      gsap = gsapMod.gsap || gsapMod.default;
      ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
    };
    init();
  }, []);

  return (
    <section id="contact" className={styles.section} ref={sectionRef}>
      <div className={styles.inner} ref={contentRef}>
        <div className={styles.label}>
          <span className={styles.labelNum}>05</span>
          <div className={styles.line} />
          <span>Contact</span>
        </div>

        <h2 className={styles.heading}>
          Let's build something
          <br />
          <span className={styles.headingGold}>that doesn't break.</span>
        </h2>

        <div className={styles.contactGrid}>
          <a href="mailto:sathyajiths10@gmail.com" className={styles.contactItem}>
            <span className={styles.contactLabel}>Email</span>
            <span className={styles.contactValue}>sathyajiths10@gmail.com</span>
          </a>
          <a href="tel:+918590169606" className={styles.contactItem}>
            <span className={styles.contactLabel}>Phone</span>
            <span className={styles.contactValue}>+91 85901 69606</span>
          </a>
          <a
            href="https://linkedin.com/in/sathyajith-s-9282a9148"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactItem}
          >
            <span className={styles.contactLabel}>LinkedIn</span>
            <span className={styles.contactValue}>sathyajith-s-9282a9148</span>
          </a>
          <a
            href="https://github.com/SathyajithS"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactItem}
          >
            <span className={styles.contactLabel}>GitHub</span>
            <span className={styles.contactValue}>SathyajithS</span>
          </a>
        </div>

        <div className={styles.education}>
          <h3 className={styles.eduTitle}>Education</h3>
          <div className={styles.eduItem}>
            <div className={styles.eduRow}>
              <span className={styles.eduDegree}>
                B.Tech, Electronics and Communication Engineering
              </span>
              <span className={styles.eduYear}>2020 — 2024</span>
            </div>
            <span className={styles.eduSchool}>
              Adi Shankara Institute of Engineering and Technology, Ernakulam
            </span>
          </div>
          <div className={styles.eduItem}>
            <div className={styles.eduRow}>
              <span className={styles.eduDegree}>Higher Secondary Education</span>
              <span className={styles.eduYear}>2019 — 2020</span>
            </div>
            <span className={styles.eduSchool}>Bharatiya Vidya Bhavan, Kozhikode</span>
          </div>
        </div>

        <footer className={styles.footer}>
          <span>© {new Date().getFullYear()} Sathyajith S</span>
          <span>Kozhikode, Kerala, India</span>
        </footer>
      </div>
    </section>
  );
}
