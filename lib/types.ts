export interface SituacionDiagnostico {
  titulo: string;
  descripcion: string;
  mensajeWhatsapp: string;
  icono: 'casa' | 'carro' | 'negocio' | 'otro';
}

export interface LineaServicio {
  numero: string;
  cuando: string;
  titulo: string;
  descripcion: string;
}

export interface PasoProceso {
  numero: number;
  titulo: string;
  descripcion: string;
}

/** Una corrección: lo que suele hacer un cobrador vs. lo que hace ARREGLA. */
export interface Correccion {
  ellos: string;
  nosotros: string;
}

/**
 * Las 4 etapas reales de un proceso ejecutivo civil en Colombia (prejurídico
 * → demanda/mandamiento de pago → embargo decretado → secuestro/remate),
 * usadas en el selector interactivo del hero. Eje distinto al de
 * `SituacionDiagnostico` (que pregunta QUÉ bien está en riesgo): este
 * pregunta EN QUÉ MOMENTO del proceso está la persona, para que el mensaje
 * de WhatsApp llegue con el contexto correcto desde el primer clic.
 */
export interface MomentoUrgencia {
  id: string;
  titulo: string;
  resumen: string;
  mensajeWhatsapp: string;
}
