"use client";

import VerifyEmailInner from "@/components/application/auth/verify-email-inner";
import { Suspense } from "react";

export default function VerifyEmailPage() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center p-4">
                    <div className="flex flex-col items-center gap-4">
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        <p className="text-muted-foreground">
                            Chargement…
                        </p>
                    </div>
                </div>
            }
        >
            <VerifyEmailInner />
        </Suspense>
    );
}
