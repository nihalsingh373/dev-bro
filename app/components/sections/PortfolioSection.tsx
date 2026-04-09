"use client";
import { useEffect, useRef } from "react";

interface PortfolioProps {
  visible: boolean;
}

const PROJECTS = [
  {
    id: "umero",
    number: "01",
    name: "Umero",
    type: "Rental Marketplace · Live Product",
    desc: "A production-grade rental marketplace built end-to-end. Served real businesses in India's premium sector — including clients in the luxury automotive space.",
    stats: ["15+ REST APIs", "800 concurrent users", "0% error rate"],
    tags: ["React", "Node.js", "MongoDB", "Redis", "Docker", "AWS"],
    url: "https://umero.in",
    // Replace with your actual screenshot:
    // import img from '/public/projects/umero.png'  then use img.src
    // For now uses a placeholder — swap imgSrc with your screenshot path
    imgSrc: "/projects/umero.png",
  },
  {
    id: "funded",
    number: "02",
    name: "College-Funded Project",
    type: "Web App · Institutionally Funded",
    desc: "Selected and funded by a college innovation committee. The technical quality and execution is what convinced the selection panel to back it.",
    stats: ["Institutional funding", "Innovation programme", "Full-stack build"],
    tags: ["React", "Next.js", "TypeScript", "Node.js"],
    url: "#",
    imgSrc: "/projects/funded.png",
  },
  {
    id: "concept",
    number: "03",
    name: "Concept — [Your Niche]",
    type: "Concept Project · [Industry]",
    desc: "A fully designed and developed concept site built to demonstrate what we'd create for a premium business in this space. Every detail production-ready.",
    stats: ["Mobile-first", "Sub 2s load time", "SEO optimised"],
    tags: ["Next.js", "Tailwind", "Framer Motion", "TypeScript"],
    url: "#",
    imgSrc: "/projects/concept.png",
  },
];

export default function PortfolioSection({ visible }: PortfolioProps) {
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
      <div style={{ maxWidth: "960px", width: "100%" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
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
            03 — Our work
          </p>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              marginBottom: "10px",
            }}
          >
            We don't do mockups.{" "}
            <span style={{ color: "rgba(255,255,255,0.2)" }}>
              We ship real products.
            </span>
          </h2>
          <p
            style={{
              fontSize: "0.82rem",
              fontWeight: 300,
              color: "var(--paper-dim)",
              fontFamily: "'Inter', sans-serif",
              maxWidth: "480px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Every project here is live, tested, and built by us — end to end.
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {PROJECTS.map((project, i) => (
            <div
              key={project.id}
              data-cursor="hover"
              style={{
                position: "relative",
                borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                overflow: "hidden",
                transition: "background 0.3s",
                display: "flex",
                flexDirection: "column",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(124,109,250,0.04)";
                const line = el.querySelector(".proj-line") as HTMLElement;
                const img = el.querySelector(".proj-img") as HTMLElement;
                if (line) line.style.transform = "scaleX(1)";
                if (img) img.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "transparent";
                const line = el.querySelector(".proj-line") as HTMLElement;
                const img = el.querySelector(".proj-img") as HTMLElement;
                if (line) line.style.transform = "scaleX(0)";
                if (img) img.style.transform = "scale(1)";
              }}
            >
              {/* Top accent line */}
              <div
                className="proj-line"
                style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  height: "1px",
                  background: "var(--accent)",
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.4s cubic-bezier(0.2,1,0.2,1)",
                  zIndex: 2,
                }}
              />

              {/* Screenshot area */}
              <div
                style={{
                  width: "100%",
                  aspectRatio: "16/9",
                  background: "rgba(255,255,255,0.03)",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {/* 
                  REPLACE THIS with a real <img> once you add your screenshots to /public/projects/
                  <img
                    className="proj-img"
                    src={project.imgSrc}
                    alt={project.name}
                    style={{
                      width: "100%", height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s cubic-bezier(0.2,1,0.2,1)",
                    }}
                  />
                */}
                {/* Placeholder shown until you add real screenshots */}
                <div
                  style={{
                    width: "100%", height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 800,
                      fontSize: "1.6rem",
                      color: "rgba(124,109,250,0.25)",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {project.number}
                  </span>
                  <span
                    style={{
                      fontSize: "0.55rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.12)",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Add screenshot to /public/projects/{project.id}.png
                  </span>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
                <p
                  style={{
                    fontSize: "0.55rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    marginBottom: "8px",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {project.type}
                </p>
                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "1.05rem",
                    color: "#fff",
                    letterSpacing: "-0.02em",
                    marginBottom: "10px",
                  }}
                >
                  {project.name}
                </h3>
                <p
                  style={{
                    fontSize: "0.73rem",
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.38)",
                    lineHeight: 1.75,
                    marginBottom: "14px",
                    fontFamily: "'Inter', sans-serif",
                    flex: 1,
                  }}
                >
                  {project.desc}
                </p>

                {/* Stats */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    marginBottom: "14px",
                    paddingBottom: "14px",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {project.stats.map((stat) => (
                    <div
                      key={stat}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "0.68rem",
                        color: "rgba(255,255,255,0.5)",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      <span style={{ color: "var(--accent)", fontSize: "0.5rem" }}>◆</span>
                      {stat}
                    </div>
                  ))}
                </div>

                {/* Tech tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "16px" }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "0.55rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#7c6dfa",
                        border: "1px solid rgba(124,109,250,0.2)",
                        padding: "2px 7px",
                        borderRadius: "1px",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Live link button */}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: project.url === "#" ? "rgba(255,255,255,0.2)" : "var(--paper)",
                    fontFamily: "'Inter', sans-serif",
                    textDecoration: "none",
                    border: "1px solid",
                    borderColor: project.url === "#" ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.15)",
                    padding: "8px 14px",
                    borderRadius: "2px",
                    transition: "border-color 0.2s, color 0.2s, background 0.2s",
                    pointerEvents: project.url === "#" ? "none" : "auto",
                  }}
                  onMouseEnter={(e) => {
                    if (project.url === "#") return;
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.color = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                    e.currentTarget.style.color = "var(--paper)";
                  }}
                >
                  {project.url === "#" ? "Coming soon" : "View live site"}
                  {project.url !== "#" && (
                    <span style={{ fontSize: "0.7rem" }}>↗</span>
                  )}
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
