import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// fastScrollEnd exists at runtime; typings may lag
ScrollTrigger.config({
  ignoreMobileResize: true,
  // @ts-expect-error GSAP runtime option
  fastScrollEnd: true,
});

export const VIEWPORT = {
  mobile: '(max-width: 1023px)',
  desktop: '(min-width: 1024px)',
} as const;

export type RevealOpts = {
  y?: number;
  x?: number;
  scale?: number;
  rotate?: number;
  skewX?: number;
  filterBlur?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  fromOpacity?: number;
  delay?: number;
  ease?: string;
};

/** Preset for richer desktop section entrances */
export const DESKTOP_REVEAL: RevealOpts = {
  y: 32,
  scale: 0.96,
  fromOpacity: 0.25,
  duration: 0.85,
  stagger: 0.09,
  start: 'top 88%',
  ease: 'power3.out',
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
    scale,
    rotate,
    skewX,
    filterBlur,
    duration = 0.5,
    stagger = 0.05,
    start = 'top 92%',
    fromOpacity = 0.4,
    delay = 0,
    ease = 'power2.out',
  } = opts;

  const fromVars: gsap.TweenVars = { y, x, opacity: fromOpacity };
  const toVars: gsap.TweenVars = {
    y: 0,
    x: 0,
    opacity: 1,
    duration,
    stagger,
    delay,
    ease,
    immediateRender: false,
  };

  if (scale !== undefined) {
    fromVars.scale = scale;
    toVars.scale = 1;
  }
  if (rotate !== undefined) {
    fromVars.rotate = rotate;
    toVars.rotate = 0;
  }
  if (skewX !== undefined) {
    fromVars.skewX = skewX;
    toVars.skewX = 0;
  }
  if (filterBlur !== undefined) {
    fromVars.filter = `blur(${filterBlur}px)`;
    toVars.filter = 'blur(0px)';
  }

  const tween = gsap.fromTo(targets, fromVars, {
    ...toVars,
    scrollTrigger: {
      trigger,
      start,
      toggleActions: 'play none none none',
      onEnterBack: () => {
        gsap.set(targets, {
          y: 0,
          x: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
          skewX: 0,
          filter: 'none',
          clearProps: 'transform,filter',
        });
      },
      onRefresh: (self) => {
        if (self.progress > 0 || self.scroll() >= self.start) {
          self.animation?.progress(1);
        }
      },
    },
  });

  return tween;
}

/**
 * Register mobile + desktop reveals in one matchMedia block.
 * Desktop opts are merged on top of mobile defaults.
 */
export function viewportReveals(
  setup: (api: {
    mobile: (targets: gsap.TweenTarget, trigger: gsap.DOMTarget | null | undefined, opts?: RevealOpts) => void;
    desktop: (targets: gsap.TweenTarget, trigger: gsap.DOMTarget | null | undefined, opts?: RevealOpts) => void;
  }) => void
) {
  const mm = gsap.matchMedia();

  setup({
    mobile: (targets, trigger, opts) => {
      mm.add(VIEWPORT.mobile, () => softReveal(targets, trigger, opts));
    },
    desktop: (targets, trigger, opts) => {
      mm.add(VIEWPORT.desktop, () => softReveal(targets, trigger, { ...DESKTOP_REVEAL, ...opts }));
    },
  });

  return mm;
}

/** Soft Ken Burns / parallax on an image while its section is in view. */
export function parallaxImage(
  target: gsap.TweenTarget,
  trigger: gsap.DOMTarget | null | undefined,
  opts: { fromScale?: number; yFrom?: number; yTo?: number; scrub?: boolean | number } = {}
) {
  if (!trigger) return;

  const { fromScale = 1.1, yFrom = -4, yTo = 6, scrub = true } = opts;

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
        scrub,
      },
    }
  );
}

/** Section-level scrub parallax — stronger on desktop by default. */
export function scrubY(
  target: gsap.TweenTarget,
  trigger: gsap.DOMTarget | null | undefined,
  opts: { yPercent?: number; scrub?: boolean | number; start?: string; end?: string } = {}
) {
  if (!trigger) return;

  const { yPercent = -8, scrub = true, start = 'top top', end = 'bottom top' } = opts;

  return gsap.to(target, {
    yPercent,
    ease: 'none',
    scrollTrigger: { trigger, start, end, scrub },
  });
}

/**
 * After a navbar jump, force any play-once reveals that were skipped
 * to their finished (visible) state.
 */
export function flushPassedScrollTriggers() {
  ScrollTrigger.getAll().forEach((st) => {
    const anim = st.animation;
    if (!anim) return;

    const scrub = (st.vars as { scrub?: boolean | number } | undefined)?.scrub;
    if (scrub !== undefined && scrub !== false) return;

    if (st.isActive || st.progress > 0 || st.scroll() >= st.start - 1) {
      if (anim.progress() < 1) {
        anim.progress(1).pause();
      }
    }
  });
}
