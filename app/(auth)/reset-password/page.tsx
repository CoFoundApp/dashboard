import ResetPasswordForm from "@/components/application/auth/reset-password-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CoFound - Réinitialisation du mot de passe",
}

interface ResetPasswordPageProps {
  searchParams: Promise<{ token?: string }>
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
    const params = await searchParams;
    const token = params.token;

    if (!token) {
        return (
            <div className="flex flex-col gap-6 max-w-sm mx-auto">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Lien invalide</CardTitle>
                        <CardDescription>Le lien de réinitialisation est invalide ou a expiré.</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    return <ResetPasswordForm token={token} />
}
