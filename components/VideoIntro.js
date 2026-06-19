"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./VideoIntro.module.css";

export default function VideoIntro({ firstName, lastName, tagline, role }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const firstRef = useRef(null);
  const lastRef = useRef(null);
  const taglineRef = useRef(null);
  const roleRef = useRef(null);
  const accentRef = useRef(null);
  const scrollRef = useRef(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    let gsap, tl;

    const init = async () => {
      const mod = await import("gsap");
      gsap = mod.gsap || mod.default;

      // Letter split helper
      const splitLetters = (el) => {
        if (!el) return [];
        const text = el.textContent;
        el.innerHTML = "";
        const spans = [];
        for (const ch of text) {
          const span = document.createElement("span");
          span.textContent = ch === " " ? "\u00A0" : ch;
          span.style.display = "inline-block";
          span.style.overflow = "hidden";
          el.appendChild(span);
          spans.push(span);
        }
        return spans;
      };

      const firstLetters = splitLetters(firstRef.current);
      const lastLetters = lastName ? splitLetters(lastRef.current) : [];

      tl = gsap.timeline({ delay: 0.3 });

      // Letterbox reveal
      tl.fromTo(
        overlayRef.current,
        { scaleY: 1 },
        { scaleY: 0, duration: 1.2, ease: "power4.inOut", transformOrigin: "top" }
      );

      // First name letters cascade in
      tl.fromTo(
        firstLetters,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.05,
        },
        "-=0.5"
      );

      // Last name (only if present)
      if (lastName) {
        tl.fromTo(
          lastLetters,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.05,
          },
          "-=0.7"
        );
      }

      // Gold accent line draws in
      tl.fromTo(
        accentRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power3.inOut", transformOrigin: "left" },
        "-=0.5"
      );

      // Role badge
      tl.fromTo(
        roleRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );

      // Tagline
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.4"
      );

      // Scroll hint
      tl.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "-=0.2"
      );

      // Scroll indicator pulse
      gsap.to(scrollRef.current, {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.1,
        ease: "sine.inOut",
        delay: 2,
      });
    };

    init();

    // Autoplay with sound; silently fall back to muted if browser blocks it
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          video.muted = true;
          video.play().catch(() => {});
        });
      }
    }

    return () => {
      if (tl) tl.kill();
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setPlaying(true);
      } else {
        video.pause();
        setPlaying(false);
      }
    }
  };

  const scrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section className={styles.hero} ref={containerRef}>
      {/* Letterbox overlay */}
      <div className={styles.letterbox} ref={overlayRef} />

      {/* Video background */}
      <video
        ref={videoRef}
        className={styles.video}
        src="video/hero.mp4"
        loop
        playsInline
        preload="auto"
      />

      {/* Gradient overlays */}
      <div className={styles.gradientBottom} />
      <div className={styles.gradientTop} />

      {/* Main content */}
      <div className={styles.content}>
        <div className={styles.nameWrap}>
          <h1 className={styles.name}>
            <span ref={firstRef} className={styles.nameFirst}>
              {firstName}
            </span>
            {lastName && (
              <span ref={lastRef} className={styles.nameLast}>
                {lastName}
              </span>
            )}
          </h1>
          <div className={styles.accentLine} ref={accentRef} />
          <div className={styles.roleBadge} ref={roleRef}>
            {role}
          </div>
          <p className={styles.tagline} ref={taglineRef}>
            {tagline}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <button
          className={styles.controlBtn}
          onClick={togglePlay}
          aria-label={playing ? "Pause video" : "Play video"}
        >
          {playing ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </button>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollHint} ref={scrollRef} onClick={scrollDown}>
        <span className={styles.scrollText}>scroll</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="8" cy="7" r="2.5" fill="currentColor" />
        </svg>
      </div>

      {/* Corner decoration */}
      <div className={styles.cornerTL} />
      <div className={styles.cornerBR} />
    </section>
  );
}
