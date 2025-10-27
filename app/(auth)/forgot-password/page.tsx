import ForgotPasswordForm from "@/components/application/auth/forgot-password-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ForgotPasswordPage() {
    return (
        <div className="flex flex-col gap-6 max-w-sm mx-auto">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Mot de passe oublié</CardTitle>
                    <CardDescription>
                        Remplissez votre adresse e-mail et vous recevrez un lien de réinitialisation
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ForgotPasswordForm />
                </CardContent>
            </Card>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                En cliquant sur « Continuer », vous acceptez nos <a href="/terms-and-conditions">Conditions d&apos;utilisation</a>{" "}
                et notre <a href="/privacy-policy">Politique de confidentialité</a>.
            </div>
        </div>
    );
}