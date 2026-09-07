import { WhatsAppButton } from './WhatsAppButton';
import { MENSAJE_WHATSAPP_GENERICO, ctaFinal, enlaceWhatsapp } from '@/content/sitio';

export function CtaFinal() {
  return (
    <section className="cta-final reveal">
      <div className="container">
        <h2>{ctaFinal.titulo}</h2>
        <p>{ctaFinal.bajada}</p>
        <WhatsAppButton href={enlaceWhatsapp(MENSAJE_WHATSAPP_GENERICO)} texto={ctaFinal.ctaTexto} conAnillo />
      </div>
    </section>
  );
}
