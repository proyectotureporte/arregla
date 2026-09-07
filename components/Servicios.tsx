import { servicios } from '@/content/sitio';

export function Servicios() {
  return (
    <section className="servicios reveal" id="servicios">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Cómo te ayudamos</span>
          <h2 className="section-title">Cuatro formas de proteger lo tuyo</h2>
          <p className="section-lede">
            Según el momento en el que estés, aplicamos la estrategia correcta — no todas las situaciones se
            resuelven igual.
          </p>
        </div>
        <div className="serv-grid">
          {servicios.map((linea) => (
            <div className="serv-card" key={linea.numero}>
              <div className="serv-num">{linea.numero}</div>
              <div className="when">{linea.cuando}</div>
              <h3>{linea.titulo}</h3>
              <p>{linea.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
