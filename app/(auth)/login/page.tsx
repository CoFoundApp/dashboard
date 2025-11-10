import LoginForm from "@/components/application/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CoFound - Connexion",
}

export default function LoginPage() {
    return <LoginForm />;
}