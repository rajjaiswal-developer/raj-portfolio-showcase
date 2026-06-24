import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { GraduationCap, Code2, Gamepad2, MapPin, Star } from 'lucide-react';

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="section-tag">About Me</span>
            <h2 className="section-title mb-6">
              Building software,<br />games & web solutions
            </h2>
            <p className="text-text-dim leading-relaxed mb-5">
              I'm <strong className="text-text">Raj Ramji Jaiswal</strong>, an aspiring software developer 
              and BSc IT student at Ramniranjan Jhunjhunwala College, Mumbai (SGPA: 9.18). I have 
              hands-on internship experience in Unity game development, web development, and data analysis.
            </p>
            <p className="text-text-dim leading-relaxed mb-8">
              Comfortable working with Java, C#, C++, Python, and JavaScript to build practical, 
              user-focused applications and games. I enjoy writing clean code, building interactive systems, 
              and using AI-assisted tools to improve development speed and quality.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: GraduationCap, label: 'Degree', value: 'BSc IT — RJ College' },
                { icon: Star,          label: 'SGPA',   value: '9.18 / 10.0' },
                { icon: MapPin,        label: 'Location', value: 'Mumbai, India' },
                { icon: Gamepad2,      label: 'Speciality', value: 'Game + Web Dev' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3 p-3 rounded-lg bg-surface border border-border">
                  <div className="p-1.5 bg-accent/10 rounded-md mt-0.5">
                    <Icon size={14} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-text-dim text-xs mb-0.5">{label}</p>
                    <p className="text-text text-sm font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-accent/3 rounded-2xl blur-2xl" />
            <div className="relative space-y-4">
              {[
                { num: '2',   label: 'Industry Internships',    desc: 'Game Dev at Work & Work Studios · Data Analyst at Elevate Lab' },
                { num: '9.18', label: 'Current SGPA',           desc: 'B.Sc. Information Technology, University of Mumbai' },
                { num: '5+',  label: 'Technologies',            desc: 'Java, C#, C++, Python, JS, Unity, React, SQL, MongoDB' },
                { num: '6+',  label: 'GitHub Projects',         desc: 'Web, data analysis & academic projects on GitHub' },
              ].map(({ num, label, desc }) => (
                <div key={label} className="card-glass flex items-center gap-6">
                  <span className="font-display text-3xl font-bold text-accent min-w-[64px]">{num}</span>
                  <div>
                    <p className="font-semibold text-text mb-0.5">{label}</p>
                    <p className="text-text-dim text-xs">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
