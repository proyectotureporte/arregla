import Image from 'next/image';
import { WhatsAppButton } from './WhatsAppButton';
import { MENSAJE_WHATSAPP_GENERICO, enlaceWhatsapp, marca, navLinks } from '@/content/sitio';

export function SiteHeader() {
  return (
    <header className="site">
      <div className="bar">
        <a href="#top" className="wordmark">
          <Image src="/logo-icon.png" alt="" width={118} height={100} className="wordmark-icon" priority />
          {marca.nombre}
        </a>
        <nav className="site-nav" aria-label="Secciones de la página">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <WhatsAppButton href={enlaceWhatsapp(MENSAJE_WHATSAPP_GENERICO)} texto="WhatsApp" small />
      </div>
    </header>
  );
}
