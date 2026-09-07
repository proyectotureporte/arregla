import { HeroSelector } from './HeroSelector';
import { hero } from '@/content/sitio';

/**
 * El fondo animado tipo "aurora" (canvas con manchas de luz moviéndose) salió
 * a partir de la auditoría de competencia (2026-09-03): es exactamente el
 * lenguaje visual de app de bienestar/consumo que ese análisis asocia con los
 * jugadores menos serios del mercado de alivio de deudas en Colombia. Queda
 * un fondo quieto, sin movimiento — ver HeroCanvas.tsx si se necesita
 * recuperar la versión animada para otro contexto.
 *
 * La interactividad que pidió Santiago (2026-09-03: "mucho más interactivo,
 * que el usuario interactúe más") vive en HeroSelector — un componente
 * cliente aislado, no en este server component.
 */
export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true" />
      <div className="container hero-inner">
        <div>
          <span className="eyebrow">{hero.eyebrow}</span>
          <h1 className="headline" id="headline">
            <span className="word" style={{ animationDelay: '.02s' }}>
              ¿Te
            </span>{' '}
            <span className="word" style={{ animationDelay: '.08s' }}>
              están
            </span>{' '}
            <span className="word" style={{ animationDelay: '.14s' }}>
              por
            </span>{' '}
            <span className="word accent" style={{ animationDelay: '.2s' }}>
              embargar?
            </span>
            <br />
            <span className="word accent" style={{ animationDelay: '.32s' }}>
              No
            </span>{' '}
            <span className="word accent" style={{ animationDelay: '.38s' }}>
              estás
            </span>{' '}
            <span className="word accent" style={{ animationDelay: '.44s' }}>
              solo.
            </span>
          </h1>
          <p className="hero-sub">{hero.bajada}</p>
        </div>
        <HeroSelector />
      </div>
    </section>
  );
}
