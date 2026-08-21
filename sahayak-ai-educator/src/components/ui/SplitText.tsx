"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Note: SplitText is a GSAP Club plugin in some setups. We'll dynamically import it
// at runtime to avoid build-time failures in environments where it's not present.
import { useGSAP } from "@gsap/react";

// register only actual GSAP plugins (don't pass hooks)
gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

type SplitType = "chars" | "words" | "lines" | (string & {});

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number; // ms
  duration?: number;
  ease?: string;
  splitType?: SplitType;
  from?: Record<string, any>;
  to?: Record<string, any>;
  threshold?: number;
  rootMargin?: string;
  textAlign?: string;
  tag?: "p" | "h1" | "h2" | "h3";
  onLetterAnimationComplete?: () => void;
}

// track split instances without mutating DOM
const splitInstances = new WeakMap<HTMLElement, any>();

const SplitText = ({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  tag = "p",
  onLetterAnimationComplete,
}: SplitTextProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const animationCompletedRef = useRef(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (document && (document as any).fonts && (document as any).fonts.status === "loaded") {
      setFontsLoaded(true);
    } else if (document && (document as any).fonts) {
      (document as any).fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    } else {
      // If Font Loading API isn't available, proceed.
      setFontsLoaded(true);
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      const el = ref.current;

      // kill previous instance if present
      const prev = splitInstances.get(el);
      if (prev) {
        try {
          prev.revert?.();
        } catch (_) {}
        splitInstances.delete(el);
      }

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || "px" : "px";
      const sign =
        marginValue === 0
          ? ""
          : marginValue < 0
          ? `-=${Math.abs(marginValue)}${marginUnit}`
          : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      let targets: any[] | undefined;
      const assignTargets = (self: any) => {
        if (splitType.includes("chars") && self.chars?.length) targets = self.chars;
        if (!targets && splitType.includes("words") && self.words?.length) targets = self.words;
        if (!targets && splitType.includes("lines") && self.lines?.length) targets = self.lines;
        if (!targets) targets = self.chars || self.words || self.lines;
      };

      let mounted = true;
      let createdInstance: any = null;

      // Dynamically import SplitText plugin to avoid build/runtime errors when
      // the plugin isn't available (it's a GSAP Club plugin in some setups).
      (async () => {
        let SplitTextPlugin: any = null;
        try {
          const mod = await import("gsap/SplitText");
          SplitTextPlugin = (mod as any)?.SplitText || (mod as any)?.default || mod;
          if (SplitTextPlugin) gsap.registerPlugin(ScrollTrigger, SplitTextPlugin);
        } catch (err) {
          // If dynamic import fails, ensure ScrollTrigger is registered and continue with fallback
          try { gsap.registerPlugin(ScrollTrigger); } catch (_) {}
          SplitTextPlugin = null;
        }

        try {
          if (SplitTextPlugin) {
            const inst = new SplitTextPlugin(el, {
              type: splitType,
              smartWrap: true,
              autoSplit: splitType === "lines",
              linesClass: "split-line",
              wordsClass: "split-word",
              charsClass: "split-char",
              reduceWhiteSpace: false,
              onSplit: (self: any) => {
                assignTargets(self);
                const tween = gsap.fromTo(
                  targets,
                  { ...from },
                  {
                    ...to,
                    duration,
                    ease,
                    stagger: delay / 1000,
                    scrollTrigger: {
                      trigger: el,
                      start,
                      once: true,
                    },
                    onComplete: () => {
                      animationCompletedRef.current = true;
                      onLetterAnimationComplete?.();
                    },
                    willChange: "transform, opacity",
                    force3D: true,
                  }
                );
                return tween;
              },
            });
            createdInstance = inst;
          } else {
            // Fallback: animate the element as a whole
            const tween = gsap.fromTo(
              el,
              { ...from },
              {
                ...to,
                duration,
                ease,
                scrollTrigger: {
                  trigger: el,
                  start,
                  once: true,
                },
                onComplete: () => {
                  animationCompletedRef.current = true;
                  onLetterAnimationComplete?.();
                },
                willChange: "transform, opacity",
                force3D: true,
              }
            );
            createdInstance = { revert: () => { try { tween.kill(); } catch {} } };
          }
        } catch (err) {
          // If creating instance fails for any reason, fallback to simple tween
          try {
            const tween = gsap.fromTo(
              el,
              { ...from },
              {
                ...to,
                duration,
                ease,
                scrollTrigger: {
                  trigger: el,
                  start,
                  once: true,
                },
                onComplete: () => {
                  animationCompletedRef.current = true;
                  onLetterAnimationComplete?.();
                },
                willChange: "transform, opacity",
                force3D: true,
              }
            );
            createdInstance = { revert: () => { try { tween.kill(); } catch {} } };
          } catch (_) {
            createdInstance = null;
          }
        }

        if (mounted && createdInstance) splitInstances.set(el, createdInstance);
      })();

      return () => {
        mounted = false;
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === el) st.kill();
        });
        const inst = splitInstances.get(el);
        if (inst) {
          try {
            inst.revert?.();
          } catch (_) {}
          splitInstances.delete(el);
        }
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded,
        onLetterAnimationComplete,
      ],
      scope: ref,
    }
  );

  const renderTag = () => {
    const style: any = {
      textAlign,
      overflow: "hidden",
      display: "inline-block",
      whiteSpace: "normal",
      wordWrap: "break-word",
      willChange: "transform, opacity",
    };
    const classes = `split-parent ${className}`;
    switch (tag) {
      case "h1":
        return (
          <h1 ref={ref as any} style={style} className={classes}>
            {text}
          </h1>
        );
      case "h2":
        return (
          <h2 ref={ref as any} style={style} className={classes}>
            {text}
          </h2>
        );
      case "h3":
        return (
          <h3 ref={ref as any} style={style} className={classes}>
            {text}
          </h3>
        );
      default:
        return (
          <p ref={ref as any} style={style} className={classes}>
            {text}
          </p>
        );
    }
  };

  return renderTag();
};

export default SplitText;
