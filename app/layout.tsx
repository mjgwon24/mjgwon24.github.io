import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import "../styles/globals.css";

export const metadata = {
    title: "mjgwon24",
    description: "권민지 포트폴리오",
    icons: { icon: '/favicon.ico' },
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="ko">
        <body className="sm:min-w-[768px]" style={{backgroundColor: 'black'}}>
        <Header />
        <main>{children}</main>
        <Footer />
        </body>
        </html>
    );
}