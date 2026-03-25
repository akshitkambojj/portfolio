import { useEffect, useRef } from "react";

export default function Preloader({ onComplete }) {
  const preloaderRef = useRef(null);
  const counterRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap) {
      // If no GSAP, just hide after 1s
      setTimeout(() => {
        if (preloaderRef.current) preloaderRef.current.style.display = "none";
        if (onComplete) onComplete();
      }, 1000);
      return;
    }

    let progress = 0;

    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 8) + 2;
      if (progress > 100) progress = 100;

      if (counterRef.current) counterRef.current.innerText = progress + "%";
      if (barRef.current) barRef.current.style.width = progress + "%";

      if (progress === 100) {
        clearInterval(interval);
        playOutAnimation();
      }
    }, 35);

    function playOutAnimation() {
      const tl = gsap.timeline({
        onComplete: () => {
          if (preloaderRef.current) preloaderRef.current.style.display = "none";
          if (onComplete) onComplete();
        },
      });

      // Fade out counter
      tl.to(".preloader__content", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power3.in",
      })
        // Cinematic curtain slices collapse upward
        .to(".loader-slice", {
          scaleY: 0,
          duration: 1.2,
          stagger: 0.08,
          ease: "power4.inOut",
          transformOrigin: "top",
        }, "-=0.2");
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="preloader" ref={preloaderRef}>

      {/* 5 vertical slice bars */}
      {[...Array(5)].map((_, i) => (
        <div key={i} className="loader-slice" />
      ))}

      {/* Counter + progress bar */}
      <div className="preloader__content">
        <div className="preloader__counter" ref={counterRef}>0%</div>
        <div className="preloader__bar-track">
          <div className="preloader__bar" ref={barRef} />
        </div>
        <p className="preloader__label">Loading Portfolio</p>
      </div>

    </div>
  );
}