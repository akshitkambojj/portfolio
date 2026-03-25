import { useEffect, useRef, useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Articles", href: "#articles" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("#home");

  /* ── Shrink nav on scroll ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── GSAP entrance ── */
  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap) return;
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  /* ── Active link on click ── */
  const handleClick = (href) => {
    setActive(href);
    setMenuOpen(false);
  };

  return (
    <>
      <nav ref={navRef} className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>

        {/* ── LOGO ── */}
        <a href="#home" className="navbar__logo" onClick={() => handleClick("#home")}>
          <div className="logo__icon">
            <span>AK</span>
          </div>
          <div className="logo__text">
            <span className="logo__name">AKSHIT</span>
            <span className="logo__surname">KAMBOJ</span>
          </div>
        </a>

        {/* ── CENTER LINKS (desktop) ── */}
        <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`navbar__link ${active === link.href ? "navbar__link--active" : ""}`}
                onClick={() => handleClick(link.href)}
              >
                {link.label}
                <span className="link__underline" />
              </a>
            </li>
          ))}
        </ul>

        {/* ── RIGHT: CTA + Hamburger ── */}
        <div className="navbar__right">
          <a href="#contact" className="navbar__cta" onClick={() => handleClick("#contact")}>
            Get Started
          </a>

          {/* Hamburger (mobile only) */}
          <button
            className={`navbar__hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>

      </nav>

      {/* ── MOBILE MENU OVERLAY ── */}
      {menuOpen && (
        <div className="mobile-menu">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="mobile-menu__link"
                  onClick={() => handleClick(link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="mobile-menu__cta" onClick={() => handleClick("#contact")}>
            Get Started
          </a>
        </div>
      )}
    </>
  );
}