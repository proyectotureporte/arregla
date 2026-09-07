import { WhatsAppIcon } from './WhatsAppIcon';

interface WhatsAppButtonProps {
  href: string;
  texto: string;
  /** Pequeño (header) vs. tamaño normal — no lleva el anillo pulsante. */
  small?: boolean;
  /** El anillo pulsante solo debe estar en los 1-2 botones de mayor jerarquía por vista, no en los 6 a la vez. */
  conAnillo?: boolean;
  className?: string;
}

export function WhatsAppButton({ href, texto, small, conAnillo, className }: WhatsAppButtonProps) {
  const clases = ['btn-wa', small ? 'small' : '', className ?? ''].filter(Boolean).join(' ');
  return (
    <a className={clases} href={href} target="_blank" rel="noopener noreferrer">
      {conAnillo ? <span className="ring" aria-hidden="true" /> : null}
      <WhatsAppIcon />
      {texto}
    </a>
  );
}
