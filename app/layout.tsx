import type { Metadata, Viewport } from "next";
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

/* ── Viewport (explicit for audit compliance) ── */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3D1A0A',
};

/* ── Metadata ── */
export const metadata: Metadata = {
  metadataBase: new URL('https://abishaginternationals.com'),
  title: {
    default: "Abishag Home Health Services | Elder Care Chennai",
    template: "%s | Abishag Home Health Services",
  },
  description: "Abishag delivers professional home nursing, physiotherapy, elder daycare, and compassionate caregiver support across Chennai and Tamil Nadu. Trusted by 500+ families.",
  keywords: [
    "home health services chennai", "elder care chennai", "home nursing tamil nadu",
    "physiotherapy at home", "caregiver services", "ICU setup at home",
    "hospice care chennai", "abishag internationals", "senior wellness",
  ],
  alternates: {
    canonical: 'https://abishaginternationals.com',
  },
  openGraph: {
    title: "Abishag Home Health Services | Elder Care Chennai",
    description: "Professional home nursing, physiotherapy, and compassionate caregiver support across Chennai. Trusted by 500+ families.",
    url: 'https://abishaginternationals.com',
    siteName: 'Abishag Home Health Services',
    images: [
      {
        url: '/og_image.png',
        width: 1200,
        height: 630,
        alt: 'Abishag Home Health Services — Compassionate Elder Care in Chennai',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Abishag Home Health Services | Elder Care Chennai",
    description: "Professional home nursing, physiotherapy, and compassionate caregiver support across Chennai.",
    images: ['/og_image.png'],
  },
  icons: {
    icon: "/logo-transparent.webp",
    apple: "/logo-transparent.webp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

/* ── JSON-LD Structured Data ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "MedicalOrganization", "LocalBusiness"],
      "@id": "https://abishaginternationals.com/#organization",
      "name": "Abishag Home Health Services",
      "alternateName": "Abishag Internationals",
      "url": "https://abishaginternationals.com",
      "logo": "https://abishaginternationals.com/logo-transparent.webp",
      "image": "https://abishaginternationals.com/logo-transparent.webp",
      "description": "Professional home nursing, elder daycare, physiotherapy, and compassionate caregiver support across Chennai and Tamil Nadu.",
      "telephone": ["+919940179079", "+917397390266", "+917397390288"],
      "email": "contact@abishaginternationals.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "9/860, Nallathambi Nagar, Natesan 2nd Street",
        "addressLocality": "Medavakam, Chennai",
        "addressRegion": "Tamil Nadu",
        "postalCode": "600100",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 12.916,
        "longitude": 80.197
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      },
      "areaServed": {
        "@type": "City",
        "name": "Chennai"
      },
      "priceRange": "$$",
      "sameAs": [
        "https://instagram.com/abishaginternationals",
        "https://x.com/abishagintl"
      ],
      "medicalSpecialty": [
        "Geriatric Medicine", "Home Health Care", "Palliative Medicine",
        "Nursing", "Physiotherapy"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Home Health Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Caregiver Services" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Skilled Nursing" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Physiotherapy at Home" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "ICU Setup at Home" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hospice & Palliative Care" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Doctor Home Visit" } }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://abishaginternationals.com/#website",
      "url": "https://abishaginternationals.com",
      "name": "Abishag Home Health Services",
      "publisher": { "@id": "https://abishaginternationals.com/#organization" }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://abishaginternationals.com" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://abishaginternationals.com/services" },
        { "@type": "ListItem", "position": 3, "name": "About", "item": "https://abishaginternationals.com/about" },
        { "@type": "ListItem", "position": 4, "name": "Contact", "item": "https://abishaginternationals.com/contact" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What home health services does Abishag provide in Chennai?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Abishag provides 15+ professional home health services across Chennai and Tamil Nadu, including skilled nursing, caregiver support, physiotherapy, ICU setup at home, doctor home visits, hospice and palliative care, lab sample collection, pharmacy delivery, and mental health counseling."
          }
        },
        {
          "@type": "Question",
          "name": "Are your nurses and caregivers certified and background-verified?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Every nurse and caregiver at Abishag is professionally certified, background-verified, and undergoes regular training. Our nursing team holds valid RN/GNM qualifications and our caregivers complete our proprietary training program before being assigned to any patient."
          }
        },
        {
          "@type": "Question",
          "name": "Do you provide 24/7 emergency support?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. Abishag offers round-the-clock emergency support. Our on-call nursing team and care coordinators are available 24 hours a day, 7 days a week, to respond to urgent health situations and ensure your loved ones are never alone in a crisis."
          }
        },
        {
          "@type": "Question",
          "name": "Which areas in Chennai and Tamil Nadu do you serve?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We serve all major areas across Chennai including Medavakam, Velachery, Tambaram, OMR, ECR, Adyar, T. Nagar, Anna Nagar, and surrounding neighborhoods. We also extend our reach to other cities in Tamil Nadu upon request."
          }
        },
        {
          "@type": "Question",
          "name": "How do I book a home health service with Abishag?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can book a service by calling us at +91 99401 79079, messaging us on WhatsApp at +91 73973 90266, or filling out the contact form on our website. Our care coordinator will assess your needs and match you with the right professional within 24 hours."
          }
        },
        {
          "@type": "Question",
          "name": "What is the cost of home nursing services?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our pricing varies depending on the type of service, duration, and level of care required. We offer flexible plans including hourly, daily, and monthly packages. Contact us for a free, no-obligation consultation and customized quote."
          }
        }
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${cormorant.variable} ${nunito.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Skip to Content — Accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>

        {/* Global Animated Background */}
        <AnimatedBackground />

        <Navigation />
        <main id="main-content" className="flex-grow relative" role="main">
          {children}
        </main>
        <Footer />
        <ChatAssistant />
      </body>
    </html>
  );
}
