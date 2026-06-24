import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { ExternalLink, Github, Layers } from 'lucide-react';
import { projectsAPI } from '../utils/api';

const CATEGORY_COLORS = {
  web: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  data: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' },
  iot: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20' },
  other: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
};

export default function Projects() {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    projectsAPI.getAll().then(r => setProjects(r.projects)).catch(() => {});
  }, []);

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="section-tag">Projects</span>
          <h2 className="section-title">Things I've built</h2>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {['all', 'web', 'data', 'iot'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all capitalize ${
                filter === cat
                  ? 'bg-accent text-bg border-accent'
                  : 'border-border text-text-dim hover:border-accent/50 hover:text-text'
              }`}
            >
              {cat === 'all' ? 'All Projects' : cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => {
            const c = CATEGORY_COLORS[project.category] || CATEGORY_COLORS.other;
            return (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08 }}
                className="card-glass group flex flex-col"
              >
                {/* Image / Placeholder */}
                <div className="w-full h-44 rounded-lg bg-bg border border-border mb-4 overflow-hidden flex items-center justify-center">
                  {project.image?.url ? (
                    <img src={project.image.url} alt={project.title}
                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center ${c.bg}`}>
                      <Layers size={36} className={c.text} />
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col">
                  {/* Category badge */}
                  <span className={`inline-block text-xs px-2 py-0.5 rounded-full border mb-2 w-fit ${c.bg} ${c.text} ${c.border}`}>
                    {project.category?.toUpperCase()}
                  </span>

                  <h3 className="font-display font-semibold text-text mb-2">{project.title}</h3>
                  <p className="text-text-dim text-sm leading-relaxed flex-1">{project.description}</p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 my-4">
                    {project.techStack?.slice(0, 4).map(t => (
                      <span key={t} className="text-xs px-2 py-0.5 bg-bg border border-border rounded text-text-dim font-mono">
                        {t}
                      </span>
                    ))}
                    {project.techStack?.length > 4 && (
                      <span className="text-xs text-text-dim">+{project.techStack.length - 4}</span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 pt-3 border-t border-border">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer"
                         className="flex items-center gap-1.5 text-text-dim hover:text-accent text-xs transition-colors">
                        <Github size={13} /> Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer"
                         className="flex items-center gap-1.5 text-text-dim hover:text-accent text-xs transition-colors">
                        <ExternalLink size={13} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-text-dim">
            <Layers size={40} className="mx-auto mb-3 opacity-30" />
            <p>Loading projects...</p>
          </div>
        )}

        {/* GitHub CTA */}
        <div className="text-center mt-12">
          <a href="https://github.com/rajjaiswal-developer" target="_blank" rel="noreferrer"
             className="btn-outline">
            <Github size={16} /> View all on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
