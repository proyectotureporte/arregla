import { aliado, correcciones } from '@/content/sitio';

/**
 * Cada fila muestra lo que dice/hace un cobrador típico, tachado, y al lado
 * lo que hace ARREGLA — como una corrección sobre un documento, no como dos
 * columnas de marketing enfrentadas.
 */
export function Aliado() {
  return (
    <section className="aliado reveal">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{aliado.eyebrow}</span>
          <h2 className="section-title">{aliado.titulo}</h2>
          <p className="section-lede">{aliado.bajada}</p>
        </div>
        <ol className="correccion-list">
          {correcciones.map((par, i) => (
            <li className="correccion-row" key={par.ellos} style={{ transitionDelay: `${i * 90}ms` }}>
              <span className="correccion-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="correccion-ellos">{par.ellos}</span>
              <svg className="correccion-arrow" viewBox="0 0 24 12" fill="none" aria-hidden="true">
                <path d="M1 6h20m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="correccion-nosotros">{par.nosotros}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
