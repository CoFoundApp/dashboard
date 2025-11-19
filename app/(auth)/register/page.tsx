import RegisterForm from "@/components/application/auth/register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CoFound - Inscription",
}

export default function RegisterPage() {
    return <RegisterForm />;
}