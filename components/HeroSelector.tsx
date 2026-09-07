'use client';

import { useState } from 'react';
import { WhatsAppButton } from './WhatsAppButton';
import { MENSAJE_WHATSAPP_GENERICO, enlaceWhatsapp, hero, loQueNoHacemos, momentos } from '@/content/sitio';

/**
 * Único bloque interactivo del hero: la persona elige en qué momento del
 * proceso está y el mismo botón de WhatsApp de siempre cambia su mensaje —
 * ver la nota junto a `momentos` en content/sitio.ts para el porqué de este
 * diseño en vez de animaciones decorativas o varios CTAs.
 */
export function HeroSelector() {
  const [activoId, setActivoId] = useState<string | null>(null);
  const activo = momentos.find((m) => m.id === activoId) ?? null;

  const mensaje = activo?.mensajeWhatsapp ?? MENSAJE_WHATSAPP_GENERICO;
  const ctaTexto = activo ? 'Escribir por esto →' : hero.ctaTexto;

  return (
    <div className="hero-selector">
      <span className="momento-pregunta">¿En qué momento estás?</span>
      <div className="momento-grid" role="group" aria-label="En qué momento estás">
        {momentos.map((m) => (
          <button
            key={m.id}
            type="button"
            className={`momento-btn${m.id === activoId ? ' active' : ''}`}
            aria-pressed={m.id === activoId}
            onClick={() => setActivoId(m.id === activoId ? null : m.id)}
          >
            {m.titulo}
          </button>
        ))}
      </div>
      <div className="momento-panel" key={activo?.id ?? 'default'}>
        {activo ? (
          <p className="momento-resumen">{activo.resumen}</p>
        ) : (
          <>
            <div className="kicker">Lo que no hacemos</div>
            <ul>
              {loQueNoHacemos.map((linea) => (
                <li key={linea}>
                  <span className="no">✕</span> {linea}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="hero-ctas">
        <WhatsAppButton href={enlaceWhatsapp(mensaje)} texto={ctaTexto} conAnillo />
        <span className="hero-note">
          <span className="live-dot" />
          {hero.nota}
        </span>
      </div>
    </div>
  );
}
