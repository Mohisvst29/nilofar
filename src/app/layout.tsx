import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { DataProvider } from "@/context/DataContext";
import { ModalProvider } from "@/context/ModalContext";
import dbConnect from "@/lib/mongodb";
import Content from "@/models/Content";
import { data as defaultData } from "@/data/content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FormsModal from "@/components/FormsModal";
import FloatingButtons from "@/components/FloatingButtons";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cairo = Cairo({ subsets: ["arabic"], variable: "--font-cairo" });

export async function generateMetadata(): Promise<Metadata> {
  const data = await getContent();
  return {
    title: data.seo?.title_ar || "نيلوفر | لاستقطاب الكفاءات والمواهب",
    description: data.seo?.description_ar || "نحن في نيلوفر نقدم حلولاً متكاملة لاستقطاب أفضل المواهب وتوظيف الكفاءات لتعزيز نجاح الشركات في المملكة.",
    keywords: data.seo?.keywords_ar || "توظيف, كفاءات, موارد بشرية, السعودية",
    openGraph: {
      title: data.seo?.title_ar,
      description: data.seo?.description_ar,
      images: [data.images?.hero || "/talent_about.png"],
    },
  };
}

export const revalidate = 0;
export const dynamic = 'force-dynamic';

async function getContent() {
  try {
    await dbConnect();
    const content = await Content.findOne().lean();
    if (!content) {
      const newContent = await Content.create(defaultData);
      return JSON.parse(JSON.stringify(newContent));
    }
    return JSON.parse(JSON.stringify(content));
  } catch (error) {
    console.error("Database connection failed in layout:", error);
    return defaultData;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getContent();
  
  const arFont = data.settings?.arabicFont || "Cairo";
  const enFont = data.settings?.englishFont || "Inter";
  const fontUrl = `https://fonts.googleapis.com/css2?family=${arFont}:wght@400;600;700;800&family=${enFont}:wght@400;600;700;800&display=swap`;

  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="stylesheet" href={fontUrl} />
        <style>{`
          :root {
            --primary: ${data.settings?.primaryColor || "#2563eb"};
            --secondary: ${data.settings?.secondaryColor || "#22c55e"};
            --heading-color: ${data.settings?.headingColor || "#111827"};
            --subheading-color: ${data.settings?.subheadingColor || "#4b5563"};
            --text-color: ${data.settings?.textColor || "#374151"};
          }
          /* Custom CSS override for dynamic branding */
          .bg-blue-600 { background-color: var(--primary) !important; }
          .text-blue-600 { color: var(--primary) !important; }
          .border-blue-600 { border-color: var(--primary) !important; }
          
          .bg-green-500 { background-color: var(--secondary) !important; }
          .text-green-500 { color: var(--secondary) !important; }
          .border-green-500 { border-color: var(--secondary) !important; }
          
          .from-blue-600 { --tw-gradient-from: var(--primary) !important; }
          .to-green-500 { --tw-gradient-to: var(--secondary) !important; }

          /* Dynamic Text Colors */
          h1, h2, h3, .text-gray-900 { color: var(--heading-color) !important; }
          h4, h5, h6, .text-gray-800 { color: var(--subheading-color) !important; }
          p, .text-gray-600, .text-gray-700 { color: var(--text-color) !important; }
        `}</style>
      </head>
      <body
        className={`${inter.variable} ${cairo.variable} antialiased bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 min-h-screen flex flex-col`}
      >
        {/* Dynamic Font applied locally */}
        <LanguageProvider>
          <DataProvider data={data}>
            <ModalProvider>
              <div style={{ fontFamily: "inherit" }} className="font-dynamic flex-grow flex flex-col">
                <Navbar />
                <div className="flex-grow pt-20">
                  {children}
                </div>
                <Footer />
                <FormsModal />
                <FloatingButtons />
              </div>
            </ModalProvider>
          </DataProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
