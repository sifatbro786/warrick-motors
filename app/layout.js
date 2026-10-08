import "./globals.css";
import { jakarta, geist } from "./fonts";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import MotionProvider from "@/components/motion/MotionProvider";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/config/site";
import { getSeoDefaults } from "@/lib/services/seo.service";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/jsonld";

/** Site-wide defaults from the SEO registry; each page adds its own via buildMetadata(). */
export async function generateMetadata() {
    const seo = await getSeoDefaults();
    return {
        metadataBase: new URL(siteConfig.url),
        title: { default: seo.defaultTitle, template: seo.titleTemplate },
        description: seo.description,
        keywords: seo.keywords,
        applicationName: seo.siteName,
        authors: [{ name: siteConfig.legalName }],
        creator: siteConfig.developer.name,
        formatDetection: { telephone: true, address: true, email: true },
        openGraph: { type: "website", siteName: seo.siteName, locale: seo.locale },
        icons: { icon: "/logo.png", apple: "/logo.png" },
    };
}

export const viewport = {
    themeColor: "#0a111e",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en-BD" className={`${jakarta.variable} ${geist.variable} h-full`}>
            <body className="flex min-h-full flex-col" suppressHydrationWarning>
                <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
                <a
                    href="#main"
                    className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-white"
                >
                    Skip to content
                </a>
                <MotionProvider>
                    <SiteHeader />
                    <main id="main" className="flex-1">
                        {children}
                    </main>
                    <SiteFooter />
                    <FloatingWhatsApp />
                </MotionProvider>
            </body>
        </html>
    );
}
