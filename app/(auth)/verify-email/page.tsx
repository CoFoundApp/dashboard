"use client"

import { useEffect, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useMutation } from "@apollo/client/react"
import { VERIFY_EMAIL, type VerifyEmailResult } from "@/graphql/auth"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export default function VerifyEmailPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");

    const calledRef = useRef(false);

    const [verifyEmail] = useMutation<VerifyEmailResult>(VERIFY_EMAIL);

    useEffect(() => {
        if (!token || calledRef.current) return;
        calledRef.current = true;

        verifyEmail({ variables: { token } })
            .then((res) => {
                if (res.data?.verifyEmail) {
                    toast.success("Adresse e-mail vérifiée !", {
                        description: "Votre compte est maintenant confirmé.",
                    });
                } else {
                    toast.error("Adresse e-mail non-vérifiée !", {
                        description: "La vérification a échoué.",
                    });
                }
                setTimeout(() => {
                    router.push("/login");
                }, 1000);
            })
            .catch((e) => {
                console.error(e);
                toast.error("Erreur de vérification", {
                    description: "Une erreur est survenue lors de la vérification.",
                });
                setTimeout(() => {
                    router.push("/login");
                }, 1000);
            });
    }, [token, verifyEmail, router]);

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Vérification de votre adresse e-mail en cours…</p>
            </div>
        </div>
    );
}
