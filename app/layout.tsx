import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  title: 'VALDOCER - Plataforma de Enlaces',
  description: 'Mi espacio digital con todos mis enlaces, redes sociales y contenido favorito en un solo lugar.',
  openGraph: {
    title: 'VALDOCER',
    description: 'Plataforma de Enlaces Personal',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-slate-950 text-slate-50 antialiased">
        {children}
        <Toaster
          theme="dark"
          position="bottom-right"
          richColors
        />
      </body>
    </html>
  );
}