'use client';

import { useEffect } from 'react';

/**
 * Progressive enhancement de la página, por selector de clase. No renderiza
 * nada.
 *
 *   1. Scroll reveal genérico (.reveal, .diag-card)
 *   2. Pasos de "Cómo funciona": la barra de progreso se calcula del MISMO
 *      contador de pasos "encendidos", nunca de un cálculo de scroll aparte
 *      (bug real que se corrigió en el artefacto de diseño del 2026-09-03:
 *      los dos podían desincronizarse).
 *
 * El tilt 3D y los botones magnéticos que tenía esta pieza se quitaron el
 * 2026-09-03, a partir de la auditoría de competencia: ese tipo de
 * micro-interacción juguetona es el lenguaje de app de consumo/bienestar que
 * el análisis asocia con los jugadores menos serios del mercado de alivio de
 * deudas en Colombia — el hover ahora es solo CSS (elevar + sombra), sin JS.
 */
export function Interactions() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    // 1 — scroll reveal
    const revealEls = document.querySelectorAll('.reveal, .diag-card, .correccion-row');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('in');
          });
        },
        { threshold: 0.15 }
      );
      revealEls.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    } else {
      revealEls.forEach((el) => el.classList.add('in'));
    }

    // 2 — pasos + barra de progreso sincronizada
    const fillEl = document.getElementById('steps-fill');
    const stepEls = document.querySelectorAll('.step');
    const total = stepEls.length;
    function updateFill() {
      const inCount = document.querySelectorAll('.step.in').length;
      if (fillEl) fillEl.style.width = `${total ? (inCount / total) * 84 : 0}%`;
    }
    if ('IntersectionObserver' in window) {
      const stepIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('in');
          });
          updateFill();
        },
        { threshold: 0.5 }
      );
      stepEls.forEach((el) => stepIo.observe(el));
      cleanups.push(() => stepIo.disconnect());
    } else {
      stepEls.forEach((el) => el.classList.add('in'));
      updateFill();
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
