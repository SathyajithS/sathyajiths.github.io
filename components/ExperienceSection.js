"use client";

import { useEffect, useRef } from "react";
import styles from "./ExperienceSection.module.css";

const experience = [
  {
    role: "Junior QA Engineer / Project Coordinator",
    company: "Webeaz Technologies Pvt Ltd",
    location: "Kozhikode, Kerala",
    period: "Jan 2026 — Present",
    points: [
      "Managing and coordinating project activities across multiple business functions, ensuring smooth execution and timely delivery of milestones.",
      "Working on a comprehensive ERP application covering CRM, Sales, Purchase, Accounts, and HR modules.",
      "Tested and documented a market-ready ride-hailing mobile application across Android and iOS.",
      "Performed API testing using Postman — validating request/response payloads, status codes, and authentication tokens.",
      "Executed performance and load testing using Apache JMeter.",
    ],
  },
  {
    role: "Software Testing Intern",
    company: "Luminar Technolab",
    location: "Kochi, Kerala",
    period: "Sep 2025 — Jan 2026",
    points: [
      "Built foundations in manual testing methodology, defect lifecycle, and structured test documentation.",
    ],
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    let gsap, ScrollTrigger;
    const init = async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      gsap = gsapMod.gsap || gsapMod.default;
      ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      itemsRef.current.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: item, start: "top 75%" },
          }
        );
      });
    };
    init();
  }, []);

  return (
    <section id="experience" className={styles.section} ref={sectionRef}>
      <div className={styles.inner}>
        <div className={styles.label}>
          <span className={styles.labelNum}>03</span>
          <div className={styles.line} />
          <span>Experience</span>
        </div>

        <div className={styles.timeline}>
          {experience.map((job, i) => (
            <div
              className={styles.item}
              key={job.role}
              ref={(el) => (itemsRef.current[i] = el)}
            >
              <div className={styles.dot} />
              <div className={styles.itemHeader}>
                <h3 className={styles.role}>{job.role}</h3>
                <span className={styles.period}>{job.period}</span>
              </div>
              <div className={styles.meta}>
                {job.company} · {job.location}
              </div>
              <ul className={styles.points}>
                {job.points.map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
