import { useEffect, useRef } from "react";

import myPhoto from "../assets/akshit.png";

const socials = [
  { icon: "fab fa-github", href: "https://github.com/", label: "GH" },
  { icon: "fab fa-linkedin-in", href: "https://www.linkedin.com/in/akshit-kamboj-9855142a1?utm_source=share_via&utm_content=profile&utm_medium=member_android", label: "LI" },
  { icon: "fab fa-dribbble", href: "#", label: "DR" },
  { icon: "fab fa-behance", href: "#", label: "BE" },
  { icon: "fab fa-twitter", href: "#", label: "TW" },
];

export default function Hero() {
  const sectionRef = useRef(null);
  const photoRef = useRef(null);
  const nameTopRef = useRef(null);
  const nameBotRef = useRef(null);
  const tagRef = useRef(null);
  const rightRef = useRef(null);
  const scrollRef = useRef(null);
  const badgeRef = useRef(null);

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap) return;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // 1. Top name row slides in from left
    tl.fromTo(nameTopRef.current,
      { x: -120, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.1 }
    )
      // 2. Bottom name row slides in from right
      .fromTo(nameBotRef.current,
        { x: 120, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1 },
        "-=0.9"
      )
      // 3. Photo DROPS from above — "dropdown" effect
      .fromTo(photoRef.current,
        { y: -160, opacity: 0, scale: 1.08, filter: "blur(8px)" },
        { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.4, ease: "expo.out" },
        "-=0.8"
      )
      // 4. Tag line fades up
      .fromTo(tagRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        "-=0.6"
      )
      // 5. Right panel
      .fromTo(rightRef.current,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 },
        "-=0.9"
      )
      // 6. Badge pops
      .fromTo(badgeRef.current,
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.7)" },
        "-=0.5"
      )
      // 7. Scroll hint
      .fromTo(scrollRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3"
      );
  }, []);

  return (
    <section id="home" className="hero2" ref={sectionRef}>

      {/* ── GIANT NAME BLOCK (behind photo) ── */}
      <div className="hero2__name-bg">
        <div className="hero2__name-row hero2__name-top" ref={nameTopRef}>
          <span className="hero2__name-word stroke">AKSHIT</span>
        </div>
        <div className="hero2__name-row hero2__name-bot" ref={nameBotRef}>
          <span className="hero2__name-word solid">KAMBOJ</span>
        </div>
      </div>

      {/* ── PHOTO — floats in center, drops over the name ── */}
      <div className="hero2__photo-wrap" ref={photoRef}>
        <div className="hero2__photo-bg">
          <img src={myPhoto} alt="Akshit Kamboj" className="hero2__photo" />
        </div>

        {/* The "Cutout" foreground layer */}
        <div className="hero2__photo-fg">
          <img src={myPhoto} alt="" className="hero2__photo" />
        </div>

        <div className="hero2__photo-gradient" />

        {/* floating availability badge */}
        <div className="hero2__badge" ref={badgeRef}>
          <span className="badge__dot" />
          Available for freelance
        </div>
      </div>

      {/* ── LEFT PANEL ── */}
      <div className="hero2__left">
        <p className="hero2__tag" ref={tagRef}>
          — Full Stack Developer
        </p>
        <div className="hero2__socials">
          {socials.map((s) => (
            <a key={s.icon} href={s.href} className="hero2__social"
              target="_blank" rel="noreferrer" aria-label={s.label}>
              <i className={s.icon} />
            </a>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="hero2__right" ref={rightRef}>
        <p className="hero2__bio">
          I craft high-performance web products that marry clean code
          with pixel-perfect design — from idea to deployment.
        </p>
        <div className="hero2__cta-row">
          <a href="#projects" className="hero2__cta-primary">View Work</a>
          <a href="#contact" className="hero2__cta-ghost">Let's Talk</a>
        </div>
        <div className="hero2__stats">
          <div className="hero2__stat">
            <span className="stat__num">10+</span>
            <span className="stat__lbl">Projects</span>
          </div>
          <div className="hero2__stat-divider" />
          <div className="hero2__stat">
            <span className="stat__num">2+</span>
            <span className="stat__lbl">Years Exp</span>
          </div>
          <div className="hero2__stat-divider" />
          <div className="hero2__stat">
            <span className="stat__num">100%</span>
            <span className="stat__lbl">Satisfaction</span>
          </div>
        </div>
      </div>

      {/* ── SCROLL HINT ── */}
      <div className="hero2__scroll" ref={scrollRef}>
        <span className="hero2__scroll-label">SCROLL</span>
        <span className="hero2__scroll-line" />
      </div>

    </section>
  );
}