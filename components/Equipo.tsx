import { equipo } from '@/content/sitio';

export function Equipo() {
  return (
    <section className="equipo reveal">
      <div className="container equipo-inner">
        <div className="equipo-texto-col">
          <span className="eyebrow">{equipo.eyebrow}</span>
          <h2 className="section-title">{equipo.titulo}</h2>
          {equipo.textos.map((parrafo) => (
            <p className="equipo-texto" key={parrafo}>
              {parrafo}
            </p>
          ))}
          <p className="equipo-cierre">{equipo.cierre}</p>
        </div>
        <span className="equipo-quote" aria-hidden="true">
          &ldquo;
        </span>
      </div>
    </section>
  );
}
