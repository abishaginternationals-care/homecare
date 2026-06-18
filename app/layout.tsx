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
  title: "Abishag - Home Health Services",
  description: "Abishag provides compassionate home health services and daycare for elderly individuals.",
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
