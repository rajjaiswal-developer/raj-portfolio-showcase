import React, { useEffect, useState } from "react";
import { MessageSquare, MailOpen, Mail } from "lucide-react";
import { API } from "../App";
import toast from "react-hot-toast";

const card = {
  background: "#0F1318",
  border: "1px solid #1A2030",
  borderRadius: 12,
  padding: 24,
};

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const load = () =>
    API.get("/contact")
      .then((r) => setMessages(r.messages))
      .catch(() => {})
      .finally(() => setLoading(false));
  useEffect(() => {
    load();
  }, []);

  const markRead = async (id) => {
    try {
      await API.patch(`/contact/${id}/read`);
      load();
    } catch {}
  };

  const open = (msg) => {
    setSelected(msg);
    if (!msg.isRead) markRead(msg._id);
  };

  const unread = messages.filter((m) => !m.isRead).length;

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 28,
            fontWeight: 800,
            color: "#E2E8F0",
          }}
        >
          Messages
        </h1>
        <p style={{ color: "#8892A4", fontSize: 14, marginTop: 4 }}>
          {messages.length} total ·{" "}
          <span style={{ color: "#FBB724" }}>{unread} unread</span>
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: selected ? "1fr 1fr" : "1fr",
          gap: 16,
        }}
      >
        {/* List */}
        <div style={card}>
          {loading ? (
            <p style={{ color: "#8892A4", textAlign: "center", padding: 40 }}>
              Loading...
            </p>
          ) : messages.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "48px 0",
                color: "#8892A4",
              }}
            >
              <MessageSquare
                size={40}
                style={{ margin: "0 auto 12px", opacity: 0.3 }}
              />
              <p>No messages yet</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  onClick={() => open(msg)}
                  style={{
                    padding: "14px 12px",
                    borderRadius: 8,
                    cursor: "pointer",
                    background:
                      selected?._id === msg._id
                        ? "rgba(0,245,160,0.05)"
                        : "transparent",
                    border:
                      selected?._id === msg._id
                        ? "1px solid rgba(0,245,160,0.2)"
                        : "1px solid transparent",
                    transition: "all 0.15s",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 4,
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      {!msg.isRead ? (
                        <Mail size={14} color="#FBB724" />
                      ) : (
                        <MailOpen size={14} color="#4A5568" />
                      )}
                      <span
                        style={{
                          color: msg.isRead ? "#8892A4" : "#E2E8F0",
                          fontWeight: msg.isRead ? 400 : 600,
                          fontSize: 14,
                        }}
                      >
                        {msg.name}
                      </span>
                    </div>
                    <span style={{ color: "#4A5568", fontSize: 11 }}>
                      {new Date(msg.createdAt).toLocaleDateString("en-IN")}
                    </span>
                  </div>
                  <p style={{ color: "#8892A4", fontSize: 12, marginLeft: 22 }}>
                    {msg.email}
                  </p>
                  {msg.subject && (
                    <p
                      style={{
                        color: "#8892A4",
                        fontSize: 12,
                        marginLeft: 22,
                        marginTop: 2,
                        fontStyle: "italic",
                      }}
                    >
                      {msg.subject}
                    </p>
                  )}
                  <p
                    style={{
                      color: "#8892A4",
                      fontSize: 12,
                      marginLeft: 22,
                      marginTop: 4,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detail */}
        {selected && (
          <div style={card}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <div>
                <h3
                  style={{
                    color: "#E2E8F0",
                    fontWeight: 700,
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 18,
                  }}
                >
                  {selected.name}
                </h3>
                <a
                  href={`mailto:${selected.email}`}
                  style={{
                    color: "#00F5A0",
                    fontSize: 13,
                    textDecoration: "none",
                  }}
                >
                  {selected.email}
                </a>
              </div>
              <button
                onClick={() => setSelected(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#8892A4",
                  cursor: "pointer",
                  fontSize: 18,
                }}
              >
                ×
              </button>
            </div>
            {selected.subject && (
              <div
                style={{
                  background: "#080B0F",
                  borderRadius: 6,
                  padding: "8px 12px",
                  marginBottom: 16,
                }}
              >
                <p style={{ color: "#8892A4", fontSize: 11, marginBottom: 2 }}>
                  SUBJECT
                </p>
                <p style={{ color: "#E2E8F0", fontSize: 14 }}>
                  {selected.subject}
                </p>
              </div>
            )}
            <div
              style={{
                background: "#080B0F",
                borderRadius: 8,
                padding: 16,
                marginBottom: 16,
              }}
            >
              <p
                style={{
                  color: "#E2E8F0",
                  fontSize: 14,
                  lineHeight: 1.8,
                  whiteSpace: "pre-wrap",
                }}
              >
                {selected.message}
              </p>
            </div>
            <p style={{ color: "#4A5568", fontSize: 12 }}>
              Received: {new Date(selected.createdAt).toLocaleString("en-IN")}
            </p>
            <a
              href={`mailto:${selected.email}?subject=Re: ${selected.subject || "Your Message"}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginTop: 16,
                background: "#00F5A0",
                color: "#080B0F",
                borderRadius: 8,
                padding: "10px 18px",
                fontWeight: 700,
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              <Mail size={15} /> Reply via Email
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
