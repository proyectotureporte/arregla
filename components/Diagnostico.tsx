import { DiagnosticoIcono } from './DiagnosticoIcono';
import { diagnostico, enlaceWhatsapp } from '@/content/sitio';

export function Diagnostico() {
  return (
    <section className="diagnostico reveal" id="diagnostico">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Diagnóstico rápido</span>
          <h2 className="section-title">¿Qué te está pasando?</h2>
          <p className="section-lede">
            Elige tu situación y te escribimos directo por WhatsApp — sin formularios largos, sin esperas.
          </p>
        </div>
        <div className="diag-grid">
          {diagnostico.map((situacion) => (
            <a
              key={situacion.titulo}
              className="diag-card"
              href={enlaceWhatsapp(situacion.mensajeWhatsapp)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <DiagnosticoIcono tipo={situacion.icono} />
              <h3>{situacion.titulo}</h3>
              <p>{situacion.descripcion}</p>
              <span className="go">Escribir por esto →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
