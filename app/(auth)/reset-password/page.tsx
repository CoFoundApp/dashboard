import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResetPasswordPage() {
    return (
        <div className="flex flex-col gap-6 max-w-sm mx-auto">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Réinitialisation du mot de passe</CardTitle>
                    <CardDescription>
                        Remplissez votre nouveau mot de passe avec précaution
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    
                </CardContent>
            </Card>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                En cliquant sur « Continuer », vous acceptez nos <a href="/terms-and-conditions">Conditions d&apos;utilisation</a>{" "}
                et notre <a href="/privacy-policy">Politique de confidentialité</a>.
            </div>
        </div>
    );
}