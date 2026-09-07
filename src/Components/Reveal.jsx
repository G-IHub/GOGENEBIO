import React, { useEffect, useRef, useState } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Fades + rises its children into view the first time they're scrolled near.
 * No-ops (renders visible immediately) when IntersectionObserver is missing
 * or the visitor prefers reduced motion.
 */
const Reveal = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (
      prefersReducedMotion() ||
      typeof IntersectionObserver === "undefined" ||
      (typeof document !== "undefined" && document.visibilityState === "hidden")
    ) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    // Already on screen at mount (above the fold): show immediately, no reveal.
    const rect = el.getBoundingClientRect();
    if (rect.top < (window.innerHeight || 0) && rect.bottom > 0) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    io.observe(el);
    // Safety net: never leave content hidden if the observer doesn't fire.
    const fallback = setTimeout(() => setShown(true), 2500);
    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform ${
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      } ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
};

export default Reveal;
