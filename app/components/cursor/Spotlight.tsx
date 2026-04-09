"use client";
import { useEffect, useRef } from "react";

export default function Spotlight() {
  const ambientRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = window.innerWidth / 2,
      my = window.innerHeight / 2;
    let ax = mx,
      ay = my;
    let cx = mx,
      cy = my;
    let px = mx,
      py = my;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const loop = () => {
      ax += (mx - ax) * 0.025;
      ay += (my - ay) * 0.025;
      cx += (mx - cx) * 0.07;
      cy += (my - cy) * 0.07;
      px += (mx - px) * 0.14;
      py += (my - py) * 0.14;

      if (ambientRef.current) {
        ambientRef.current.style.background = `
          radial-gradient(ellipse 800px 700px at ${ax}px ${ay}px,
            rgba(240,235,224,0.052) 0%,
            rgba(240,235,224,0.018) 35%,
            transparent 65%
          )
        `;
      }
      if (coreRef.current) {
        coreRef.current.style.transform = `translate(${cx - 220}px, ${cy - 220}px)`;
      }
      if (accentRef.current) {
        accentRef.current.style.transform = `translate(${px - 100}px, ${py - 100}px)`;
      }

      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <div
        ref={ambientRef}
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <div
        ref={coreRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "440px",
          height: "440px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,109,250,0.09) 0%, rgba(192,132,252,0.04) 45%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
          filter: "blur(1px)",
          willChange: "transform",
        }}
      />
      <div
        ref={accentRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(240,235,224,0.045) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
          willChange: "transform",
        }}
      />
    </>
  );
}
