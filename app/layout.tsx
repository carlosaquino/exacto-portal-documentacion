import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'EXACTO API — Portal de Documentacion',
  description:
    'Portal de documentacion tecnica para la integracion con EXACTO API, middleware de facturacion electronica compatible con SIFEN (Paraguay).',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Sidebar />
        <main className="lg:ml-72 min-h-screen">
          <div className="max-w-5xl mx-auto px-6 py-10 lg:px-10">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
