import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const SKILLS = [
  {
    category: 'Programming Languages',
    color: 'from-violet-500/15 to-purple-500/15',
    border: 'border-violet-500/20',
    icon: '{ }',
    skills: ['C++', 'Java', 'C#', 'Python', 'PHP'],
  },
  {
    category: 'Game Development',
    color: 'from-green-500/15 to-emerald-500/15',
    border: 'border-green-500/20',
    icon: '🎮',
    skills: ['Unity Engine (2D & 3D)', 'C# Scripting', 'Gameplay Logic', 'Physics', 'NPC Behavior', 'Scene Management'],
  },
  {
    category: 'Web Development',
    color: 'from-blue-500/15 to-cyan-500/15',
    border: 'border-blue-500/20',
    icon: '</>',
    skills: ['HTML', 'CSS', 'JavaScript', 'React (Basics)', 'PHP', 'WordPress'],
  },
  {
    category: 'Database',
    color: 'from-orange-500/15 to-amber-500/15',
    border: 'border-orange-500/20',
    icon: '🗄',
    skills: ['SQL', 'MongoDB'],
  },
  {
    category: 'Data Analysis',
    color: 'from-yellow-500/15 to-orange-500/15',
    border: 'border-yellow-500/20',
    icon: '📊',
    skills: ['Python', 'Excel', 'Power BI', 'Data Cleaning', 'Dashboards'],
  },
  {
    category: 'Core Concepts & Tools',
    color: 'from-pink-500/15 to-rose-500/15',
    border: 'border-pink-500/20',
    icon: '⚙',
    skills: ['OOP', 'DSA', 'Linux', 'Git & GitHub', 'AI-Assisted Dev'],
  },
];

export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section id="skills" className="py-24 relative" ref={ref}>
      <div className="glow-line" />
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-tag">Technical Skills</span>
          <h2 className="section-title">What I work with</h2>
          <p className="text-text-dim mt-4 max-w-md mx-auto text-sm">
            Skills gained through internships, academic projects, and self-learning.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map(({ category, color, border, icon, skills }, i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`card-glass bg-gradient-to-br ${color} border ${border}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-lg font-mono">{icon}</span>
                <h3 className="font-display font-semibold text-text text-sm tracking-wide uppercase">
                  {category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span key={skill} className="skill-badge">{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
