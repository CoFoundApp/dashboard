import IntroductionForm from "@/components/application/introduction/introduction-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CoFound - Introduction",
}

export default function IntroductionPage() {
    return (
        <IntroductionForm />
    );
}