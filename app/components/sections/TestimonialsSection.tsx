"use client";
import { useEffect, useRef } from "react";

interface TestimonialsProps {
  visible: boolean;
}

const TESTIMONIALS = [
  {
    id: "t1",
    quote:
      "The Umero platform handled our rental bookings seamlessly. The interface is clean, fast, and has been completely reliable since day one. Our customers love how smooth the experience is.",
    name: "— Replace with real name",
    role: "Business Owner",
    // ↑ Replace with the kiting business owner's actual name and role
    // e.g. "Founder, [Business Name]"
    accent: "var(--accent)",  // purple
  },
  {
    id: "t2",
    quote:
      "Our platform built by DevBros was selected for funding at our college innovation programme. The technical quality genuinely impressed the selection committee — the code is clean, well-structured and production-ready.",
    name: "— Replace with your friend's name",
    role: "Founder · College Innovation Programme",
    // ↑ Replace with friend's actual name + college name
    accent: "var(--accent2)", // pink-purple
  },
  {
    id: "t3",
    quote:
      "Working with DevBros was straightforward and professional. They understood exactly what was needed, delivered on time, and the work they produced is something I'm proud to put my name on.",
    name: "— Replace with 3rd person's name",
    role: "Replace with their role",
    // ↑ Replace with your 3rd real contact
    accent: "var(--accent)",
  },
];

export default function TestimonialsSection({ visible }: TestimonialsProps) {
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
        padding: "80px 48px",
        opacity: 0,
        pointerEvents: "none",
        transition:
          "opacity 0.7s cubic-bezier(0.2,1,0.2,1), transform 0.7s cubic-bezier(0.2,1,0.2,1)",
        zIndex: 10,
        overflowY: "auto",
      }}
    >
      <div style={{ maxWidth: "920px", width: "100%" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--paper-muted)",
              marginBottom: "14px",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            05 — Kind words
          </p>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
            }}
          >
            What clients{" "}
            <span style={{ color: "rgba(255,255,255,0.2)" }}>say.</span>
          </h2>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.id}
              style={{
                padding: "28px 24px",
                borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {/* Big quote mark */}
              <span
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "3rem",
                  fontWeight: 800,
                  color: t.accent,
                  opacity: 0.25,
                  lineHeight: 1,
                  display: "block",
                  marginBottom: "-10px",
                }}
              >
                "
              </span>

              {/* Quote text */}
              <p
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.85,
                  fontFamily: "'Inter', sans-serif",
                  flex: 1,
                  fontStyle: "italic",
                }}
              >
                {t.quote}
              </p>

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  background: "rgba(255,255,255,0.06)",
                }}
              />

              {/* Attribution */}
              <div>
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    color: "var(--paper)",
                    marginBottom: "4px",
                  }}
                >
                  {t.name}
                </div>
                <div
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: t.accent,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {t.role}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom trust line */}
        <div
          style={{
            textAlign: "center",
            marginTop: "32px",
          }}
        >
          <p
            style={{
              fontSize: "0.62rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--paper-muted)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Real clients · Real products · Based in India, working globally
          </p>
        </div>

      </div>
    </div>
  );
}
