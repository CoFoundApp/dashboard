import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function MyProjectsHeader() {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tight">
                    Mes projets
                </h1>
                <p className="text-base text-muted-foreground">
                    Créez, organisez et suivez l&apos;avancement de tous vos projets au même endroit.
                </p>
            </div>
            <Button>
                <Plus className="size-4 mr-1" />
                Créer un projet
            </Button>
        </div>
    );
}