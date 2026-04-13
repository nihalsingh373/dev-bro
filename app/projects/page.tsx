"use client";
import { useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { PROJECTS } from "../lib/projects";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
};

export default function ProjectsPage() {
  useEffect(() => {
    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto";
    return () => {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    };
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--bg, #0a0a0a)",
        padding: "120px 60px 80px",
        position: "relative",
        overflow: "visible", // ← was "hidden", this was blocking scroll
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "fixed",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,109,250,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Back button */}
      <div
        style={{
          position: "fixed",
          top: "28px",
          left: "48px",
          zIndex: 200,
        }}
      >
        <button
          data-cursor="hover"
          onClick={() => window.history.back()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "transparent",
            border: "1px solid rgba(240,235,224,0.12)",
            borderRadius: "3px",
            padding: "8px 16px",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(240,235,224,0.4)",
            transition: "color 0.2s, border-color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--paper, #f0ebe0)";
            e.currentTarget.style.borderColor = "rgba(240,235,224,0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(240,235,224,0.4)";
            e.currentTarget.style.borderColor = "rgba(240,235,224,0.12)";
          }}
        >
          ← Back
        </button>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* ── HEADER ── */}
        <motion.div
          variants={fadeUp}
          style={{ textAlign: "center", marginBottom: "72px" }}
        >
          <p
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--accent, #7c6dfa)",
              marginBottom: "14px",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            ◆ Selected Work
          </p>

          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.06,
              color: "var(--paper, #f0ebe0)",
              marginBottom: "16px",
            }}
          >
            Projects that{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #7c6dfa, #c084fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              moved the needle.
            </span>
          </h1>

          <p
            style={{
              fontSize: "0.88rem",
              fontWeight: 300,
              color: "var(--paper-dim, rgba(240,235,224,0.45))",
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1.8,
              maxWidth: "420px",
              margin: "0 auto",
            }}
          >
            Real products, shipped to production. Here is what we built and what
            it does.
          </p>
        </motion.div>

        {/* ── GRID ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              variants={card}
              data-cursor="hover"
              style={{
                border: "1px solid rgba(240,235,224,0.07)",
                borderRadius: "4px",
                overflow: "hidden",
                background: "rgba(240,235,224,0.025)",
                transition:
                  "border-color 0.3s, transform 0.4s cubic-bezier(0.2,1,0.2,1)",
                cursor: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.borderColor = "rgba(124,109,250,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(240,235,224,0.07)";
              }}
            >
              {/* IMAGE */}
              <div
                style={{
                  position: "relative",
                  height: "200px",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.6s cubic-bezier(0.2,1,0.2,1)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform =
                      "scale(1.04)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform =
                      "scale(1)";
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to bottom, transparent 50%, rgba(10,10,10,0.7) 100%)",
                    pointerEvents: "none",
                  }}
                />
              </div>

              {/* CONTENT */}
              <div style={{ padding: "24px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "12px",
                    marginBottom: "14px",
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "1.15rem",
                      fontWeight: 800,
                      letterSpacing: "-0.02em",
                      color: "var(--paper, #f0ebe0)",
                      margin: 0,
                    }}
                  >
                    {project.title}
                  </h2>
                  <span
                    style={{
                      fontSize: "0.58rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--accent, #7c6dfa)",
                      border: "1px solid rgba(124,109,250,0.3)",
                      padding: "3px 8px",
                      borderRadius: "2px",
                      whiteSpace: "nowrap",
                      fontFamily: "'Inter', sans-serif",
                      flexShrink: 0,
                    }}
                  >
                    Case Study
                  </span>
                </div>

                <div
                  style={{
                    height: "1px",
                    background: "rgba(240,235,224,0.07)",
                    marginBottom: "14px",
                  }}
                />

                <ul
                  style={{
                    padding: 0,
                    margin: 0,
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "7px",
                  }}
                >
                  {project.description.map((line, idx) => (
                    <li
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                        fontSize: "0.82rem",
                        fontWeight: 300,
                        color: "var(--paper-dim, rgba(240,235,224,0.45))",
                        fontFamily: "'Inter', sans-serif",
                        lineHeight: 1.65,
                      }}
                    >
                      <span
                        style={{
                          color: "var(--accent, #7c6dfa)",
                          fontSize: "0.6rem",
                          marginTop: "5px",
                          flexShrink: 0,
                        }}
                      >
                        ◆
                      </span>
                      {line}
                    </li>
                  ))}
                </ul>

                <div
                  style={{
                    marginTop: "20px",
                    paddingTop: "16px",
                    borderTop: "1px solid rgba(240,235,224,0.07)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.62rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(240,235,224,0.2)",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    DevBros Studio
                  </span>
                  <button
                    data-cursor="hover"
                    style={{
                      fontSize: "0.65rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--paper-dim, rgba(240,235,224,0.45))",
                      background: "transparent",
                      border: "none",
                      fontFamily: "'Inter', sans-serif",
                      transition: "color 0.2s",
                      padding: 0,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--paper, #f0ebe0)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color =
                        "var(--paper-dim, rgba(240,235,224,0.45))";
                    }}
                  >
                    View Project →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── BOTTOM CTA ── */}
        <motion.div
          variants={fadeUp}
          style={{ textAlign: "center", marginTop: "80px" }}
        >
          <p
            style={{
              fontSize: "0.82rem",
              fontWeight: 300,
              color: "var(--paper-dim, rgba(240,235,224,0.35))",
              fontFamily: "'Inter', sans-serif",
              marginBottom: "20px",
            }}
          >
            Want to be on this list?
          </p>
          <button
            data-cursor="hover"
            style={{
              background: "var(--accent, #7c6dfa)",
              color: "#fff",
              padding: "12px 28px",
              borderRadius: "3px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.73rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              border: "none",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.82";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          >
            Start a Project
          </button>
        </motion.div>
      </motion.div>
    </main>
  );
}
