import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  ShoppingBag,
  MessageSquare,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "../App";

const NAV = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/products", icon: Package, label: "Products" },
  { to: "/projects", icon: FolderOpen, label: "Projects" },
  { to: "/orders", icon: ShoppingBag, label: "Orders" },
  { to: "/messages", icon: MessageSquare, label: "Messages" },
];

const s = {
  sidebar: {
    background: "#0F1318",
    borderRight: "1px solid #1A2030",
    minHeight: "100vh",
    width: 240,
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    padding: "24px 16px",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 40,
  },
  logo: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: 20,
    color: "#E2E8F0",
    marginBottom: 32,
    paddingLeft: 8,
  },
  accent: { color: "#00F5A0" },
  nav: { flex: 1, display: "flex", flexDirection: "column", gap: 4 },
  link: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 12px",
    borderRadius: 8,
    color: "#8892A4",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 500,
    transition: "all 0.2s",
  },
  activeLink: {
    background: "rgba(0,245,160,0.08)",
    color: "#00F5A0",
    borderLeft: "2px solid #00F5A0",
  },
  footer: { borderTop: "1px solid #1A2030", paddingTop: 16, marginTop: 16 },
  main: { marginLeft: 240, minHeight: "100vh", background: "#080B0F" },
};

export default function AdminLayout({ children }) {
  const { logout, admin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ display: "flex" }}>
      <aside style={s.sidebar}>
        <div style={s.logo}>
          RJ<span style={s.accent}>.</span> Admin
        </div>
        <nav style={s.nav}>
          {NAV.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              style={({ isActive }) => ({
                ...s.link,
                ...(isActive ? s.activeLink : {}),
              })}
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div style={s.footer}>
          <a
            href="https://rajjaiswaldev.in/" //{process.env.REACT_APP_API_URL || "http://localhost:3000"}
            target="_blank"
            rel="noreferrer"
            style={{ ...s.link, fontSize: 12 }}
          >
            <ExternalLink size={14} /> View Portfolio
          </a>
          <button
            onClick={handleLogout}
            style={{
              ...s.link,
              background: "none",
              border: "none",
              cursor: "pointer",
              width: "100%",
              color: "#8892A4",
            }}
          >
            <LogOut size={14} /> Logout
          </button>
          <div style={{ paddingLeft: 12, marginTop: 12 }}>
            <p style={{ color: "#4A5568", fontSize: 11 }}>Logged in as</p>
            <p style={{ color: "#8892A4", fontSize: 12 }}>{admin?.email}</p>
          </div>
        </div>
      </aside>
      <main style={s.main}>
        <div style={{ padding: "32px 32px" }}>{children}</div>
      </main>
    </div>
  );
}
