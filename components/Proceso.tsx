import { proceso } from '@/content/sitio';

export function Proceso() {
  return (
    <section className="proceso reveal" id="proceso">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Cómo funciona</span>
          <h2 className="section-title">Cuatro pasos, de principio a fin</h2>
        </div>
        <div className="steps" id="steps">
          <div className="steps-track" />
          <div className="steps-fill" id="steps-fill" />
          {proceso.map((paso) => (
            <div className="step" key={paso.numero} data-step={paso.numero}>
              <div className="step-num">{paso.numero}</div>
              <h3>{paso.titulo}</h3>
              <p>{paso.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
