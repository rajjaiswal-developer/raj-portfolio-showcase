import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Github,
  Linkedin,
  Download,
  Terminal,
  Mail,
} from "lucide-react";

const ROLES = ["Software Developer", "Game Developer", "Web Developer"];

const TECH_ICONS = [
  {
    id: "react",
    top: "10%",
    left: "18%",
    delay: 0,
    size: 44,
    border: "rgba(97,218,251,0.3)",
    bg: "rgba(97,218,251,0.12)",
    svg: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <circle cx="12" cy="12" r="2.5" fill="#61DAFB" />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4"
          stroke="#61DAFB"
          strokeWidth="1.2"
          fill="none"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4"
          stroke="#61DAFB"
          strokeWidth="1.2"
          fill="none"
          transform="rotate(60 12 12)"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4"
          stroke="#61DAFB"
          strokeWidth="1.2"
          fill="none"
          transform="rotate(120 12 12)"
        />
      </svg>
    ),
  },
  {
    id: "js",
    top: "15%",
    right: "18%",
    delay: 0.4,
    size: 44,
    border: "rgba(247,223,30,0.3)",
    bg: "rgba(247,223,30,0.12)",
    svg: (
      <svg viewBox="0 0 24 24" width="22" height="22">
        <rect width="24" height="24" rx="3" fill="#F7DF1E" />
        <text
          x="3"
          y="19"
          fontSize="11"
          fontWeight="bold"
          fontFamily="Arial,sans-serif"
          fill="#000"
        >
          JS
        </text>
      </svg>
    ),
  },
  {
    id: "node",
    top: "33%",
    left: "4%",
    delay: 0.8,
    size: 44,
    border: "rgba(104,160,99,0.3)",
    bg: "rgba(104,160,99,0.12)",
    svg: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="#7fdc76">
        <path d="M12 2L2 7v5c0 5.25 3.75 10.15 9 11.25 1.25-.28 2.42-.78 3.5-1.45V20.7C13.62 21.22 12.82 21.5 12 21.5c-4.69-1.04-8-5.38-8-9.5V8.31L12 3.54l8 4.77V12c0 .17-.01.34-.02.51H22c.01-.17.02-.34.02-.51V7L12 2z" />
        <path d="M18 13v5l-4 2.25L10 18v-5l4-2 4 2z" fill="#4da02f" />
        <path d="M14 11.27L10 13.5V18l4 2.25V11.27z" fill="#7ae770" />
        <path d="M14 11.27L18 13.5V18l-4 2.25V11.27z" fill="#4da02f" />
      </svg>
    ),
  },
  {
    id: "python",
    bottom: "10%",
    left: "43%",
    delay: 1.2,
    size: 40,
    border: "rgba(55,118,171,0.3)",
    bg: "rgba(55,118,171,0.15)",
    svg: (
      <svg viewBox="0 0 24 24" width="22" height="22">
        <path
          d="M12 2C9.5 2 7.5 2.5 7.5 4.5V6h5v1H5.5C3.5 7 2 8.5 2 11s1.5 4 3.5 4H7v-2.5c0-2 1.5-3.5 5-3.5s5 1.5 5 3.5V15h1.5c2 0 3.5-1.5 3.5-4s-1.5-4-3.5-4H17V4.5C17 2.5 15 2 12 2z"
          fill="#3776AB"
        />
        <path
          d="M12 22c2.5 0 4.5-.5 4.5-2.5V18h-5v-1h6.5c2 0 3.5-1.5 3.5-4s-1.5-4-3.5-4H17v2.5c0 2-1.5 3.5-5 3.5s-5-1.5-5-3.5V9H5.5C3.5 9 2 10.5 2 13s1.5 4 3.5 4H7v2.5C7 21.5 9 22 12 22z"
          fill="#FFD43B"
        />
        <circle cx="10" cy="4.5" r="1" fill="#fff" />
        <circle cx="14" cy="19.5" r="1" fill="#fff" />
      </svg>
    ),
  },
  {
    id: "html",
    top: "28%",
    right: "4%",
    delay: 0.6,
    size: 44,
    border: "rgba(167,139,250,0.3)",
    bg: "rgba(167,139,250,0.12)",
    svg: (
      <svg viewBox="0 0 24 24" width="22" height="22">
        <path d="M4 3l1.5 17L12 22l6.5-2L20 3H4z" fill="#E44D26" />
        <path d="M12 4.5v15.3l5.3-1.5L18.5 4.5H12z" fill="#F16529" />
        <path
          d="M8 8h4V9.5H9.5l.2 2H12V13H8.3L8 8zM8.5 14H10l.1 1.5 1.9.5v1.6L8.8 17 8.5 14z"
          fill="#fff"
        />
        <path
          d="M12 8h4l-.3 5H12v-1.5h2.3l.1-2H12V8zM12 14h1.6l-.2 1.5-1.4.4V17.6l2.8-.7.4-4.9H12V14z"
          fill="#ebebeb"
        />
      </svg>
    ),
  },
  {
    id: "github",
    bottom: "22%",
    right: "6%",
    delay: 1.0,
    size: 40,
    border: "rgba(226,232,240,0.2)",
    bg: "rgba(226,232,240,0.08)",
    svg: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="#E2E8F0">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85 0 1.7.11 2.5.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z" />
      </svg>
    ),
  },
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const target = ROLES[roleIndex];
    if (typing) {
      if (displayed.length < target.length) {
        const t = setTimeout(
          () => setDisplayed(target.slice(0, displayed.length + 1)),
          75,
        );
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2000);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
        return () => clearTimeout(t);
      } else {
        setRoleIndex((i) => (i + 1) % ROLES.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, roleIndex]);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center hero-gradient grid-bg overflow-hidden pt-16">
      {/* Background ambient orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/3 rounded-full blur-3xl pointer-events-none" />
      <div
        className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/3 right-1/3 w-48 h-48 rounded-full blur-2xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,245,160,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 md:px-6 w-full">
        <div className="flex items-center justify-between gap-8">
          {/* ── LEFT SIDE ──────────────────────────────────── */}
          <motion.div
            className="max-w-xl w-full flex-shrink-0"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div
              variants={item}
              className="flex items-center gap-2 mb-6"
            >
              <span className="inline-flex items-center gap-2 text-accent text-xs font-mono border border-accent/20 bg-accent/5 px-3 py-1.5 rounded-full">
                <Terminal size={12} />
                Open to opportunities · Mumbai, India
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="font-display text-5xl md:text-7xl font-bold text-text mb-4 leading-none"
            >
              Hi, I'm
              <br />
              <span className="text-accent">Raj Jaiswal</span>
            </motion.h1>

            <motion.div variants={item} className="h-10 mb-6 flex items-center">
              <span className="font-mono text-xl md:text-2xl text-text-dim">
                {displayed}
                <span className="text-accent animate-pulse">|</span>
              </span>
            </motion.div>

            <motion.p
              variants={item}
              className="text-text-dim text-lg md:text-xl leading-relaxed max-w-xl mb-10"
            >
              BSc IT student at RJ College with hands-on internship experience
              in Unity game development, web development & data analysis.
              Skilled in Java, C#, C++, Python & JavaScript.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4 mb-12">
              <a href="#contact" className="btn-primary">
                Get in touch <ArrowRight size={16} />
              </a>
              <a
                href="https://drive.google.com/file/d/1RKO9qFKaXWHrJbaOX426YVCsS-7L5Ufn/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="btn-outline"
              >
                <Download size={16} /> Download Resume
              </a>
            </motion.div>

            <motion.div
              variants={item}
              className="flex flex-wrap items-center gap-5"
            >
              <a
                href="https://github.com/rajjaiswal-developer"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-text-dim hover:text-accent transition-colors text-sm"
              >
                <Github size={15} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/raj-ramji-jaiswal-087822372/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-text-dim hover:text-accent transition-colors text-sm"
              >
                <Linkedin size={15} /> LinkedIn
              </a>
              <a
                href="mailto:rajjaiswal7450@gmail.com"
                className="flex items-center gap-2 text-text-dim hover:text-accent transition-colors text-sm font-mono"
              >
                <Mail size={15} /> rajjaiswal7450@gmail.com
              </a>
            </motion.div>
          </motion.div>

          {/* ── RIGHT SIDE — mascot visual ─────────────────── */}
          <motion.div
            className="hidden lg:flex flex-1 items-center justify-center relative"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            style={{ minHeight: 520 }}
          >
            {/* Deep glow layers */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                style={{
                  width: 380,
                  height: 380,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(167,139,250,0.15) 0%, rgba(0,245,160,0.05) 50%, transparent 75%)",
                  filter: "blur(24px)",
                  position: "absolute",
                }}
              />
              <div
                style={{
                  width: 280,
                  height: 280,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(0,245,160,0.08) 0%, transparent 70%)",
                  filter: "blur(16px)",
                  position: "absolute",
                }}
              />
            </div>

            {/* Floating rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                style={{
                  width: 420,
                  height: 420,
                  borderRadius: "50%",
                  border: "1px solid rgba(0,245,160,0.08)",
                  position: "absolute",
                }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                style={{
                  width: 340,
                  height: 340,
                  borderRadius: "50%",
                  border: "1px dashed rgba(167,139,250,0.1)",
                  position: "absolute",
                }}
              />
            </div>

            {/* Floating tech icon badges */}
            {TECH_ICONS.map((icon) => (
              <motion.div
                key={icon.id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                transition={{
                  opacity: { duration: 0.5, delay: icon.delay + 0.5 },
                  scale: { duration: 0.5, delay: icon.delay + 0.5 },
                  y: {
                    duration: 3 + icon.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: icon.delay,
                  },
                }}
                style={{
                  position: "absolute",
                  top: icon.top,
                  left: icon.left,
                  right: icon.right,
                  bottom: icon.bottom,
                  width: icon.size,
                  height: icon.size,
                  background: icon.bg,
                  border: `1px solid ${icon.border}`,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(8px)",
                  zIndex: 10,
                  boxShadow: `0 0 16px ${icon.bg}`,
                }}
              >
                {icon.svg}
              </motion.div>
            ))}

            {/* Code snippet card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, -5, 0] }}
              transition={{
                opacity: { duration: 0.6, delay: 1.2 },
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                },
              }}
              style={{
                position: "absolute",
                bottom: "16%",
                left: "0%",
                background: "rgba(15,19,24,0.85)",
                border: "1px solid rgba(0,245,160,0.15)",
                borderRadius: 10,
                padding: "10px 14px",
                backdropFilter: "blur(12px)",
                zIndex: 10,
                minWidth: 170,
                boxShadow: "0 0 24px rgba(0,245,160,0.05)",
              }}
            >
              <div style={{ display: "flex", gap: 5, marginBottom: 8 }}>
                {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
                  <div
                    key={c}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: c,
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  lineHeight: 1.7,
                }}
              >
                <div>
                  <span style={{ color: "#A78BFA" }}>const</span>
                  <span style={{ color: "#E2E8F0" }}> dev </span>
                  <span style={{ color: "#00F5A0" }}>=</span>
                  <span style={{ color: "#E2E8F0" }}> {"{"}</span>
                </div>
                <div style={{ paddingLeft: 12 }}>
                  <span style={{ color: "#60A5FA" }}>passion</span>
                  <span style={{ color: "#E2E8F0" }}>: </span>
                  <span style={{ color: "#FBB724" }}>"code"</span>
                  <span style={{ color: "#E2E8F0" }}>,</span>
                </div>
                <div style={{ paddingLeft: 12 }}>
                  <span style={{ color: "#60A5FA" }}>focus</span>
                  <span style={{ color: "#E2E8F0" }}>: </span>
                  <span style={{ color: "#FBB724" }}>"growth"</span>
                  <span style={{ color: "#E2E8F0" }}>,</span>
                </div>
                <div style={{ paddingLeft: 12 }}>
                  <span style={{ color: "#60A5FA" }}>goal</span>
                  <span style={{ color: "#E2E8F0" }}>: </span>
                  <span style={{ color: "#FBB724" }}>"impact"</span>
                </div>
                <div>
                  <span style={{ color: "#E2E8F0" }}>{"}"}</span>
                  <span style={{ color: "#E2E8F0" }}>;</span>
                </div>
              </div>
            </motion.div>

            {/* Terminal card */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: [0, -6, 0] }}
              transition={{
                opacity: { duration: 0.6, delay: 1.5 },
                y: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                },
              }}
              style={{
                position: "absolute",
                top: "40%",
                right: "-13%",
                background: "rgba(15,19,24,0.85)",
                border: "1px solid rgba(167,139,250,0.2)",
                borderRadius: 10,
                padding: "10px 14px",
                backdropFilter: "blur(12px)",
                zIndex: 10,
                minWidth: 180,
                boxShadow: "0 0 24px rgba(167,139,250,0.06)",
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  lineHeight: 1.8,
                }}
              >
                <div style={{ color: "#00F5A0" }}>{">"}_</div>
                <div style={{ color: "#8892A4" }}>Building digital</div>
                <div style={{ color: "#8892A4" }}>solutions for a</div>
                <div style={{ color: "#8892A4" }}>
                  better tomorrow.
                  <span
                    style={{
                      color: "#00F5A0",
                      animation: "blink 1s step-end infinite",
                    }}
                  >
                    ▋
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Mascot image */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "relative",
                zIndex: 5,
                filter:
                  "drop-shadow(0 0 40px rgba(167,139,250,0.25)) drop-shadow(0 0 80px rgba(0,245,160,0.1))",
              }}
            >
              <img
                src="/hero-mascot.png"
                alt="Raj Jaiswal — Developer"
                style={{
                  width: "clamp(380px, 46vw, 520px)",
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: 24,
                  display: "block",
                }}
              />
            </motion.div>

            {/* Particle dots */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.6,
                  ease: "easeInOut",
                }}
                style={{
                  position: "absolute",
                  width: i % 2 === 0 ? 4 : 3,
                  height: i % 2 === 0 ? 4 : 3,
                  borderRadius: "50%",
                  background:
                    i % 3 === 0
                      ? "#00F5A0"
                      : i % 3 === 1
                        ? "#A78BFA"
                        : "#60A5FA",
                  top: `${15 + i * 12}%`,
                  left: `${5 + i * 14}%`,
                  pointerEvents: "none",
                }}
              />
            ))}
          </motion.div>
          {/* ── END RIGHT SIDE ─────────────────────────────── */}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-text-dim text-xs font-mono">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-accent to-transparent"
        />
      </div>

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </section>
  );
}
