import type { Metadata } from 'next';

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
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
