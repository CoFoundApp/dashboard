import Banner from "@/components/global/banner";
import CookieConsentBanner from "@/components/global/cookie-consent";
import { FeedbackBubble } from "@/components/global/feedback-bubble";
import { Footer } from "@/components/global/footer";
import { Navbar } from "@/components/global/navbar";

export default function ApplicationLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Banner
                title="Plus ton profil est complet, plus tu as de chances de trouver ton futur associé."
                description="Donne vie à ton profil"
                linkText="ici"
                linkUrl="/my-profile"
            />
            <div className="min-h-screen w-full flex flex-col container mx-auto py-4 px-4 sm:px-8 space-y-8">
                <Navbar />
                <div className="flex-1">
                    {children}
                    <CookieConsentBanner />
                    <FeedbackBubble />
                </div>
                <Footer />
            </div>
        </>
    )
}