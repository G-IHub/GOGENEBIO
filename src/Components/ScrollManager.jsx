import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Keeps navigation predictable:
 *  - every route change starts at the top of the page
 *  - a reload never restores the old scroll position or jumps to a #hash;
 *    it always opens at the hero
 */
const ScrollManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Drop any lingering #hash so a reload doesn't jump to that section.
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        pathname + window.location.search
      );
    }
    // Jump (not smooth-scroll) to the top.
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    html.style.scrollBehavior = previous;
  }, [pathname]);

  return null;
};

export default ScrollManager;
