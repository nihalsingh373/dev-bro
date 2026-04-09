"use client";
import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let tx = mx,
      ty = my;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${mx - 60}px, ${my - 60}px)`;
      }
    };

    const loop = () => {
      tx += (mx - tx) * 0.1;
      ty += (my - ty) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${tx - 18}px, ${ty - 18}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    const onEnter = () => setIsHovering(true);
    const onLeave = () => setIsHovering(false);
    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    const interactables = document.querySelectorAll(
      'a, button, [data-cursor="hover"]',
    );
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // MutationObserver to catch dynamically added elements
    const observer = new MutationObserver(() => {
      const els = document.querySelectorAll('a, button, [data-cursor="hover"]');
      els.forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: isClicking ? "8px" : isHovering ? "30px" : "30px",
          height: isClicking ? "8px" : isHovering ? "30px" : "30px",
          background: "var(--paper)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          mixBlendMode: "difference",
          transition: "width 0.2s, height 0.2s",
          willChange: "transform",
        }}
      />
      {/* Trail ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: isHovering ? "52px" : "36px",
          height: isHovering ? "52px" : "36px",
          border: `1px solid ${isHovering ? "rgba(124,109,250,0.6)" : "rgba(255,255,255,0.22)"}`,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99998,
          transition: "width 0.3s, height 0.3s, border-color 0.3s",
          willChange: "transform",
        }}
      />
      {/* Glow */}
      <div
        ref={glowRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,109,250,0.07), transparent 70%)",
          pointerEvents: "none",
          zIndex: 99997,
          willChange: "transform",
        }}
      />
    </>
  );
}
