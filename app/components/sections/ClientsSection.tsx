"use client";
import { useEffect, useRef } from "react";

interface ClientsProps {
  visible: boolean;
}

// ── Your 4 real clients ──
const CLIENTS = [
  {
    id: "umero",
    name: "Umero",
    label: "Rental Marketplace · Built by us",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-5 14H10V7h4v10z"/>
      </svg>
    ),
  },
  {
    id: "cohabit",
    name: "Cohabit",
    label: "College-funded Innovation · Web platform",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
      </svg>
    ),
  },
  {
    id: "client3",
    name: "Client Three",
    label: "Web Design · Delivered 2025",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
  },
  {
    id: "client4",
    name: "Client Four",
    label: "Web Design · Delivered 2025",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
      </svg>
    ),
  },
];

// Triple for a seamless loop with 4 items
const TICKER_ITEMS = [...CLIENTS, ...CLIENTS, ...CLIENTS];

const STATS = [
  { num: "4", label: "Products shipped" },
  { num: "800+", label: "Concurrent users" },
  { num: "0%", label: "Error rate" },
  { num: "5★", label: "Satisfaction" },
];

export default function ClientsSection({ visible }: ClientsProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.opacity = visible ? "1" : "0";
    ref.current.style.transform = visible ? "translateY(0)" : "translateY(28px)";
    ref.current.style.pointerEvents = visible ? "auto" : "none";
  }, [visible]);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 0",
        opacity: 0,
        pointerEvents: "none",
        transition: "opacity 0.7s cubic-bezier(0.2,1,0.2,1), transform 0.7s cubic-bezier(0.2,1,0.2,1)",
        zIndex: 10,
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "52px", padding: "0 48px" }}>
        <p style={{
          fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase",
          color: "var(--paper-muted)", marginBottom: "14px", fontFamily: "'Inter', sans-serif",
        }}>
          04 — Trusted by
        </p>
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
          fontWeight: 800, color: "#fff",
          lineHeight: 1.06, letterSpacing: "-0.02em", marginBottom: "12px",
        }}>
          Businesses that chose{" "}
          <span style={{ color: "rgba(255,255,255,0.18)" }}>to grow.</span>
        </h2>
        <p style={{
          fontSize: "0.82rem", fontWeight: 300, color: "var(--paper-dim)",
          fontFamily: "'Inter', sans-serif", maxWidth: "380px", margin: "0 auto", lineHeight: 1.7,
        }}>
          From funded startups to premium-sector clients — real work, real results.
        </p>
      </div>

      {/* Ticker wrapper */}
      <div style={{ width: "100%", position: "relative", overflow: "hidden" }}>

        {/* Fade edges */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: "140px",
          background: "linear-gradient(to right, #0a0a0a 40%, transparent)",
          zIndex: 2, pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: "140px",
          background: "linear-gradient(to left, #0a0a0a 40%, transparent)",
          zIndex: 2, pointerEvents: "none",
        }} />

        {/* Row 1 — slides left */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          marginBottom: "1px", overflow: "hidden",
        }}>
          <div style={{
            display: "flex", width: "max-content",
            animation: "smoothLeft 18s linear infinite",
            willChange: "transform",
          }}>
            {TICKER_ITEMS.map((client, i) => (
              <div
                key={`a-${i}`}
                style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "22px 48px",
                  borderRight: "1px solid rgba(255,255,255,0.06)",
                  whiteSpace: "nowrap",
                  color: "rgba(255,255,255,0.22)",
                  transition: "color 0.25s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.22)"; }}
              >
                <span style={{ flexShrink: 0, display: "flex" }}>{client.icon}</span>
                <div>
                  <div style={{
                    fontFamily: "'Syne', sans-serif", fontWeight: 700,
                    fontSize: "0.9rem", letterSpacing: "0.03em",
                  }}>
                    {client.name}
                  </div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif", fontWeight: 300,
                    fontSize: "0.6rem", letterSpacing: "0.08em",
                    color: "rgba(255,255,255,0.2)", marginTop: "1px",
                  }}>
                    {client.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — slides right, reversed */}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
          <div style={{
            display: "flex", width: "max-content",
            animation: "smoothRight 24s linear infinite",
            willChange: "transform",
          }}>
            {[...TICKER_ITEMS].reverse().map((client, i) => (
              <div
                key={`b-${i}`}
                style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "18px 48px",
                  borderRight: "1px solid rgba(255,255,255,0.06)",
                  whiteSpace: "nowrap",
                  color: "rgba(255,255,255,0.12)",
                  transition: "color 0.25s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.12)"; }}
              >
                <span style={{ flexShrink: 0, display: "flex", opacity: 0.7 }}>{client.icon}</span>
                <span style={{
                  fontFamily: "'Inter', sans-serif", fontWeight: 400,
                  fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase",
                }}>
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(4,1fr)",
        marginTop: "52px", width: "fit-content", margin: "52px auto 0",
        border: "1px solid rgba(255,255,255,0.06)",
      }}>
        {STATS.map((stat, i) => (
          <div key={stat.label} style={{
            padding: "20px 40px", textAlign: "center",
            borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
          }}>
            <div style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: "1.5rem", color: "#fff",
              letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "6px",
            }}>
              {stat.num}
            </div>
            <div style={{
              fontSize: "0.56rem", letterSpacing: "0.2em", textTransform: "uppercase",
              color: "var(--paper-muted)", fontFamily: "'Inter', sans-serif",
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Butter-smooth keyframes — cubic-bezier eased, no jitter */}
      <style>{`
        @keyframes smoothLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes smoothRight {
          0%   { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
