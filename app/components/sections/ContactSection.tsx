"use client";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { TEAM } from "@/app/lib/stack";

interface ContactProps {
  visible: boolean;
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
  exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.35 } },
};
const cardV: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 16 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.55 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
};

const CAL_URL = "https://cal.com/nihal-rajput-9ibwly/secret";

export default function ContactSection({ visible }: ContactProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="contact"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px 48px",
            zIndex: 10,
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1.2, delay: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            style={{
              position: "absolute",
              fontFamily: "'Syne',sans-serif",
              fontSize: "clamp(4rem,13vw,10rem)",
              fontWeight: 800,
              color: "transparent",
              WebkitTextStroke: "1px rgba(240,235,224,0.03)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              letterSpacing: "-0.03em",
              userSelect: "none",
            }}
          >
            LET'S BUILD
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
            style={{
              maxWidth: "580px",
              width: "100%",
              textAlign: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <motion.p
              variants={item}
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--paper-muted)",
                marginBottom: "18px",
                fontFamily: "'Inter',sans-serif",
              }}
            >
              06 — Get in touch
            </motion.p>

            <motion.h2
              variants={item}
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: "clamp(2rem,4.5vw,3.2rem)",
                fontWeight: 800,
                color: "var(--paper)",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                marginBottom: "14px",
              }}
            >
              Ready to build
              <br />
              something real?
            </motion.h2>

            <motion.p
              variants={item}
              style={{
                fontSize: "0.85rem",
                fontWeight: 300,
                color: "var(--paper-dim)",
                lineHeight: 1.85,
                marginBottom: "28px",
                fontFamily: "'Inter',sans-serif",
              }}
            >
              We're open to new projects. Based in India, working globally.
              <br />
              Usually reply within 24 hours.
            </motion.p>

            <motion.a
              variants={item}
              href="mailto:hello@devbros.studio"
              data-cursor="hover"
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: "clamp(1rem,2.8vw,1.5rem)",
                fontWeight: 700,
                color: "var(--paper)",
                textDecoration: "none",
                display: "block",
                marginBottom: "32px",
                letterSpacing: "-0.01em",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--paper)")}
            >
              hello@devbros.studio
            </motion.a>

            <motion.div
              variants={container}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                marginBottom: "28px",
              }}
            >
              {TEAM.map((member) => (
                <motion.div
                  key={member.id}
                  variants={cardV}
                  style={{
                    background: "rgba(240,235,224,0.03)",
                    border: "1px solid rgba(240,235,224,0.08)",
                    borderRadius: "4px",
                    padding: "16px",
                    textAlign: "left",
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(124,109,250,0.3)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(240,235,224,0.08)")}
                >
                  <div style={{
                    fontFamily: "'Syne',sans-serif",
                    fontWeight: 700, fontSize: "0.88rem",
                    color: "var(--paper)", marginBottom: "4px",
                  }}>
                    {member.name}
                  </div>
                  <div style={{
                    fontSize: "0.62rem", letterSpacing: "0.1em",
                    textTransform: "uppercase", color: "var(--accent)",
                    marginBottom: "12px", fontFamily: "'Inter',sans-serif",
                  }}>
                    {member.role}
                  </div>
                  <a
                    href={`mailto:${member.email}`}
                    style={{
                      fontSize: "0.72rem", color: "var(--paper-muted)",
                      textDecoration: "none", display: "block",
                      marginBottom: "8px", fontFamily: "'Inter',sans-serif",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--paper)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--paper-muted)")}
                  >
                    ✉ {member.email}
                  </a>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    {Object.entries(member.socials).map(([p, url]) => (
                      <a
                        key={p} href={url} target="_blank" rel="noopener"
                        data-cursor="hover"
                        style={{
                          fontSize: "0.6rem", letterSpacing: "0.12em",
                          textTransform: "uppercase", color: "var(--paper-muted)",
                          textDecoration: "none", transition: "color 0.2s",
                          fontFamily: "'Inter',sans-serif",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--paper)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--paper-muted)")}
                      >
                        {p}
                      </a>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Start a Project → cal.com */}
            <motion.a
              variants={item}
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              style={{
                display: "inline-block",
                background: "var(--accent)",
                color: "#fff",
                padding: "13px 32px",
                borderRadius: "3px",
                fontFamily: "'Inter',sans-serif",
                fontSize: "0.73rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                border: "none",
                marginBottom: "28px",
                transition: "opacity 0.2s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.82")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Start a Project ↗
            </motion.a>

            <motion.div
              variants={item}
              style={{
                borderTop: "1px solid rgba(240,235,224,0.07)",
                paddingTop: "18px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 800, fontSize: "0.82rem",
                color: "rgba(240,235,224,0.2)", letterSpacing: "0.2em",
              }}>
                DEVBROS.
              </span>
              <span style={{
                fontSize: "0.68rem",
                color: "rgba(240,235,224,0.18)",
                fontFamily: "'Inter',sans-serif",
              }}>
                © 2026 — All rights reserved
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
