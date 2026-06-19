"use client";

import { useEffect, useRef } from "react";
import styles from "./AboutSection.module.css";

export default function AboutSection() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ScrollTrigger, gsap;
    const init = async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      gsap = gsapMod.gsap || gsapMod.default;
      ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      gsap.fromTo(
        textRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
    };
    init();
  }, []);

  return (
    <section id="about" className={styles.section} ref={sectionRef}>
      <div className={styles.inner}>
        <div className={styles.label}>
          <span className={styles.labelNum}>01</span>
          <div className={styles.line} ref={lineRef} />
          <span>About</span>
        </div>

        <div ref={textRef} className={styles.content}>
          <p className={styles.lead}>
            Junior Software Test Engineer with strong fundamentals in{" "}
            <em>Manual Testing</em> and practical, working experience in{" "}
            <em>Selenium Automation</em> using Java.
          </p>
          <p className={styles.body}>
            Experienced in coordinating projects and teams — ensuring smooth
            communication, task tracking, and timely delivery of milestones.
            Currently seeking opportunities to apply structured testing
            practices and elevate software quality, one well-written test
            case at a time.
          </p>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>50+</span>
              <span className={styles.statLabel}>Test cases authored</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>2</span>
              <span className={styles.statLabel}>Automation frameworks built</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>3+</span>
              <span className={styles.statLabel}>Real-world QA projects</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
