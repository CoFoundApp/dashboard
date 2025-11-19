import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";

export default function MyProfileEditHeader() {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tight">
                    Modifier mon profil
                </h1>
                <p className="text-base text-muted-foreground">
                    Mettez à jour vos informations personnelles et professionnelles pour optimiser votre présence.
                </p>
            </div>
            <Button asChild>
                <Link href="/profile">
                    <ArrowLeft className="size-4 mr-1" />
                    Retour
                </Link>
            </Button>
        </div>
    );
}