export default function Marquee() {
  const items = [
    "React.js", "Node.js", "GSAP", "Next.js", "MongoDB",
    "TypeScript", "Express.js", "REST APIs", "Tailwind CSS", "Git",
  ];

  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {[...items, ...items].map((item, i) => (
          <span key={i}>{item} <span className="marquee-sep">♠</span></span>
        ))}
      </div>
    </div>
  );
}