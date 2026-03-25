import { useState } from "react";
import axios from "axios";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: "fab fa-github", href: "#", label: "github" },
  { icon: "fab fa-dribbble", href: "#", label: "dribbble" },
  { icon: "fab fa-behance", href: "#", label: "behance" },
  { icon: "fab fa-twitter", href: "#", label: "twitter" },
  { icon: "fab fa-linkedin-in", href: "#", label: "linkedin" },
  { icon: "fab fa-instagram", href: "#", label: "instagram" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await axios.post("http://localhost:5000/api/contact", form);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact">
      <div className="container">

        {/* ── Mega "LET'S TALK" text ── */}
        <a href="mailto:akshitkamboj92@gmail.com" className="contact__mega hover-target">
          LET'S TALK
        </a>

        {/* ── Main contact grid ── */}
        <div className="contact__grid">

          {/* LEFT — headline + form */}
          <div className="contact__left">
            <h3 className="contact__headline">
              I am eager to connect with you<br />
              and hear your thoughts.
            </h3>
            <p className="contact__subtext">
              I welcome you to connect for potential collaborations or
              just a friendly chat. Let's create something amazing together!
            </p>

            {/* Contact Form */}
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="form__row">
                <div className="form__group">
                  <label className="form__label">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Akshit Kamboj"
                    className="form__input"
                    required
                  />
                </div>
                <div className="form__group">
                  <label className="form__label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="akshitkamboj92@gmail.com"
                    className="form__input"
                    required
                  />
                </div>
              </div>
              <div className="form__group">
                <label className="form__label">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  className="form__input form__textarea"
                  rows={5}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-outline contact__submit hover-target"
                disabled={status === "loading"}
              >
                <span>
                  {status === "loading" ? "Sending..." :
                    status === "success" ? "Message Sent! ✓" :
                      "Light Up the Talk"}
                </span>
                {status !== "success" && <i className="fas fa-paper-plane" />}
              </button>

              {status === "error" && (
                <p className="form__error">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>

          {/* RIGHT — contact info + links */}
          <div className="contact__right">

            {/* Contact details */}
            <div className="contact__info-block">
              <h4 className="contact__info-title">Contact Us</h4>
              <ul className="contact__info-list">
                <li>
                  <span className="contact__info-label">Email :</span>
                  <a href="mailto:akshitkamboj92@gmail.com" className="contact__info-val">
                    akshitkamboj92@gmail.com
                  </a>
                </li>
                <li>
                  <span className="contact__info-label">Phone :</span>
                  <span className="contact__info-val">+91 6397394750</span>
                </li>
                <li>
                  <span className="contact__info-label">Address :</span>
                  <span className="contact__info-val">
                    Phagwara, Punjab,<br />India — 144411
                  </span>
                </li>
              </ul>
            </div>

            {/* Quick links */}
            <div className="contact__info-block">
              <h4 className="contact__info-title">Links</h4>
              <ul className="contact__links-list">
                {quickLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="contact__quick-link hover-target">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* ── Footer bottom bar ── */}
        <div className="contact__footer">
          <div className="contact__footer-left">
            <div className="footer__logo">
              <div className="logo__icon"><span>AK</span></div>
              <div className="logo__text">
                <span className="logo__name">AKSHIT</span>
                <span className="logo__surname">KAMBOJ</span>
              </div>
            </div>
          </div>

          {/* Socials */}
          <div className="footer__socials">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="footer__social-link hover-target"
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
              >
                <i className={s.icon} />
              </a>
            ))}
          </div>

          <p className="footer__copy">
            © {new Date().getFullYear()} AKSHIT KAMBOJ. All rights reserved.
          </p>
        </div>

      </div>
    </section>
  );
}