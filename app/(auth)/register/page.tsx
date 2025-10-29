import RegisterForm from "@/components/application/auth/register-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CoFound - Inscription",
}

export default function RegisterPage() {
    return (
        <div className="flex flex-col gap-6 max-w-sm mx-auto">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Bienvenue sur CoFound</CardTitle>
                    <CardDescription>
                        Inscrivez-vous avec votre compte Google
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <RegisterForm />
                </CardContent>
            </Card>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                En cliquant sur « Continuer », vous acceptez nos <a href="/terms-and-conditions">Conditions d&apos;utilisation</a>{" "}
                et notre <a href="/privacy-policy">Politique de confidentialité</a>.
            </div>
        </div>
    );
}