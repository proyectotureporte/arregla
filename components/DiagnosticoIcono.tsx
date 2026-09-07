import { Building2, Car, CircleHelp, Home } from 'lucide-react';
import type { SituacionDiagnostico } from '@/lib/types';

/**
 * 2026-09-03: Santiago dijo "los iconos están horrible" — eran trazos SVG
 * dibujados a mano, coordenada por coordenada, sin herramienta de diseño
 * para verificar proporción. Se reemplazan por lucide-react (set consistente,
 * usado por Vercel/shadcn y buena parte del fintech serio) en vez de
 * intentar corregir los paths a mano otra vez — mismo criterio que ya
 * aplicamos con el resto del sitio: menos artesanal, más consistente.
 */
const ICONOS = {
  casa: Home,
  carro: Car,
  negocio: Building2,
  otro: CircleHelp,
} as const;

export function DiagnosticoIcono({ tipo }: { tipo: SituacionDiagnostico['icono'] }) {
  const Icono = ICONOS[tipo];
  return (
    <span className="diag-icon-badge" aria-hidden="true">
      <Icono size={24} strokeWidth={2.2} />
    </span>
  );
}
