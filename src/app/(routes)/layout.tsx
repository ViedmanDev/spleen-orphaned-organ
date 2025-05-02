import Header from '@components/layout/Headers/Header';


export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <div id="root">{children}</div>
        </>
    );
}
