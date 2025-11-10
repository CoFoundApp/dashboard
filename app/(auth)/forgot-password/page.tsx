import ForgotPasswordForm from "@/components/application/auth/forgot-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CoFound - Mot de passe oublié",
}

export default function ForgotPasswordPage() {
    return <ForgotPasswordForm />;
}