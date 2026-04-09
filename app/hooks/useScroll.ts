"use client";
import { useState, useEffect, useCallback, useRef } from "react";

export type SectionId = "hero" | "about" | "services" | "clients" | "testimonials" | "contact";
export const SECTION_ORDER: SectionId[] = [
  "hero",
  "about",
  "services",
  "clients",
  "testimonials",
  "contact",
];
export const SECTION_LABELS: Record<SectionId, string> = {
  hero: "Hero",
  about: "About Us",
  services: "Services",
  clients: "Clients",
  testimonials: "Testimonials",
  contact: "Contact",
};

export function useScroll() {
  const [current, setCurrent] = useState<SectionId>("hero");
  const lockRef = useRef(false);
  const velocityRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigate = useCallback((dir: 1 | -1) => {
    if (lockRef.current) return;
    lockRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => { lockRef.current = false; }, 1100);
    setCurrent((prev) => {
      const idx = SECTION_ORDER.indexOf(prev);
      return SECTION_ORDER[Math.max(0, Math.min(SECTION_ORDER.length - 1, idx + dir))];
    });
  }, []);

  const goTo = useCallback((id: SectionId) => {
    if (lockRef.current) return;
    lockRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => { lockRef.current = false; }, 1100);
    setCurrent(id);
  }, []);

  useEffect(() => {
    const THRESHOLD = 12;
    const DECAY = 0.88;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      velocityRef.current += e.deltaY * 0.4;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const decay = () => {
        velocityRef.current *= DECAY;
        if (Math.abs(velocityRef.current) > THRESHOLD) {
          rafRef.current = requestAnimationFrame(decay);
        } else {
          if (Math.abs(velocityRef.current) > 2) navigate(velocityRef.current > 0 ? 1 : -1);
          velocityRef.current = 0;
        }
      };
      rafRef.current = requestAnimationFrame(decay);
    };
    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 50) navigate(dy > 0 ? 1 : -1);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") navigate(1);
      if (e.key === "ArrowUp" || e.key === "PageUp") navigate(-1);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [navigate]);

  return { current, goTo };
}
