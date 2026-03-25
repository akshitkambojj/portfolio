import { useEffect, useRef } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

const services = [
  {
    title: "Mobile App Development",
    desc: "With extensive experience in mobile app development, I specialize in architecting and crafting custom hybrid applications tailored for Apple iOS and Google Android platforms.",
    tags: ["React Native", "Expo", "Cross-platform", "Android Studio"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Solid Design Solutions",
    desc: "Focused on a user-centered approach, we boost productivity and revenue. Our team's remarkable expertise and creativity push us to continually exceed our past achievements.",
    tags: ["Figma", "Adobe XD", "Prototyping", "Animations"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Web Development",
    desc: "Adaptive web design components use well-structured, readable code. These development solutions are optimized for performance and work seamlessly across devices and browsers.",
    tags: ["React.js", "Node.js", "MongoDB", "REST APIs"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
  },
];

const stats = [
  { num: "+10", label: "Projects Completed" },
  { num: "100%", label: "Client Satisfaction" },
  { num: "+2", label: "Years of Experience" },
  { num: "+5", label: "Happy Clients" },
];

const integrationIcons = [
  "fab fa-react",
  "fab fa-node-js",
  "fab fa-js",
  "fab fa-css3-alt",
  "fab fa-html5",
  "fab fa-git-alt",
  "fab fa-github",
  "fab fa-figma",
  "fab fa-npm",
  "fas fa-database",
];

export default function Services() {
  const headingRef = useRef(null);
  const cardsRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    // Heading
    gsap.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
      }
    );

    // Service cards stagger
    gsap.fromTo(
      ".service__card",
      { y: 70, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
      }
    );

    // Stats counter animation
    const statNums = document.querySelectorAll(".stat__num");
    statNums.forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
          );
        },
      });
    });
  }, []);

  return (
    <section id="services" style={{ position: "relative", overflow: "hidden" }}>
      {/* ── Animated Shader Background ── */}
      <MeshGradient
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          opacity: 0.5,
        }}
        colors={["#0a0a0a", "#0f0f0f", "#171717", "#111111"]}
        speed={0.35}
        backgroundColor="#0a0a0a"
      />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>

        {/* ── Heading ── */}
        <div ref={headingRef}>
          <span className="section-label">/ What I Do</span>
          <div className="services__head-row">
            <h2 className="section-title">Services</h2>
            <p className="services__head-desc">
              Craft Unforgettable and Impactful Websites,<br />
              Web Applications, and Mobile Apps.<br />
              Awesome Digital Branding, Design, and Development.
            </p>
          </div>
        </div>

        {/* ── 3 Service Cards ── */}
        <div className="services__grid" ref={cardsRef}>
          {services.map((svc, i) => (
            <div key={i} className="service__card hover-target">

              {/* Background image overlay on hover */}
              <div
                className="service__card-bg"
                style={{ backgroundImage: `url('${svc.image}')` }}
              />

              {/* Content */}
              <div className="service__card-content">
                <h3 className="service__title">{svc.title.toUpperCase()}</h3>
                <p className="service__desc">{svc.desc}</p>
                <div className="service__tags">
                  {svc.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* ── Integration Section ── */}
        <div className="services__integration" ref={statsRef}>
          <div className="integration__left">
            <span className="section-label">/ Integration</span>
            <h3 className="integration__title">
              Striving to create<br />innovative applications,
            </h3>
            <p className="integration__desc">
              A solid product development strategy involves clear objectives,
              thorough research, robust data analysis, actionable insights, and
              innovation. Prioritize user experience, agile development,
              continuous optimization, consistent branding, and rigorous testing
              to ensure product quality, meet market demands, and drive
              sustainable growth.
            </p>

            <p className="integration__sub">Some Numbers About</p>

            {/* Stats grid */}
            <div className="integration__stats" >
              {stats.map((s, i) => (
                <div key={i} className="integration__stat-box">
                  <div className="stat__top">
                    <span className="stat__num">{s.num}</span>
                  </div>
                  <p className="stat__label">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — circular icon wheel */}
          <div className="integration__right">
            <div className="icon-wheel">
              <div className="icon-wheel__center">
                <span className="icon-wheel__ak">AK</span>
              </div>
              {integrationIcons.map((icon, i) => {
                const angle = (i / integrationIcons.length) * 360;
                const rad = (angle * Math.PI) / 180;
                const r = 130; // radius px
                const x = Math.cos(rad) * r;
                const y = Math.sin(rad) * r;
                return (
                  <div
                    key={i}
                    className="icon-wheel__item"
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                  >
                    <i className={icon} />
                  </div>
                );
              })}
            </div>
            <p className="integration__formula">
              Productivity = Insights → Strategy → Growth
            </p>
          </div>
        </div>

        {/* ── Tech logos strip ── */}
        <div className="services__tech-strip">
          {["fab fa-html5", "fab fa-css3-alt", "fab fa-js", "fab fa-react",
            "fab fa-node-js", "fab fa-git-alt", "fab fa-github", "fab fa-figma",
            "fab fa-npm", "fas fa-database"].map((icon, i) => (
              <i key={i} className={`${icon} tech-strip__icon`} />
            ))}
        </div>

      </div>
    </section>
  );
}