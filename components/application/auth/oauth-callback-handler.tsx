"use client";

import { COMPLETE_OAUTH, CompleteOAuthResult } from "@/graphql/auth";
import { useMutation } from "@apollo/client/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function OAuthCallbackHandler() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [completeOAuth] = useMutation<CompleteOAuthResult>(COMPLETE_OAUTH);

    useEffect(() => {
        const handleOAuthCallback = async () => {
            const code = searchParams.get("code");
            const state = searchParams.get("state");
            const provider = "Google";

            if (!code) {
                toast.error("Authentification échouée !", {
                    description: "Code d'autorisation manquant.",
                });
                router.push("/login");
                return;
            }

            try {
                const { data } = await completeOAuth({
                    variables: {
                        input: {
                            code,
                            state: state || "",
                            provider
                        },
                    },
                });

                if (data?.completeOAuth) {
                    toast.success("Connexion réussie !", {
                        description: "Vous vous êtes connecté avec succès.",
                    });
                }

                router.push("/");
            } catch (err) {
                toast.error("Authentification échouée !", {
                    description: "Une erreur est survenue.",
                });
                router.push("/login");
            }
        }

        handleOAuthCallback();
    }, [searchParams, completeOAuth, router]);

    return (
        <div className="text-center">
            <div className="space-y-4">
                <p className="text-lg font-semibold">Authentification en cours...</p>
                <p className="text-sm text-muted-foreground">
                    Veuillez patienter pendant que nous finalisons votre connexion.
                </p>
            </div>
        </div>
    );
}
