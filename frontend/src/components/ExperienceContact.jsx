import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import {
  Briefcase,
  Calendar,
  MapPin,
  Send,
  Github,
  Linkedin,
  Mail,
  CheckCircle,
  GraduationCap,
} from "lucide-react";
import { contactAPI } from "../utils/api";
import toast from "react-hot-toast";

// ─────────────────────────────────────────────────────────────
// EXPERIENCE
// ─────────────────────────────────────────────────────────────
export function Experience() {
  const [ref, inView] = useInView({ threshold: 0.15 });

  const experiences = [
    {
      role: "Game Development Intern",
      company: "Work & Work Studios",
      period: "May 2025 – Jan 2026",
      location: "Remote",
      color: "#A78BFA",
      tags: [
        "Unity Engine",
        "C#",
        "Game Logic",
        "NPC AI",
        "Physics",
        "Animation",
      ],
      points: [
        "Built 20+ gameplay systems (player controls, weapons, NPC behavior, physics) across 5+ 2D/3D Unity projects using C#.",
        "Owned scene flow and debugging across the full project lifecycle.",
        "Used AI-assisted tools (Copilot/Claude) to speed up development and improve code quality.",
      ],
    },
    {
      role: "Data Analyst Intern",
      company: "Elevate Lab (Online)",
      period: "June 2025",
      location: "Remote",
      color: "#60A5FA",
      tags: [
        "Python",
        "SQL",
        "Excel",
        "Power BI",
        "Data Cleaning",
        "Dashboards",
      ],
      points: [
        "Cleaned and analyzed 10+ real-world datasets using Python, SQL, and Power BI.",
        "Built 4+ interactive Power BI dashboards surfacing key trends and patterns across the cleaned datasets.",
        "Delivered all assigned analyses within a 1-week deadline.",
      ],
    },
  ];

  const education = [
    {
      degree: "B.Sc. Information Technology (Grad. 2026)",
      institution: "Ramniranjan Jhunjhunwala College, University of Mumbai",
      year: "2026",
      result: "CGPA: 9.21",
    },
    {
      degree: "HSC",
      institution: "Vidya Niketan Jr. College, Ghatkopar East",
      year: "2023",
      result: "74.50%",
    },
    {
      degree: "SSC",
      institution: "N.S.C English High School, Ghatkopar West",
      year: "2021",
      result: "77.60%",
    },
  ];

  return (
    <section id="experience" className="py-24 bg-surface/40" ref={ref}>
      <div className="glow-line" />
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="section-tag">Experience & Education</span>
          <h2 className="section-title">Where I've worked & studied</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Internships */}
          <div>
            <h3 className="font-display font-semibold text-text mb-6 flex items-center gap-2">
              <Briefcase size={16} className="text-accent" /> Internship
              Experience
            </h3>
            <div className="space-y-6">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.15 }}
                  className="relative pl-6 border-l-2 ml-2"
                  style={{ borderColor: exp.color }}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-bg"
                    style={{ background: exp.color }}
                  />

                  <div className="card-glass">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h4 className="font-display font-bold text-text">
                          {exp.role}
                        </h4>
                        <p
                          className="text-sm font-medium mt-0.5"
                          style={{ color: exp.color }}
                        >
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="flex items-center gap-1 text-text-dim text-xs">
                          <Calendar size={11} /> {exp.period}
                        </span>
                        <span className="flex items-center gap-1 text-text-dim text-xs mt-1">
                          <MapPin size={11} /> {exp.location}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-1.5 mb-4">
                      {exp.points.map((pt, pi) => (
                        <li
                          key={pi}
                          className="flex items-start gap-2 text-text-dim text-sm"
                        >
                          <span className="text-accent mt-1.5 text-xs">▸</span>
                          {pt}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full border"
                          style={{
                            color: exp.color,
                            borderColor: `${exp.color}40`,
                            background: `${exp.color}10`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="font-display font-semibold text-text mb-6 flex items-center gap-2">
              <GraduationCap size={16} className="text-accent" /> Education
            </h3>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="card-glass"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-text text-sm mb-1">
                        {edu.degree}
                      </h4>
                      <p className="text-text-dim text-xs">{edu.institution}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-accent font-bold font-mono text-sm">
                        {edu.result}
                      </p>
                      <p className="text-text-dim text-xs mt-0.5">{edu.year}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Languages */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
                className="card-glass"
              >
                <p className="text-text-dim text-xs mb-2 font-mono">
                  LANGUAGES
                </p>
                <div className="flex gap-3">
                  {["English", "Hindi"].map((lang) => (
                    <span
                      key={lang}
                      className="px-3 py-1 bg-accent/10 text-accent border border-accent/20 rounded-full text-xs"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────────────────────
export function Contact() {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);
    try {
      await contactAPI.send(form);
      setSent(true);
      toast.success("Message sent! Raj will reply soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="section-tag">Contact</span>
          <h2 className="section-title">Let's connect</h2>
          <p className="text-text-dim mt-4 max-w-md mx-auto text-sm">
            Open to internships, freelance projects, and entry-level
            opportunities. Drop a message!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-text-dim mb-1.5 block">
                  Name *
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-text text-sm
                                  placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-text-dim mb-1.5 block">
                  Email *
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                  className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-text text-sm
                                  placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-text-dim mb-1.5 block">
                Subject
              </label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="What's this about?"
                className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-text text-sm
                                placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-text-dim mb-1.5 block">
                Message *
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="Tell me about the opportunity or project..."
                className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-text text-sm
                                   placeholder:text-muted focus:outline-none focus:border-accent transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                "Sending..."
              ) : sent ? (
                <>
                  <CheckCircle size={16} /> Message Sent!
                </>
              ) : (
                <>
                  <Send size={16} /> Send Message
                </>
              )}
            </button>
          </motion.form>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h3 className="font-display font-semibold text-text mb-2">
                Reach out directly
              </h3>
              <p className="text-text-dim text-sm leading-relaxed">
                I'm actively seeking entry-level roles where I can apply and
                grow my technical skills. Whether it's a full-time position,
                internship, or freelance project — let's talk!
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "rajjaiswal7450@gmail.com",
                  href: "mailto:rajjaiswal7450@gmail.com",
                },
                {
                  icon: Github,
                  label: "GitHub",
                  value: "github.com/rajjaiswal-developer",
                  href: "https://github.com/rajjaiswal-developer",
                },
                {
                  icon: Linkedin,
                  label: "LinkedIn",
                  value: "Raj Ramji Jaiswal",
                  href: "https://www.linkedin.com/in/raj-ramji-jaiswal-087822372/",
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 card-glass group"
                >
                  <div className="p-2.5 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                    <Icon size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-text-dim text-xs">{label}</p>
                    <p className="text-text text-sm font-medium break-all">
                      {value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Quick bio */}
            <div className="card-glass border-accent/20 bg-accent/5">
              <p className="text-xs text-accent font-mono mb-2">
                // quick info
              </p>
              <p className="text-text-dim text-xs leading-relaxed">
                📍 Mumbai, India &nbsp;·&nbsp; 🎓 BSc IT (TY) &nbsp;·&nbsp; 📧
                rajjaiswal7450@gmail.com
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
