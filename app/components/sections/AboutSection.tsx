"use client";
import { motion, AnimatePresence, type Variants } from "framer-motion";

interface AboutProps {
  visible: boolean;
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.35 } },
};

const PILLARS = [
  {
    icon: "◈",
    title: "You talk to the builders",
    desc: "No account managers. No junior handoffs. Mohit or Nihal responds — always.",
    accent: "#7c6dfa",
  },
  {
    icon: "◎",
    title: "Outcomes, not outputs",
    desc: "More enquiries, bookings, revenue. We build around conversion — not page count.",
    accent: "#c084fc",
  },
  {
    icon: "⬡",
    title: "Fast without cutting corners",
    desc: "Next.js, Vercel, Shopify. Live preview at every stage. Weeks, not months.",
    accent: "#7c6dfa",
  },
  {
    icon: "◇",
    title: "Fixed price. No surprises.",
    desc: "Clear scope, simple contract. 50% upfront, 50% on launch. Always.",
    accent: "#c084fc",
  },
];

export default function AboutSection({ visible }: AboutProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="about"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            overflow: "hidden",
            padding: "88px 48px 40px",
          }}
        >
          {/* Ghost BG text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1.4, delay: 0.5 } }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            style={{
              position: "absolute",
              fontFamily: "'Syne',sans-serif",
              fontSize: "clamp(5rem,14vw,11rem)",
              fontWeight: 800,
              color: "transparent",
              WebkitTextStroke: "1px rgba(240,235,224,0.025)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              letterSpacing: "-0.03em",
              userSelect: "none",
            }}
          >
            DEVBROS
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
            style={{
              maxWidth: "1080px",
              width: "100%",
              position: "relative",
              zIndex: 1,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "64px",
              alignItems: "center",
            }}
          >
            {/* ── LEFT — story + CTA ── */}
            <div>
              <motion.p
                variants={item}
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "var(--paper-muted)",
                  marginBottom: "20px",
                  fontFamily: "'Inter',sans-serif",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span style={{ display: "block", width: "28px", height: "1px", background: "rgba(124,109,250,0.5)" }} />
                02 — Why DevBros
              </motion.p>

              <motion.h2
                variants={item}
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.7rem,3vw,2.6rem)",
                  color: "var(--paper)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  marginBottom: "22px",
                }}
              >
                We got tired of watching{" "}
                <span style={{
                  background: "linear-gradient(90deg,#7c6dfa,#c084fc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  great businesses lose customers
                </span>
                {" "}to bad websites.
              </motion.h2>

              {/* 5-line story */}
              <motion.p
                variants={item}
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 300,
                  color: "var(--paper-dim)",
                  lineHeight: 1.95,
                  marginBottom: "10px",
                  fontFamily: "'Inter',sans-serif",
                }}
              >
                We are Mohit and Nihal — two developers who built a production rental marketplace, handled 800+ concurrent users with zero errors, and helped a client land a Porsche-affiliated studio deal.
              </motion.p>
              <motion.p
                variants={item}
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 300,
                  color: "var(--paper-dim)",
                  lineHeight: 1.95,
                  marginBottom: "10px",
                  fontFamily: "'Inter',sans-serif",
                }}
              >
                DevBros is not an agency that takes your brief, disappears for a month, and hands you a template. We are a focused two-person studio that treats every project like our own business is on the line — because our reputation is.
              </motion.p>
              <motion.p
                variants={item}
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 300,
                  color: "var(--paper-dim)",
                  lineHeight: 1.95,
                  marginBottom: "10px",
                  fontFamily: "'Inter',sans-serif",
                }}
              >
                Together we cover design, development, deployment, and results. End to end. No handoffs. No miscommunications. Just two people who are both accountable for everything we ship.
              </motion.p>
              <motion.p
                variants={item}
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 300,
                  color: "var(--paper-dim)",
                  lineHeight: 1.95,
                  marginBottom: "10px",
                  fontFamily: "'Inter',sans-serif",
                }}
              >
                Every project includes a live preview at every stage, 30 days of free fixes after launch, and fixed pricing with no surprises — 50% upfront, 50% on launch.
              </motion.p>
              <motion.p
                variants={item}
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 300,
                  color: "rgba(240,235,224,0.7)",
                  lineHeight: 1.95,
                  marginBottom: "28px",
                  fontFamily: "'Inter',sans-serif",
                  fontStyle: "italic",
                }}
              >
                "Your website is working for you — or against you — right now. We make sure it is doing the first one."
              </motion.p>

              {/* CTA */}
              <motion.div variants={item} style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <a
                  href="https://cal.com/nihal-rajput-9ibwly/secret"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "var(--accent)",
                    color: "#fff",
                    padding: "12px 26px",
                    borderRadius: "3px",
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.82")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Book a free call
                  <span style={{ fontSize: "0.8rem" }}>↗</span>
                </a>
                <span style={{
                  fontSize: "0.65rem",
                  color: "var(--paper-muted)",
                  fontFamily: "'Inter',sans-serif",
                  fontWeight: 300,
                }}>
                  30 min · No obligation
                </span>
              </motion.div>
            </div>

            {/* ── RIGHT — 4 pillar cards ── */}
            <motion.div
              variants={item}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1px",
                background: "rgba(240,235,224,0.06)",
                border: "1px solid rgba(240,235,224,0.06)",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              {PILLARS.map((p, i) => (
                <div
                  key={p.title}
                  style={{
                    padding: "24px 20px",
                    background: "#0a0a0a",
                    position: "relative",
                    overflow: "hidden",
                    transition: "background 0.3s",
                    borderBottom: i < 2 ? "1px solid rgba(240,235,224,0.06)" : "none",
                    borderRight: i % 2 === 0 ? "1px solid rgba(240,235,224,0.06)" : "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(124,109,250,0.05)";
                    const line = e.currentTarget.querySelector(".pline") as HTMLElement;
                    if (line) line.style.transform = "scaleX(1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "#0a0a0a";
                    const line = e.currentTarget.querySelector(".pline") as HTMLElement;
                    if (line) line.style.transform = "scaleX(0)";
                  }}
                >
                  <div className="pline" style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                    background: p.accent,
                    transform: "scaleX(0)", transformOrigin: "left",
                    transition: "transform 0.4s cubic-bezier(0.2,1,0.2,1)",
                  }} />
                  <span style={{ fontSize: "1.15rem", display: "block", marginBottom: "10px", color: p.accent }}>
                    {p.icon}
                  </span>
                  <div style={{
                    fontFamily: "'Syne',sans-serif", fontWeight: 700,
                    fontSize: "0.82rem", color: "var(--paper)",
                    marginBottom: "8px", lineHeight: 1.3,
                  }}>
                    {p.title}
                  </div>
                  <p style={{
                    fontSize: "0.72rem", fontWeight: 300,
                    color: "rgba(240,235,224,0.36)",
                    lineHeight: 1.75, fontFamily: "'Inter',sans-serif",
                  }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
