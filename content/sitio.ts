import type { Correccion, LineaServicio, MomentoUrgencia, PasoProceso, SituacionDiagnostico } from '@/lib/types';

/** Número real de ARREGLA (Santiago, 2026-09-03). Un solo lugar — los 6 botones lo leen de acá. */
export const WHATSAPP_TELEFONO_PLANO = '573151322640';
/** Mismo número, formateado para mostrarlo como texto legible en el footer. */
export const WHATSAPP_TELEFONO_DISPLAY = '+57 315 132 2640';

export function enlaceWhatsapp(mensaje: string): string {
  return `https://wa.me/${WHATSAPP_TELEFONO_PLANO}?text=${encodeURIComponent(mensaje)}`;
}

export const MENSAJE_WHATSAPP_GENERICO = 'Hola, necesito ayuda con un problema financiero';

export const marca = {
  nombre: 'ARREGLA',
  eslogan: 'Soluciones inteligentes para dificultades financieras',
} as const;

/**
 * 2026-09-03: Santiago dijo que el header y el footer se sentían "simples"
 * — antes eran solo logo + botón de WhatsApp, sin ninguna estructura de
 * navegación. Estas anclas apuntan a secciones que ya existen en la página
 * (mismos id que usan Diagnostico.tsx, Servicios.tsx y Proceso.tsx).
 */
export const navLinks = [
  { href: '#diagnostico', label: 'Diagnóstico' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#proceso', label: 'Cómo funciona' },
] as const;

export const hero = {
  eyebrow: marca.eslogan,
  /** Las dos frases del titular se pintan por separado en Hero.tsx: la primera en tinta normal, la segunda con el degradado de acento. */
  titularParte1: '¿Te están por embargar?',
  titularParte2: 'No estás solo.',
  bajada:
    'Somos el aliado del deudor, no del acreedor. Te ayudamos a proteger tu casa, tu carro o tu negocio antes de que sea tarde — con estrategia financiera, jurídica y de negociación real.',
  ctaTexto: 'Escríbenos ahora',
  nota: 'Respuesta directa, sin compromiso',
} as const;

/**
 * Sección nueva a partir del mapa de empatía (2026-09-03): valida el miedo
 * específico ANTES de pedir nada — vergüenza, desconfianza del sector, culpa,
 * soledad. Es el único momento cálido de la página a propósito: el resto se
 * queda serio y competente (ver auditoría de competencia), y este contraste
 * de temperatura es deliberado, no decorativo.
 */
export const reconocimiento = {
  eyebrow: 'Antes de seguir',
  titulo: 'Sabemos lo que sientes ahora mismo',
  puntos: [
    'Que te dé pena contarlo, incluso a tu familia.',
    'Que te preguntes si pedir ayuda es meterte en otro problema.',
    'Que sientas que esto te lo estás cargando solo.',
  ],
  cierre: 'Es normal sentir eso. No te vamos a prometer que desaparece de un día para otro — pero no tienes que resolverlo solo.',
} as const;

/**
 * "Lo que no hacemos" — texto textual del perfil de modelo de negocio de
 * ARREGLA (aportado por Santiago, 2026-07-17). Se usa dos veces: tarjeta del
 * hero y columna izquierda de la sección Aliado.
 */
export const loQueNoHacemos = [
  'No somos cobradores.',
  'No trabajamos para bancos.',
  'No compramos cartera.',
] as const;

export const loQueSiHacemos = [
  'Defendemos los intereses del deudor.',
  'Buscamos soluciones viables, no solo dilatar.',
  'Construimos acuerdos sostenibles de verdad.',
] as const;

/**
 * Selector interactivo del hero (2026-09-03): Santiago pidió "mucho más
 * interactivo, que el usuario interactúe más". La investigación (Utsubo,
 * WSA — fintech/legal hero patterns 2026) confirma que un visitante que
 * "opera" la página con su propio clic confía casi el doble que uno que
 * solo lee, y que un solo CTA que se adapta a la intención convierte mejor
 * que varios CTAs sueltos — así que en vez de agregar más botones, este
 * selector hace que el ÚNICO botón de WhatsApp del hero cambie su mensaje
 * según la etapa real del proceso que elija la persona.
 *
 * Las 4 etapas son las reales de un ejecutivo civil colombiano —
 * prejurídico, demanda/mandamiento de pago, embargo decretado,
 * secuestro/remate — verificadas contra los procesos reales que ya se
 * trabajaron con la Rama Judicial en el barrido de casos de ARREGLA.
 */
export const momentos: readonly MomentoUrgencia[] = [
  {
    id: 'prejuridico',
    titulo: 'Aún no me han notificado nada',
    resumen: 'Todavía no hay proceso judicial — es el mejor momento para negociar o prevenir. Actuar ahora te da más opciones.',
    mensajeWhatsapp: 'Hola, todavía no me han notificado nada pero quiero prevenir un embargo',
  },
  {
    id: 'demanda',
    titulo: 'Ya me notificaron una demanda',
    resumen: 'Ya hay un proceso en curso, pero todavía hay tiempo para responder y construir una defensa o negociación.',
    mensajeWhatsapp: 'Hola, ya me notificaron una demanda y necesito ayuda',
  },
  {
    id: 'embargo',
    titulo: 'Ya decretaron un embargo',
    resumen: 'Es urgente, pero un embargo decretado no es lo mismo que un remate — todavía se puede intervenir a tiempo.',
    mensajeWhatsapp: 'Hola, ya me decretaron un embargo y necesito ayuda urgente',
  },
  {
    id: 'remate',
    titulo: 'Ya hay fecha de remate o secuestro',
    resumen: 'Este es el momento más crítico. Cada día cuenta — hablemos hoy mismo.',
    mensajeWhatsapp: 'Hola, ya hay fecha de remate o secuestro y necesito ayuda urgente',
  },
];

/**
 * 2026-09-03: Santiago dijo del sitio "le falta el alma, el sentimiento".
 * Investigué cómo resuelven esto sitios de otras categorías igual de
 * sensibles sin fotos reales disponibles (Empathy.com — ayuda a familias
 * con trámites financieros/legales tras una muerte, estructuralmente casi
 * idéntico a ARREGLA) y la evidencia (Gladstone et al. 2021; guía de
 * comunicación del CFPB de EE.UU.) apunta a lo mismo: el alma no sale de
 * una foto o una ilustración — sale de VOZ (algo específico y humano dicho
 * en primera persona) y de ESPECIFICIDAD real (quién exactamente revisa tu
 * caso), no de genérico. Y el reencuadre "esto no habla de quién eres"
 * (patrón del CFPB: "tu futuro, no tu vergüenza") es lo que de verdad
 * mueve confianza en alguien que siente vergüenza — no la urgencia ni la
 * calidez decorativa, que ya sabemos que en este mercado lee como sospechoso.
 *
 * Le pregunté a Santiago por su voz en primera persona y me dijo "todo tú,
 * pero métele alma" — así que el párrafo del "por qué" de abajo NO es una
 * biografía inventada de Santiago (eso sí sería deshonesto: no voy a
 * inventarle una historia personal que no sé si es cierta). Es la
 * convicción de la marca en voz de "nosotros", construida solo con hechos
 * YA documentados y aprobados en "Perfil maestro ARREGLA.md": el patrón
 * real que describe ese documento (a la gente la aborda un cobrador o el
 * abogado del acreedor, nunca alguien que le explique sus opciones) y la
 * consecuencia real que ya estaba escrita ahí (pérdida del patrimonio,
 * afectación familiar). Nada inventado — solo puesto en primera persona.
 */
export const equipo = {
  eyebrow: 'Por qué existimos',
  titulo: 'Nadie debería enterarse de sus opciones cuando ya es demasiado tarde',
  textos: [
    'En Colombia, cuando alguien no puede pagar una deuda, lo primero que casi siempre recibe es una llamada de cobro o una demanda — casi nunca alguien que le explique sus opciones. Hemos visto el mismo patrón una y otra vez: familias que pierden su casa o su negocio no porque no había salida, sino porque nadie se las mostró a tiempo.',
    'Por eso existe ARREGLA. Y por eso detrás de cada diagnóstico hay abogados litigantes que conocen el proceso y peritos financieros que revisan los números — un equipo real, que solo trabaja para ti, nunca para el banco.',
  ],
  cierre: 'Tu situación no habla de quién eres. Habla de lo que te pasó — y de lo que hacemos ahora para protegerte.',
} as const;

export const aliado = {
  eyebrow: 'Nuestro rol',
  titulo: 'Antes de escribirnos, una corrección',
  bajada: 'Así se presenta la mayoría en este mercado. Así trabajamos nosotros.',
} as const;

/** Mismos 3 pares de hechos de arriba, reescritos como corrección directa. */
export const correcciones: readonly Correccion[] = [
  { ellos: 'Trabaja para el banco', nosotros: 'Defiende los intereses del deudor' },
  { ellos: 'Cobra tu deuda', nosotros: 'Busca soluciones viables, no solo dilatar' },
  { ellos: 'Compra tu cartera', nosotros: 'Construye acuerdos sostenibles de verdad' },
];

/**
 * La tarjeta "negocio" nombra explícitamente al codeudor/representante legal
 * (no solo "la empresa") a partir de la auditoría de competencia del
 * 2026-09-03: ninguno de los 15 competidores revisados le habla directo a
 * esa persona, y es exactamente el perfil que "ARREGLA — Mapa de
 * intervención (25-ago-2026)" identifica como el cliente real detrás de una
 * deuda societaria — casi nunca aparece en el proceso judicial, hay que
 * nombrarlo para que se reconozca.
 */
export const diagnostico: readonly SituacionDiagnostico[] = [
  {
    icono: 'casa',
    titulo: 'Me van a embargar la casa',
    descripcion: 'Vivienda, crédito hipotecario o leasing habitacional en riesgo.',
    mensajeWhatsapp: 'Hola, me están por embargar la casa y necesito ayuda',
  },
  {
    icono: 'carro',
    titulo: 'Me van a quitar el carro',
    descripcion: 'Crédito de vehículo o leasing con proceso de secuestro en curso.',
    mensajeWhatsapp: 'Hola, me están por quitar el carro y necesito ayuda',
  },
  {
    icono: 'negocio',
    titulo: 'Mi negocio está en problemas',
    descripcion: 'Empresa, comercio, o eres codeudor o representante legal de una deuda empresarial.',
    mensajeWhatsapp: 'Hola, mi negocio está en problemas financieros (o soy codeudor de una deuda empresarial) y necesito ayuda',
  },
  {
    icono: 'otro',
    titulo: 'Otra deuda o proceso',
    descripcion: 'Tarjetas, libranzas, créditos personales u otro tipo de cobro.',
    mensajeWhatsapp: 'Hola, tengo otra deuda o proceso y necesito ayuda',
  },
];

/** Las 4 líneas de servicio, texto de "Servicios ARREGLA.md" (2026-07-17). */
export const servicios: readonly LineaServicio[] = [
  {
    numero: '01',
    cuando: 'Antes de la demanda',
    titulo: 'Preventiva',
    descripcion: 'Diagnóstico, negociación y reestructuración para que el proceso nunca llegue a juzgado.',
  },
  {
    numero: '02',
    cuando: 'Después de la demanda',
    titulo: 'Judicial',
    descripcion: 'Análisis del expediente, estrategia procesal y negociación dentro del proceso ya iniciado.',
  },
  {
    numero: '03',
    cuando: 'Protección de activos',
    titulo: 'Patrimonial',
    descripcion: 'Evaluación de tus bienes, estrategias de preservación y gestión de remanentes.',
  },
  {
    numero: '04',
    cuando: 'Cuando toca vender',
    titulo: 'Inmobiliaria',
    descripcion:
      'Cuando la mejor salida es vender el bien —no que te lo rematen— nos encargamos de la comercialización, la negociación y la estructuración financiera para que la venta te beneficie a ti, no solo cierre la deuda.',
  },
];

/** Sección de transparencia — ver auditoría de competencia 2026-09-03 en el chat. */
export const confianza = {
  eyebrow: 'Transparencia',
  titulo: 'Esto lo decimos siempre, no solo cuando preguntan',
  puntos: [
    'No prometemos un porcentaje de descuento fijo antes de conocer tu caso y hablar con tu acreedor — si alguien te lo promete sin eso, desconfía.',
    'No somos la Superintendencia Financiera ni actuamos en su nombre — somos tu equipo de negociación y estrategia.',
    'Si tu caso necesita un trámite formal de insolvencia, ese trámite lo lleva un centro de conciliación o una notaría autorizada — nosotros te preparamos y te acompañamos en todo el proceso.',
    'Te decimos el alcance y el plan antes de que decidas trabajar con nosotros, no después de que ya pagaste.',
  ],
} as const;

export const proceso: readonly PasoProceso[] = [
  { numero: 1, titulo: 'Diagnóstico', descripcion: 'Revisamos tu situación financiera, jurídica y patrimonial completa.' },
  { numero: 2, titulo: 'Estrategia', descripcion: 'Diseñamos el camino: negociación, reestructuración, defensa o venta estratégica.' },
  { numero: 3, titulo: 'Ejecución', descripcion: 'Te acompañamos frente al banco, la cooperativa o el juzgado, paso a paso.' },
  { numero: 4, titulo: 'Seguimiento', descripcion: 'Nos aseguramos de que el acuerdo se cumpla y tu patrimonio quede protegido.' },
];

export const ctaFinal = {
  titulo: 'Cuéntanos qué está pasando.',
  bajada: 'Entre más pronto hablemos, más opciones reales tenemos para tu caso. Sin compromiso, sin letra pequeña.',
  ctaTexto: 'Escríbenos por WhatsApp',
} as const;

export const pie = {
  nota: `${marca.eslogan} · © 2026`,
} as const;
