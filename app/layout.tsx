import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import "../styles/globals.css";

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="ko">
        <body>
        <Header />
        <main>{children}</main>
        <Footer />
        </body>
        </html>
    );
}