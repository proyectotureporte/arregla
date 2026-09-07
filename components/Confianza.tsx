import { confianza } from '@/content/sitio';

export function Confianza() {
  return (
    <section className="confianza reveal">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{confianza.eyebrow}</span>
          <h2 className="section-title">{confianza.titulo}</h2>
        </div>
        <ul className="confianza-list">
          {confianza.puntos.map((punto) => (
            <li key={punto}>
              <span className="check" aria-hidden="true">
                ✓
              </span>
              <span>{punto}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
