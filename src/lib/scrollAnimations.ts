import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// fastScrollEnd exists at runtime; typings may lag
ScrollTrigger.config({
  ignoreMobileResize: true,
  // @ts-expect-error GSAP runtime option
  fastScrollEnd: true,
});

type RevealOpts = {
  y?: number;
  x?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  fromOpacity?: number;
  delay?: number;
};

/**
 * Soft play-once reveal that stays visible after jumping past it
 * (e.g. navbar scrollTo) and when scrolling back up.
 */
export function softReveal(
  targets: gsap.TweenTarget,
  trigger: gsap.DOMTarget | null | undefined,
  opts: RevealOpts = {}
) {
  if (!trigger) return;

  const {
    y = 16,
    x = 0,
    duration = 0.5,
    stagger = 0.05,
    start = 'top 92%',
    fromOpacity = 0.4,
    delay = 0,
  } = opts;

  const tween = gsap.fromTo(
    targets,
    { y, x, opacity: fromOpacity },
    {
      y: 0,
      x: 0,
      opacity: 1,
      duration,
      stagger,
      delay,
      ease: 'power2.out',
      immediateRender: false,
      scrollTrigger: {
        trigger,
        start,
        toggleActions: 'play none none none',
        onEnterBack: () => {
          gsap.set(targets, { y: 0, x: 0, opacity: 1, clearProps: 'transform' });
        },
        // If already past start when ST is created / refreshed, finish immediately
        onRefresh: (self) => {
          if (self.progress > 0 || self.scroll() >= self.start) {
            self.animation?.progress(1);
          }
        },
      },
    }
  );

  return tween;
}

/** Soft Ken Burns / parallax on an image while its section is in view. */
export function parallaxImage(
  target: gsap.TweenTarget,
  trigger: gsap.DOMTarget | null | undefined,
  opts: { fromScale?: number; yFrom?: number; yTo?: number } = {}
) {
  if (!trigger) return;

  const { fromScale = 1.1, yFrom = -4, yTo = 6 } = opts;

  return gsap.fromTo(
    target,
    { scale: fromScale, yPercent: yFrom },
    {
      scale: 1,
      yPercent: yTo,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    }
  );
}

/**
 * After a navbar jump, force any play-once reveals that were skipped
 * to their finished (visible) state.
 */
export function flushPassedScrollTriggers() {
  ScrollTrigger.getAll().forEach((st) => {
    const anim = st.animation;
    if (!anim) return;

    // Leave scrubbed animations alone — they follow scroll position
    const scrub = (st.vars as { scrub?: boolean | number } | undefined)?.scrub;
    if (scrub !== undefined && scrub !== false) return;

    // Already scrolled past the trigger start → show final state
    if (st.isActive || st.progress > 0 || st.scroll() >= st.start - 1) {
      if (anim.progress() < 1) {
        anim.progress(1).pause();
      }
    }
  });
}
