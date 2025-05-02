import Header from '@components/layout/Headers/Header';


export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html>
            <body>
                <Header />
                <div id="root">{children}</div>
            </body>
        </html>
    );
}
