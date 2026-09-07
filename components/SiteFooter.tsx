import Image from 'next/image';
import { WhatsAppIcon } from './WhatsAppIcon';
import {
  MENSAJE_WHATSAPP_GENERICO,
  WHATSAPP_TELEFONO_DISPLAY,
  enlaceWhatsapp,
  marca,
  navLinks,
  pie,
} from '@/content/sitio';

export function SiteFooter() {
  return (
    <footer className="site">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="wordmark">
            <Image src="/logo-icon.png" alt="" width={118} height={100} className="wordmark-icon" />
            {marca.nombre}
          </span>
          <p className="footer-tagline">{marca.eslogan}</p>
        </div>
        <nav className="footer-links" aria-label="Secciones de la página">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="footer-contacto">
          <span className="footer-contacto-label">Escríbenos</span>
          <a className="footer-whatsapp" href={enlaceWhatsapp(MENSAJE_WHATSAPP_GENERICO)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            {WHATSAPP_TELEFONO_DISPLAY}
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span className="footer-note">{pie.nota}</span>
      </div>
    </footer>
  );
}
