import "./globals.css";
import { jakarta, geist } from "./fonts";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import MotionProvider from "@/components/motion/MotionProvider";
import { siteConfig } from "@/lib/config/site";

export const metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
        default: `${siteConfig.name} — Premium & Direct Imported Cars in Bangladesh`,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    applicationName: siteConfig.name,
    openGraph: {
        type: "website",
        siteName: siteConfig.name,
        locale: siteConfig.locale,
    },
    icons: { icon: "/logo.png", apple: "/logo.png" },
};

export const viewport = {
    themeColor: "#0a111e",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${jakarta.variable} ${geist.variable} h-full`}>
            <body className="flex min-h-full flex-col" suppressHydrationWarning>
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
