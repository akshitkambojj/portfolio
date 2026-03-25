import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const outline = outlineRef.current;
    if (!dot || !outline) return;

    const gsap = window.gsap;
    if (!gsap) return;

    // Center transform origin
    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.set(outline, { xPercent: -50, yPercent: -50 });

    // Quick setters for performance
    const setDotX = gsap.quickSetter(dot, "x", "px");
    const setDotY = gsap.quickSetter(dot, "y", "px");
    const setOutlineX = gsap.quickSetter(outline, "x", "px");
    const setOutlineY = gsap.quickSetter(outline, "y", "px");

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    // Dot follows mouse instantly
    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      setDotX(mouse.x);
      setDotY(mouse.y);
    };
    window.addEventListener("mousemove", onMouseMove);

    // Outline lerps behind with lag
    const ticker = gsap.ticker.add(() => {
      pos.x += (mouse.x - pos.x) * 0.12;
      pos.y += (mouse.y - pos.y) * 0.12;
      setOutlineX(pos.x);
      setOutlineY(pos.y);
    });

    // Hover state — expand outline on interactive elements
    const targets = document.querySelectorAll("a, button, .hover-target");
    const onEnter = () => document.body.classList.add("cursor-hover");
    const onLeave = () => document.body.classList.remove("cursor-hover");

    targets.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // Hide cursor when leaving window
    const onLeaveWindow = () => {
      gsap.to([dot, outline], { opacity: 0, duration: 0.3 });
    };
    const onEnterWindow = () => {
      gsap.to([dot, outline], { opacity: 1, duration: 0.3 });
    };
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
      gsap.ticker.remove(ticker);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-outline" ref={outlineRef} />
    </>
  );
}