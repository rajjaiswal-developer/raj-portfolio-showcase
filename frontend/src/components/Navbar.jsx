import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count } = useCart();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '/#about' },
    { label: 'Skills', href: '/#skills' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Experience', href: '/#experience' },
    { label: 'Contact', href: '/#contact' },
    { label: 'Shop', href: '/shop' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-bg/95 backdrop-blur-md border-b border-border' : 'bg-transparent'
    }`}>
      <nav className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-display font-bold text-lg text-text hover:text-accent transition-colors">
          RJ<span className="text-accent">.</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-7">
          {navLinks.map(l => (
            <li key={l.label}>
              {l.href.startsWith('/#') ? (
                <a href={l.href} className="nav-link">{l.label}</a>
              ) : (
                <Link
                  to={l.href}
                  className={`nav-link ${location.pathname === l.href ? 'text-accent' : ''}`}
                >
                  {l.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Cart + Mobile */}
        <div className="flex items-center gap-3">
          <Link to="/cart" className="relative p-2 text-text-dim hover:text-accent transition-colors">
            <ShoppingCart size={20} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-bg text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          <button
            className="md:hidden p-2 text-text-dim hover:text-accent"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-surface border-b border-border px-4 pb-4"
          >
            {navLinks.map(l => (
              <div key={l.label} className="py-2.5 border-b border-border/50 last:border-0">
                {l.href.startsWith('/#') ? (
                  <a href={l.href} className="text-text-dim hover:text-accent transition-colors text-sm"
                     onClick={() => setMobileOpen(false)}>{l.label}</a>
                ) : (
                  <Link to={l.href} className="text-text-dim hover:text-accent transition-colors text-sm"
                        onClick={() => setMobileOpen(false)}>{l.label}</Link>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
