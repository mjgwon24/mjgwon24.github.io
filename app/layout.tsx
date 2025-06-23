import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import "../styles/globals.css";

export const metadata = {
    title: "mjgwon24",
    description: "개발을 사랑하는 개발자, 권민지를 소개합니다. 진행했던 다양한 프로젝트, 개발 관련 자료들을 보실 수 있습니다.",
    icons: { icon: '/favicon.ico' },
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="ko">
        <body style={{backgroundColor: 'black'}}>
        <Header />
        <main>{children}</main>
        <Footer />
        </body>
        </html>
    );
}