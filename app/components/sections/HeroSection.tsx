"use client";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { type SectionId } from "@/app/hooks/useScroll";

interface HeroProps {
  visible: boolean;
  goTo: (id: SectionId) => void;
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  exit: { opacity: 0, y: -14, transition: { duration: 0.4 } },
};

const CAL_URL = "https://cal.com/nihal-rajput-9ibwly/secret";

export default function HeroSection({ visible, goTo }: HeroProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="hero"
          variants={container}
          initial="hidden"
          animate="show"
          exit="exit"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: "9vh",
            zIndex: 10,
            textAlign: "center",
          }}
        >
          <motion.p
            variants={item}
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--paper-muted)",
              marginBottom: "12px",
              fontFamily: "'Inter',sans-serif",
            }}
          >
            ◆ Digital Studio — Est. 2025
          </motion.p>

          <motion.h1
            variants={item}
            style={{
              fontFamily: "'Syne',sans-serif",
              fontSize: "clamp(2.2rem,4.5vw,3.6rem)",
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              color: "var(--paper)",
              marginBottom: "14px",
              maxWidth: "700px",
            }}
          >
            Built to convert.{" "}
            <span
              style={{
                background: "linear-gradient(90deg,#7c6dfa,#c084fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Designed to last.
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            style={{
              fontSize: "0.88rem",
              fontWeight: 300,
              lineHeight: 1.85,
              color: "var(--paper-dim)",
              maxWidth: "420px",
              marginBottom: "28px",
              fontFamily: "'Inter',sans-serif",
            }}
          >
            A two-person studio crafting high-performance web experiences,
            Shopify storefronts and brand identities for founders who refuse to
            blend in.
          </motion.p>

          <motion.div variants={item} style={{ display: "flex", gap: "12px" }}>
            {/* See Our Work — scrolls to portfolio section */}
            <button
              data-cursor="hover"
              onClick={() => goTo("clients")}
              style={{
                background: "var(--accent)",
                color: "#fff",
                padding: "12px 28px",
                borderRadius: "3px",
                fontFamily: "'Inter',sans-serif",
                fontSize: "0.73rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                border: "none",
                transition: "opacity 0.2s",
                cursor: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.82")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              See Our Work
            </button>

            {/* Let's Talk — opens cal.com */}
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "transparent",
                color: "var(--paper-dim)",
                padding: "12px 28px",
                borderRadius: "3px",
                fontFamily: "'Inter',sans-serif",
                fontSize: "0.73rem",
                fontWeight: 400,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                border: "1px solid rgba(240,235,224,0.15)",
                transition: "border-color 0.2s,color 0.2s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(240,235,224,0.4)";
                e.currentTarget.style.color = "var(--paper)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(240,235,224,0.15)";
                e.currentTarget.style.color = "var(--paper-dim)";
              }}
            >
              Let's Talk
            </a>
          </motion.div>

          <motion.div variants={item} style={{ marginTop: "32px" }}>
            <p
              style={{
                fontSize: "0.57rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--paper-muted)",
                marginBottom: "8px",
                fontFamily: "'Inter',sans-serif",
              }}
            >
              scroll to explore
            </p>
            <div
              style={{
                width: "1px",
                height: "32px",
                background: "linear-gradient(to bottom,rgba(240,235,224,0.3),transparent)",
                margin: "0 auto",
                animation: "scrollPulse 2s ease-in-out infinite",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
