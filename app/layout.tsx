import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ChatAssistant from "./components/ChatAssistant";
import AnimatedBackground from "./components/AnimatedBackground";

export const metadata: Metadata = {
  title: "Abhishag - Home Health Services",
  description: "Abhishag provides compassionate home health services and daycare for elderly individuals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {/* Google Fonts — loaded via <link> to avoid PostCSS @import conflict */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Nunito:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
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
