"use client";

import { useEffect, useRef } from "react";
import styles from "./WorkSection.module.css";

const projects = [
  {
    title: "Croma.com",
    subtitle: "E-Commerce Automation Framework",
    date: "Jan 2026",
    type: "Automation Testing",
    description:
      "End-to-end test automation framework built with Selenium WebDriver, Java, TestNG, Maven, and Page Object Model. Automated product search, category navigation, cart operations, and checkout validations with data-driven testing via Excel.",
    tags: ["Selenium", "Java", "TestNG", "Maven", "POM"],
  },
  {
    title: "BS Sports",
    subtitle: "E-Commerce Website Testing",
    date: "Oct 2025",
    type: "Manual Testing",
    description:
      "Designed and executed 50+ test cases across major modules. Performed functional, UI, regression, and compatibility testing, with full test case and defect documentation.",
    tags: ["Functional", "Regression", "UI Testing", "Compatibility"],
  },
];

export default function WorkSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    let gsap, ScrollTrigger;
    const init = async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      gsap = gsapMod.gsap || gsapMod.default;
      ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 80%" },
          }
        );
      });
    };
    init();
  }, []);

  return (
    <section id="work" className={styles.section} ref={sectionRef}>
      <div className={styles.inner}>
        <div className={styles.label}>
          <span className={styles.labelNum}>04</span>
          <div className={styles.line} />
          <span>Selected Work</span>
        </div>

        <div className={styles.list}>
          {projects.map((p, i) => (
            <div
              className={styles.card}
              key={p.title}
              ref={(el) => (cardsRef.current[i] = el)}
            >
              <div className={styles.cardLeft}>
                <span className={styles.cardIndex}>0{i + 1}</span>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardTop}>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                  <span className={styles.cardDate}>{p.date}</span>
                </div>
                <div className={styles.cardSubtitle}>
                  {p.subtitle} <span className={styles.dot}>·</span> {p.type}
                </div>
                <p className={styles.cardDesc}>{p.description}</p>
                <div className={styles.cardTags}>
                  {p.tags.map((t) => (
                    <span className={styles.tag} key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
