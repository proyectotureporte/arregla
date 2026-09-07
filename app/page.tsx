import { Aliado } from '@/components/Aliado';
import { Confianza } from '@/components/Confianza';
import { CtaFinal } from '@/components/CtaFinal';
import { Diagnostico } from '@/components/Diagnostico';
import { Equipo } from '@/components/Equipo';
import { Hero } from '@/components/Hero';
import { Interactions } from '@/components/Interactions';
import { Proceso } from '@/components/Proceso';
import { Reconocimiento } from '@/components/Reconocimiento';
import { Servicios } from '@/components/Servicios';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';

// GrainOverlay se quitó el 2026-09-03: Santiago pidió "colores claros,
// blanco" tras seguir viendo la página "opaca apagada" — la textura de
// ruido, por sutil que fuera, iba en contra de ese objetivo. Componente
// documentado sin usar en components/GrainOverlay.tsx (mismo patrón que
// HeroCanvas.tsx), por si se retoma un registro más editorial más adelante.

export default function Home() {
  return (
    <>
      <Interactions />
      <SiteHeader />
      <main>
        <Hero />
        <Reconocimiento />
        <Diagnostico />
        <Aliado />
        <Equipo />
        <Confianza />
        <Servicios />
        <Proceso />
        <CtaFinal />
      </main>
      <SiteFooter />
    </>
  );
}
