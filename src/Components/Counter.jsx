import React, { useEffect, useRef, useState } from "react";

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Splits "~4,000", "100k+", "4.1 / 5", "120+" into prefix / number / suffix.
const parse = (raw) => {
  const m = String(raw).match(/^(\D*)([\d.,]+)([\s\S]*)$/);
  if (!m) return null;
  const hadComma = m[2].includes(",");
  const decimals = (m[2].split(".")[1] || "").length;
  const target = parseFloat(m[2].replace(/,/g, ""));
  if (Number.isNaN(target)) return null;
  return { prefix: m[1], suffix: m[3], target, decimals, hadComma };
};

const fmt = (n, decimals, hadComma) => {
  const fixed = n.toFixed(decimals);
  if (!hadComma) return fixed;
  const [int, dec] = fixed.split(".");
  const withCommas = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return dec ? `${withCommas}.${dec}` : withCommas;
};

/** Counts up to `value` the first time it scrolls into view. */
const Counter = ({ value, className = "", duration = 1200 }) => {
  const ref = useRef(null);
  const parsed = parse(value);
  const [display, setDisplay] = useState(
    parsed && !reduced() ? `${parsed.prefix}0${parsed.suffix}` : value
  );

  useEffect(() => {
    if (!parsed || reduced() || typeof IntersectionObserver === "undefined") {
      setDisplay(value);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let raf;
    let started = false;

    const animate = () => {
      if (started) return;
      started = true;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(
          parsed.prefix +
            fmt(parsed.target * eased, parsed.decimals, parsed.hadComma) +
            parsed.suffix
        );
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    // Safety net: show the real value if nothing else fires.
    const fallback = setTimeout(() => setDisplay(value), 2600);

    // Already visible at mount? animate now.
    const rect = el.getBoundingClientRect();
    if (rect.top < (window.innerHeight || 0) && rect.bottom > 0) {
      clearTimeout(fallback);
      animate();
      return () => {
        clearTimeout(fallback);
        if (raf) cancelAnimationFrame(raf);
      };
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        clearTimeout(fallback);
        animate();
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(fallback);
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
};

export default Counter;
