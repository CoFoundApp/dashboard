import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/providers/providers";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

const siteUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL || "";

export const metadata: Metadata = {
    title: "CoFound",
    description: "La plateforme qui connecte porteurs de projets, développeurs, designers et autres. Trouvez vos co-fondateurs grâce à notre matching IA et donnez vie à vos idées de startup.",
    openGraph: {
        title: "CoFound : Trouvez vos associés et lancez votre projet",
        description: "La plateforme pour transformer vos idées en startups à succès.",
        url: siteUrl,
        siteName: "CoFound",
        images: [
            {
                url: `${siteUrl}/imports/logo.png`, 
                width: 1200,
                height: 630,
                alt: "Illustration de la plateforme CoFound",
            },
        ],
        locale: "fr_FR",
        type: "website"
    },
    icons: {
        icon: "/favico.ico",
    },
    metadataBase: new URL(siteUrl),
    alternates: {
        canonical: "/",
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
        }
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body
                className={cn(
                    "min-h-screen font-sans antialiased",
                    fontSans.variable,
                )}
            >
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
