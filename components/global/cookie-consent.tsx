"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@apollo/client/react";
import { GET_CURRENT_CONSENTS, SET_MY_CONSENT } from "@/graphql/consent";

export default function CookieConsentBanner() {
    const [showBanner, setShowBanner] = useState(false);
    const { data, loading } = useQuery(GET_CURRENT_CONSENTS);
    const [setConsent] = useMutation(SET_MY_CONSENT);

    useEffect(() => {
        if (!loading && !data?.myCurrentConsents?.length) {
            setShowBanner(true);
        }
    }, [data, loading]);

    const handleConsent = async (consentType: string, granted: boolean) => {
        try {
            await setConsent({
                variables: {
                    input: {
                        consent_type: consentType,
                        granted: granted
                    }
                }
            });
            
            setShowBanner(false);
            
            if (granted) {
                window.location.reload();
            }
        } catch (error) {
            console.error("Erreur lors de l'enregistrement du consentement:", error);
        }
    };

    const handleAcceptAll = async () => {
        await handleConsent("analytics", true);
        await handleConsent("marketing", true);
    };

    const handleRejectAll = async () => {
        await handleConsent("analytics", false);
        await handleConsent("marketing", false);
    };

    if (!showBanner || loading) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-card p-4 border-t shadow-lg z-50">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex-1">
                        <h3 className="font-semibold mb-2">Gestion des cookies</h3>
                        <p className="text-sm text-muted-foreground">
                            Nous utilisons des cookies pour améliorer votre expérience sur CoFound.
                            Les cookies essentiels sont nécessaires au fonctionnement du site.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button onClick={handleRejectAll} variant="outline">
                            Refuser
                        </Button>
                        <Button onClick={handleAcceptAll}>
                            Accepter tout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
