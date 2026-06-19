"use client";

import { useEffect, useRef } from "react";
import styles from "./SkillsSection.module.css";

const skillGroups = [
  {
    title: "Testing Concepts",
    items: ["SDLC", "STLC", "Defect Life Cycle", "Test Planning", "Verification & Validation"],
  },
  {
    title: "Manual Testing",
    items: ["Functional", "Regression", "Smoke", "Sanity", "Black Box", "White Box"],
  },
  {
    title: "Automation",
    items: ["Selenium WebDriver", "TestNG", "JUnit", "Maven", "Page Object Model"],
  },
  {
    title: "API & Performance",
    items: ["Postman", "Apache JMeter"],
  },
  {
    title: "Methodologies",
    items: ["Agile (Scrum)", "Waterfall", "V-Model"],
  },
  {
    title: "Tools",
    items: ["Eclipse", "Jira", "MySQL", "Git/GitHub", "Excel", "Word"],
  },
];

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    let gsap, ScrollTrigger;
    const init = async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      gsap = gsapMod.gsap || gsapMod.default;
      ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
    };
    init();
  }, []);

  return (
    <section id="skills" className={styles.section} ref={sectionRef}>
      <div className={styles.inner}>
        <div className={styles.label}>
          <span className={styles.labelNum}>02</span>
          <div className={styles.line} />
          <span>Skills</span>
        </div>

        <div className={styles.grid} ref={gridRef}>
          {skillGroups.map((group) => (
            <div className={styles.card} key={group.title}>
              <h3 className={styles.cardTitle}>{group.title}</h3>
              <div className={styles.tags}>
                {group.items.map((item) => (
                  <span className={styles.tag} key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
