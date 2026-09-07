import type { Metadata } from 'next';
import { Bricolage_Grotesque, Hanken_Grotesk } from 'next/font/google';
import { marca } from '@/content/sitio';
import './globals.css';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-bricolage',
  display: 'swap',
});

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hanken',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${marca.nombre} — ${marca.eslogan}`,
  description:
    'Ayudamos a personas y empresas en Colombia a proteger su vivienda, vehículo o negocio ante embargos, secuestros y remates. Somos el aliado del deudor, no del acreedor.',
  icons: {
    icon: '/logo-icon.png',
    apple: '/logo-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning en html/body: algunas extensiones de navegador
    // (gestores de contraseñas, correctores, etc.) inyectan atributos como
    // data-qb-installed o mouseup_handler en <html>/<body> antes de que
    // React hidrate. Next.js recomienda esto exactamente para ese caso — no
    // es un bug del sitio, es DOM ajeno que React no controla.
    <html lang="es" className={`${bricolage.variable} ${hanken.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
