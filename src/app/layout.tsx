import type { Metadata } from 'next';
import './globals.css';
import { Poppins } from 'next/font/google';
import Header from '@components/layout/Header/Header';
import Footer from '@components/layout/Footer/Footer';


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Science Gateway',
  description: 'My app is a 3D website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <Header />
        <div id="root">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
