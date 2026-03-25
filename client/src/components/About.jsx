import { useEffect, useRef } from "react";
import akshitAvatar from "../assets/akshit.png";

const personalInfo = [
  { label: "Name", value: "Akshit Kamboj" },
  { label: "Nationality", value: "Indian" },
  { label: "Phone", value: "+91 6397394750" },
  { label: "Experience", value: "2+ Years" },
  { label: "Freelance", value: "Available" },
  { label: "Language", value: "Hindi / English" },
];

const skillSections = [
  {
    title: "Tech Stack",
    skills: "HTML, CSS, JavaScript, TypeScript, React.js, Node.js, Express.js, MongoDB, MySQL",
  },
  {
    title: "Front-End Side",
    skills: "HTML, CSS, JavaScript, TypeScript, React.js, Tailwind CSS, Bootstrap, GSAP, Framer Motion",
  },
  {
    title: "Back-End Side",
    skills: "Node.js, Express.js, REST APIs, JWT Auth, MongoDB, MySQL, Postman, Git/GitHub",
  },
  {
    title: "UI & Styling",
    skills: "CSS3, Sass, Tailwind CSS, Bootstrap, Material-UI, Flexbox, Grid, Animations, GSAP",
  },
  {
    title: "Database",
    skills: "MongoDB, MySQL, Mongoose, Schema Design, Indexing, Normalization, Document Modeling",
  },
  {
    title: "RestAPI / APIs",
    skills: "REST API Design, Express.js, JWT, OAuth, Postman, Swagger, Rate Limiting, CORS, HTTPS",
  },
];

const handleDownload = () => {
  const link = document.createElement("a");
  link.href = "/ak new cv 26.pdf";
  link.download = "Akshit_Kamboj_CV.pdf";
  link.click();
};

export default function About() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    // Heading slide up
    gsap.fromTo(
      headingRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
      }
    );

    // Left panel
    gsap.fromTo(
      leftRef.current,
      { x: -50, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: leftRef.current, start: "top 80%" },
      }
    );

    // Right skill cards stagger
    gsap.fromTo(
      ".skill-card",
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: rightRef.current, start: "top 80%" },
      }
    );
  }, []);

  return (
    <section id="about" ref={sectionRef}>
      <div className="container">

        {/* ── Section heading ── */}
        <div className="about__header" ref={headingRef}>
          <span className="section-label">/ Who I Am</span>
          <h2 className="section-title">About</h2>
        </div>

        {/* ── Main grid: left bio + right skills ── */}
        <div className="about__grid">

          {/* LEFT — bio text + personal info */}
          <div className="about__left" ref={leftRef}>
            <div className="about__bio-wrap">
              <div className="about__avatar-ring">
                <img
                  src={akshitAvatar}
                  alt="Akshit Kamboj"
                  className="about__avatar"
                />
              </div>
              <div>
                <h3 className="about__bio-name">Akshit Kamboj</h3>
                <p className="about__bio-role">Full Stack Developer</p>
              </div>
            </div>

            <p className="about__bio-text">
              Hello! I'm Akshit Kamboj, a full-stack developer passionate about
              building scalable web applications. I specialize in React.js, Node.js,
              and MongoDB. Committed to continuous learning, I prioritize clean code,
              user experience, and delivering impactful digital solutions.
              Let's create something amazing together!
            </p>

            {/* Personal info table */}
            <ul className="about__info-list">
              {personalInfo.map((item) => (
                <li key={item.label} className="about__info-item">
                  <span className="info__label">{item.label}</span>
                  <span className="info__colon">:</span>
                  <span className="info__value">{item.value}</span>
                </li>
              ))}
            </ul>

            <button onClick={handleDownload} className="btn-outline about__resume-btn">
              <span>Download CV</span>
              <i className="fas fa-download" />
            </button>
          </div>

          {/* RIGHT — skills grid */}
          <div className="about__right" ref={rightRef}>
            <div className="skills-grid">
              {skillSections.map((section) => (
                <div key={section.title} className="skill-card hover-target">
                  <h4 className="skill-card__title">{section.title}</h4>
                  <p className="skill-card__skills">{section.skills}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}