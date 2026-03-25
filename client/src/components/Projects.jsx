import { useEffect, useRef, useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

const projects = [
  {
    title: "PriceMate – Smart Price Comparison Platform",
    desc: "Engineered a smart web-based price comparison platform that aggregates and compares product prices across multiple e-commerce sources, enabling users to identify the best deals efficiently and reducing manual price-search effort by 45%. Built dynamic product search, category-based filtering, and real-time price range comparison. Developed a scalable backend with secure API integration and structured data handling, ensuring reliable price retrieval and seamless communication.",
    tags: ["HTML", "CSS", "JavaScript", "React.js", "Node.js", "MongoDB"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    link: "#",
  },
  {
    title: "Daily Expenses Tracker - Personal Finance Management",
    desc: "Implemented features such as interactive charts, automated expense summaries, and user-friendly UI components to help users track and manage daily spending effectively. Integrated AI-powered insights to automatically analyze user expenses, categorize spending patterns, and provide smart suggestions for better financial planning. Significantly reduced manual effort by automating expense tracking and report generation, enabling users to make quick and informed financial decisions.",
    tags: ["HTML", "CSS", "JavaScript", "React.js", "Node.js"],
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop",
    link: "#",
  },
  {
    title: "Food Delivery Mobile App",
    desc: "Cross-platform food delivery application with real-time order tracking, driver app, admin panel, and secure payment gateway. Built for iOS and Android.",
    tags: ["React Native", "Node.js", "MongoDB", "Socket.io", "Expo"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    link: "#",
  },
];

const testimonials = [
  {
    title: "Data Structures & Algorithms",
    issuer: "CipherSchools",
    date: "July 2025",
    certId: "CSW2025-13026",
    desc: "Successfully completed training in Data Structures Algorithms at Lovely Professional University, certified by CipherSchools, India. Signed by Anurag Mishra, Founder CipherSchools.",
    cert: "/src/assets/cert_cipherschools.png",
  },
  {
    title: "Hardware & Operating Systems",
    issuer: "IBM · Coursera",
    date: "Sep 8, 2024",
    certId: "Coursera Verified",
    desc: "Successfully completed Introduction to Hardware and Operating Systems, an online non-credit course authorized by IBM and offered through Coursera. Signed by Bav Ahuja, Global Program Director, IBM Skills Network.",
    cert: "/src/assets/cert_ibm.png",
  },
  {
    title: "Computer Networking",
    issuer: "Google · Coursera",
    date: "Sep 7, 2024",
    certId: "Coursera Verified",
    desc: "Successfully completed The Bits and Bytes of Computer Networking, an online non-credit course authorized by Google and offered through Coursera.",
    cert: "/src/assets/cert_google.png",
  },
];

export default function Projects() {
  const headingRef = useRef(null);
  const sliderRef = useRef(null);
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? projects.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === projects.length - 1 ? 0 : c + 1));

  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
      }
    );

    gsap.fromTo(
      ".testimonial-card",
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".projects__testimonials", start: "top 80%" },
      }
    );
  }, []);

  // Animate slide change
  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap || !sliderRef.current) return;
    gsap.fromTo(
      sliderRef.current,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }
    );
  }, [current]);

  return (
    <section id="projects" style={{ position: "relative", overflow: "hidden" }}>
      {/* ── Animated Shader Background ── */}
      <MeshGradient
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          opacity: 0.55,
        }}
        colors={["#0a0a0a", "#111111", "#1a1a1a", "#0d0d0d"]}
        speed={0.4}
        backgroundColor="#0a0a0a"
      />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>

        {/* ── Heading ── */}
        <div ref={headingRef}>
          <span className="section-label">/ My Work</span>
          <div className="projects__head-row">
            <h2 className="section-title">Projects</h2>
            <p className="projects__head-desc">
              User-centered Development Approach Enhances<br />
              Productivity and Drives Revenue Growth.
            </p>
          </div>
        </div>

        {/* ── Project Slider ── */}
        <div className="projects__slider">

          {/* Main slide */}
          <div className="projects__slide" ref={sliderRef}>
            <div className="projects__slide-img-wrap">
              <img
                src={projects[current].image}
                alt={projects[current].title}
                className="projects__slide-img"
              />
              <div className="projects__slide-overlay" />
              <span className="projects__slide-label">
                {projects[current].title}
              </span>
            </div>

            <div className="projects__slide-info">
              <p className="projects__slide-desc">
                {projects[current].desc}
              </p>
              <div className="projects__slide-tags">
                {projects[current].tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <a
                href={projects[current].link}
                className="btn-outline projects__slide-btn hover-target"
                target="_blank"
                rel="noreferrer"
              >
                <span>View Project</span>
                <i className="fas fa-arrow-right" />
              </a>
            </div>
          </div>

          {/* Controls */}
          <div className="projects__controls">
            <button className="projects__arrow hover-target" onClick={prev}>
              <i className="fas fa-chevron-left" />
            </button>
            <span className="projects__counter">
              {String(current + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
            <button className="projects__arrow hover-target" onClick={next}>
              <i className="fas fa-chevron-right" />
            </button>

            {/* Dots */}
            <div className="projects__dots">
              {projects.map((_, i) => (
                <button
                  key={i}
                  className={`projects__dot ${i === current ? "projects__dot--active" : ""}`}
                  onClick={() => setCurrent(i)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Testimonials & Recognitions ── */}
        <div className="projects__testimonials">
          <span className="section-label">/ Recognition</span>
          <h2 className="section-title">Testimonials</h2>
          <p className="projects__test-desc">
            I'm proud to be recognized for my innovative solutions by
            prestigious firms and clients. Here's what they have to say.
          </p>

          <div className="testimonials__grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card hover-target">
                <div className="testimonial-card__cert">
                  <img src={t.cert} alt={`${t.title} Certificate`} />
                  <div className="cert__overlay" />
                </div>
                <div className="testimonial-card__meta">
                  <span className="testimonial-card__issuer">{t.issuer}</span>
                  <span className="testimonial-card__date">{t.date}</span>
                </div>
                <h4 className="testimonial-card__title">{t.title}</h4>
                <p className="testimonial-card__desc">{t.desc}</p>
                <span className="testimonial-card__certid">ID: {t.certId}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}