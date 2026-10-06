"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

const revealSelector = ".home-section-heading, .home-service-card, .home-work figure, .home-process-grid li, .company-layout > div, .contact-details, .contact-form";

export default function HomeScrollReveal({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current || typeof IntersectionObserver === "undefined" || typeof Element.prototype.animate !== "function") return;

    const targets = Array.from(root.current.querySelectorAll<HTMLElement>(revealSelector));
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const seen = new Set<Element>();
    const running = new Map<Element, Animation>();
    let observer: IntersectionObserver | undefined;

    function stop() {
      observer?.disconnect();
      running.forEach(animation => animation.cancel());
      running.clear();
    }

    function observe() {
      stop();
      if (preference.matches) return;

      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting || seen.has(entry.target)) return;
          seen.add(entry.target);
          observer?.unobserve(entry.target);
          if (entry.target.contains(document.activeElement)) return;

          // Start only when visible. Static HTML stays readable without JavaScript.
          const animation = entry.target.animate([
            { opacity: .15, transform: "translateY(36px)" },
            { opacity: 1, transform: "translateY(0)" },
          ], { duration: 750, delay: (targets.indexOf(entry.target as HTMLElement) % 4) * 85, easing: "cubic-bezier(.2,.65,.3,1)", fill: "both" });
          animation.id = "scroll-reveal";
          running.set(entry.target, animation);
          animation.finished.then(() => {
            animation.cancel();
            running.delete(entry.target);
          }, () => running.delete(entry.target));
        });
      }, { threshold: .12, rootMargin: "0px 0px -35px 0px" });

      targets.forEach(target => { if (!seen.has(target)) observer?.observe(target); });
    }

    function revealFocused(event: FocusEvent) {
      if (!(event.target instanceof Element)) return;
      const focused = event.target;
      targets.filter(target => target.contains(focused)).forEach(target => {
        seen.add(target);
        observer?.unobserve(target);
        running.get(target)?.cancel();
        running.delete(target);
      });
    }

    const element = root.current;
    observe();
    preference.addEventListener("change", observe);
    element.addEventListener("focusin", revealFocused);
    return () => {
      stop();
      preference.removeEventListener("change", observe);
      element.removeEventListener("focusin", revealFocused);
    };
  }, []);

  return <div ref={root} className="home-page">{children}</div>;
}
