import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import dynamic from "next/dynamic";
import { Cormorant_Garamond, Nunito } from "next/font/google";

const ChatAssistant = dynamic(() => import("./components/ChatAssistant"));
const AnimatedBackground = dynamic(() => import("./components/AnimatedBackground"));

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap"
});

const nunito = Nunito({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700", "800"], 
  style: ["normal", "italic"],
  variable: "--font-nunito",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL('https://abishaginternationals.com'),
  title: {
    default: "Abishag Home Health Services | Compassionate Elder Care in Chennai",
    template: "%s | Abishag Home Health Services",
  },
  description: "Abishag provides professional, compassionate home health services, skilled nursing, and elderly daycare in Chennai. Care that feels like family.",
  keywords: ["home health services", "elder care chennai", "home nursing services", "hospice care", "abishag internationals"],
  openGraph: {
    title: "Abishag Home Health Services | Compassionate Elder Care",
    description: "Professional, compassionate home health services and skilled nursing in Chennai.",
    url: 'https://abishaginternationals.com',
    siteName: 'Abishag Home Health',
    images: [
      {
        url: '/logo-transparent.webp',
        width: 800,
        height: 800,
        alt: 'Abishag Home Health Services',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Abishag Home Health Services",
    description: "Professional, compassionate home health services and skilled nursing in Chennai.",
    images: ['/logo-transparent.webp'],
  },
  icons: {
    icon: "/logo-transparent.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${cormorant.variable} ${nunito.variable}`}>
      <body className="min-h-full flex flex-col">
        {/* Global Animated Background */}
        <AnimatedBackground />

        <Navigation />
        <main className="flex-grow relative">
          {children}
        </main>
        <Footer />
        <ChatAssistant />
      </body>
    </html>
  );
}
