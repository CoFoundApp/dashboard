import CookieConsentBanner from "@/components/global/cookie-consent";
import { Footer } from "@/components/global/footer";
import { Navbar } from "@/components/global/navbar";

export default function ApplicationLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen w-full flex flex-col container mx-auto py-4 px-4 sm:px-8 space-y-8">
            <Navbar />
            <div className="flex-1">
                {children}
                <CookieConsentBanner />
            </div>
            <Footer />
        </div>
    )
}