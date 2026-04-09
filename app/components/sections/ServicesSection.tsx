"use client";
import { useEffect, useRef } from "react";
import { SERVICES } from "@/app/lib/stack";

interface ServicesProps {
  visible: boolean;
}

export default function ServicesSection({ visible }: ServicesProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.opacity = visible ? "1" : "0";
    ref.current.style.transform = visible
      ? "translateY(0)"
      : "translateY(28px)";
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
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <p
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "off-white",
              marginBottom: "14px",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            03 — What we do
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
            Services that{" "}
            <span style={{ color: "rgba(255,255,255,0.2)" }}>
              move the needle.
            </span>
          </h2>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1px",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {SERVICES.map((svc, i) => (
            <div
              key={svc.id}
              data-cursor="hover"
              style={{
                padding: "24px 20px",
                borderRight: "1px solid rgba(255,255,255,0.06)",
                position: "relative",
                overflow: "hidden",
                transition: "background 0.3s",
                animationDelay: `${i * 0.05}s`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(124,109,250,0.055)";
                const line = el.querySelector(".svc-line") as HTMLElement;
                if (line) line.style.transform = "scaleX(1)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "transparent";
                const line = el.querySelector(".svc-line") as HTMLElement;
                if (line) line.style.transform = "scaleX(0)";
              }}
            >
              {/* Top accent line */}
              <div
                className="svc-line"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "1px",
                  background: "#7c6dfa",
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.4s cubic-bezier(0.2,1,0.2,1)",
                }}
              />

              <span
                style={{
                  fontSize: "1.3rem",
                  marginBottom: "12px",
                  display: "block",
                }}
              >
                {svc.icon}
              </span>
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  color: "#fff",
                  marginBottom: "8px",
                }}
              >
                {svc.name}
              </div>
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.38)",
                  lineHeight: 1.75,
                  marginBottom: "14px",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {svc.desc}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                {svc.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "0.58rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#7c6dfa",
                      border: "1px solid rgba(124,109,250,0.25)",
                      padding: "2px 7px",
                      borderRadius: "1px",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
