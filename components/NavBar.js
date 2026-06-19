"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./NavBar.module.css";

const links = ["About", "Skills", "Experience", "Work", "Contact"];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        S<span className={styles.logoDot}>.</span>
      </div>

      <ul className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
        {links.map((l) => (
          <li key={l}>
            <button className={styles.link} onClick={() => scrollTo(l)}>
              {l}
            </button>
          </li>
        ))}
        <li>
          <a
            href="https://linkedin.com/in/sathyajith-s-9282a9148"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.resumeBtn}
          >
            LinkedIn ↗
          </a>
        </li>
      </ul>

      <button
        className={styles.burger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={menuOpen ? styles.burgerLineOpen1 : styles.burgerLine} />
        <span className={menuOpen ? styles.burgerLineOpen2 : styles.burgerLine} />
        <span className={menuOpen ? styles.burgerLineOpen3 : styles.burgerLine} />
      </button>
    </nav>
  );
}
