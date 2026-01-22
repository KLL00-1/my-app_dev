
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import BackgroundWaves from '../components/Background'
import Footer from "../components/Footer";
import Start from "../components/Start";
import Head from "next/head";
import CookieNotice from "../components/CookieNotice";
import GlobalForm from "../components/GlobalForm";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geiRoboto = Roboto({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
};

export const metadata = {
  metadataBase: new URL("https://ai.astratech.team"),

  title: {
    default: "AI-автоматизация и корпоративные AI-решения под ключ",
    template: "%s | AstraTech AI",
  },

  description:
    "Разрабатываем кастомные AI-решения для бизнеса и производств: компьютерное зрение, предиктивная аналитика, AI Hub, автоматизация процессов под ключ.",

  keywords: [
    "AI автоматизация",
    "искусственный интеллект для бизнеса",
    "AI для производства",
    "AI автоматизация процессов",
    "компьютерное зрение",
    "предиктивная аналитика",
    "корпоративный AI",
    "AI Hub",
    "AI решения под ключ",
  ],

  authors: [{ name: "AstraTech AI Team" }],
  creator: "AstraTech",
  publisher: "AstraTech",

  icons: { icon: '/icon.svg', },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
    yandex: {
      index: true,
      follow: true,
    },
  },

  alternates: {
    canonical: "https://ai.astratech.team",
  },

  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://ai.astratech.team",
    siteName: "AstraTech AI",
    title: "AI-автоматизация и AI-решения под ключ",
    description:
      "Индивидуальные AI-решения для бизнеса и производств: от мониторинга линий сборки до корпоративных AI Hub.",
  },

  twitter: {
    card: "summary_large_image",
    title: "AI-автоматизация для бизнеса | AstraTech",
    description:
      "Разработка и внедрение AI-решений под конкретные задачи бизнеса.",
  },
};


/*
<meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=0"
        />
*/


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <Head>

      </Head>
      <body className={`${geiRoboto.variable} ${geiRoboto.variable}`}>
        <GlobalForm />
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
