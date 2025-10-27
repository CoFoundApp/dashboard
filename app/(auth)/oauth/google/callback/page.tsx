import OAuthCallbackHandler from "@/components/application/auth/oauth-callback-handler";
import { Suspense } from "react";

export default function OAuthGoogleCallbackPage() {
    return (
        <Suspense 
            fallback={
                <div className="text-center">
                    <div className="space-y-4">
                        <p className="text-lg font-semibold">Authentification en cours...</p>
                        <p className="text-sm text-muted-foreground">
                            Veuillez patienter pendant que nous finalisons votre connexion.
                        </p>
                    </div>
                </div>
            }
        >
            <OAuthCallbackHandler />
        </Suspense>
    );
}
