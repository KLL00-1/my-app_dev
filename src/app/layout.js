
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BackgroundWaves from '@/components/Background'
import Footer from "@/components/Footer";
import Start from "@/components/Start";
import Head from "next/head";
import CookieNotice from "@/components/CookieNotice";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
// const geiPoppins = Poppins({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });
const geiRoboto = Roboto({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI-автоматизация и корпоративные AI-решения под ключ",
  description:
    "Разрабатываем индивидуальные AI-решения для бизнеса и производств: AI-мониторинг, предиктивная аналитика, корпоративный AI Hub. Проектирование, разработка и внедрение под ваши процессы.",

  keywords: [
    "AI автоматизация",
    "искусственный интеллект для бизнеса",
    "AI для производства",
    "предиктивная аналитика",
    "компьютерное зрение",
    "AI Hub",
    "AI решения под ключ",
    "автоматизация процессов",
    "AI интеграция",
  ],

  authors: [{ name: "AI Automation Team" }],
  creator: "AI Automation Team",
  publisher: "AI Automation",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "AI-автоматизация и AI-решения под ключ",
    description:
      "Индивидуальные AI-решения для бизнеса и производств: от мониторинга линий сборки до корпоративных AI Hub.",
    type: "website",
    locale: "ru_RU",
    siteName: "AI Automation",
  },

  twitter: {
    card: "summary_large_image",
    title: "AI-автоматизация для бизнеса и производств",
    description:
      "Разработка и внедрение AI-решений под конкретные задачи бизнеса.",
  },

  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    minimumScale: 1,
    userScalable: false,
  },
};



export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=0"
        />
      </Head>
      <body className={`${geiRoboto.variable} ${geiRoboto.variable}`}>
        <CookieNotice />
        <Start />
        <BackgroundWaves />
        <div className='glow'></div>
        <div className="work_space" style={{ position: 'relative', zIndex: 1, color: 'white' }}>
          <Navbar />
          <div className="content_layout" >
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
