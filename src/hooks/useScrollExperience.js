import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

/* =====================================================================
   useScrollExperience
   Activa smooth-scroll (Lenis) + animaciones de scroll (GSAP/ScrollTrigger)
   sobre el contenido marcado con data-* en el DOM. Se vuelve a ejecutar
   cuando cambia `key` (p. ej. al navegar a otro gym) para re-medir todo.

   Respeta prefers-reduced-motion: si está activo, todo queda estático.
   ===================================================================== */
export function useScrollExperience(key) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {});
    const cleanups = [];

    /* ---- Smooth scroll ---- */
    let lenis = null;
    if (!reduce) {
      lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      lenis.on('scroll', ScrollTrigger.update);
      const onTick = (t) => lenis.raf(t * 1000);
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);
      cleanups.push(() => {
        gsap.ticker.remove(onTick);
        lenis.destroy();
      });
    }

    /* ---- Reveal (IntersectionObserver) ---- */
    const reveals = document.querySelectorAll('[data-reveal]');
    if (reduce) {
      reveals.forEach((el) => el.classList.add('is-in'));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (!en.isIntersecting) return;
            const el = en.target;
            const d = parseFloat(el.dataset.d || 0) * 0.09;
            el.style.transitionDelay = d + 's';
            el.classList.add('is-in');
            io.unobserve(el);
          });
        },
        { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
      );
      reveals.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    /* ---- Contadores ---- */
    const counters = document.querySelectorAll('[data-count]');
    const animateCount = (el) => {
      const end = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      if (reduce) {
        el.textContent = end.toLocaleString() + suffix;
        return;
      }
      const dur = 1600;
      const start = performance.now();
      const step = (now) => {
        const t = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(end * eased).toLocaleString() + suffix;
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            animateCount(en.target);
            cio.unobserve(en.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => cio.observe(el));
    cleanups.push(() => cio.disconnect());

    if (reduce) {
      return () => cleanups.forEach((fn) => fn());
    }

    /* ---- Animaciones GSAP (dentro de un context para limpiar fácil) ---- */
    ctx.add(() => {
      /* Parallax de medios */
      document.querySelectorAll('[data-parallax]').forEach((el) => {
        const amt = parseFloat(el.dataset.parallax) || 0.2;
        const img = el.querySelector('img');
        gsap.to(img || el, {
          yPercent: amt * 100,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }
        });
      });

      /* Entrada del título del hero */
      const lines = gsap.utils.toArray('.hero__title .line');
      if (lines.length) {
        gsap.from(lines, {
          yPercent: 110, opacity: 0, duration: 1, ease: 'power4.out',
          stagger: 0.12, delay: 0.15
        });
      }

      /* Scroll horizontal de programas (pin + scrub) */
      const hwrap = document.querySelector('[data-hscroll]');
      const htrack = document.querySelector('[data-hscroll-track]');
      if (hwrap && htrack && window.innerWidth > 900) {
        const dist = () => htrack.scrollWidth - hwrap.clientWidth;
        gsap.to(htrack, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: hwrap,
            start: 'center center',
            end: () => '+=' + dist(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true
          }
        });
      }

      /* Manifiesto: palabras que se encienden con el progreso */
      const manifesto = document.querySelector('[data-manifesto]');
      const words = manifesto ? manifesto.querySelectorAll('[data-word]') : [];
      if (words.length) {
        const root = getComputedStyle(document.documentElement);
        const accent = root.getPropertyValue('--accent').trim();
        const ink = root.getPropertyValue('--ink').trim();
        let lit = -1;
        ScrollTrigger.create({
          trigger: manifesto,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onUpdate: (self) => {
            const n = Math.floor(self.progress * words.length * 1.15);
            if (n === lit) return;
            lit = n;
            words.forEach((w, i) => {
              const on = i < n;
              w.style.color = on ? (w.dataset.accent === 'true' ? accent : ink) : '';
            });
          }
        });
      }
    });

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    /* refresca tras montar para medir imágenes/fuentes */
    const rafId = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.removeEventListener('load', onLoad);
      cancelAnimationFrame(rafId);
      ctx.revert();
      cleanups.forEach((fn) => fn());
    };
  }, [key]);
}

/* Marquee reactivo a la velocidad de scroll (componente lo usa por ref) */
export function startReactiveMarquee(track) {
  if (!track) return () => {};
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return () => {};
  let offset = 0;
  let base = 0.6;
  let vel = 0;
  let last = window.scrollY;
  let raf;
  const half = track.scrollWidth / 2;
  const onScroll = () => {
    vel = window.scrollY - last;
    last = window.scrollY;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  const tick = () => {
    offset -= base + Math.min(Math.abs(vel) * 0.25, 8);
    vel *= 0.9;
    if (half && offset <= -half) offset += half;
    track.style.transform = 'translateX(' + offset + 'px)';
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => {
    window.removeEventListener('scroll', onScroll);
    cancelAnimationFrame(raf);
  };
}
