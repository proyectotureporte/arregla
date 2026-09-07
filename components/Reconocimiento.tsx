import { reconocimiento } from '@/content/sitio';

/** El único bloque cálido de la página, a propósito — ver la nota en content/sitio.ts. */
export function Reconocimiento() {
  return (
    <section className="reconocimiento reveal">
      <div className="container reconocimiento-inner">
        <div className="reconocimiento-texto">
          <span className="eyebrow warm">{reconocimiento.eyebrow}</span>
          <h2 className="section-title">{reconocimiento.titulo}</h2>
          <ul className="reconocimiento-list">
            {reconocimiento.puntos.map((punto) => (
              <li key={punto}>{punto}</li>
            ))}
          </ul>
          <p className="reconocimiento-cierre">{reconocimiento.cierre}</p>
        </div>
        <span className="reconocimiento-quote" aria-hidden="true">
          &ldquo;
        </span>
      </div>
    </section>
  );
}
