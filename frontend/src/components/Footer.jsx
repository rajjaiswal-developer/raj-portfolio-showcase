import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="font-display font-bold text-lg text-text">RJ<span className="text-accent">.</span></span>
          <p className="text-text-dim text-xs mt-1">Full Stack Developer · IoT Developer · BSc IT</p>
        </div>
        <div className="flex items-center gap-5">
          <a href="https://github.com/rajjaiswal-developer" target="_blank" rel="noreferrer"
             className="text-text-dim hover:text-accent transition-colors">
            <Github size={18} />
          </a>
          <a href="https://www.linkedin.com/in/raj-ramji-jaiswal-087822372/" target="_blank" rel="noreferrer"
             className="text-text-dim hover:text-accent transition-colors">
            <Linkedin size={18} />
          </a>
          <a href="mailto:rajjaiswal@example.com"
             className="text-text-dim hover:text-accent transition-colors">
            <Mail size={18} />
          </a>
        </div>
        <p className="text-text-dim text-xs">© {new Date().getFullYear()} Raj Jaiswal. All rights reserved.</p>
      </div>
    </footer>
  );
}
