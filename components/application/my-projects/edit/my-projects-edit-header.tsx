import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react";
import Link from "next/link"

export default function MyProjectsEditHeader({ projectId }: { projectId: string }) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tight">
                    Modifier votre projet
                </h1>
                <p className="text-base text-muted-foreground">
                    Mettez à jour les informations de votre projet pour attirer de nouveaux co-fondateurs.
                </p>
            </div>
            <Button asChild>
                <Link href={`/my-projects/${projectId}`}>
                    <ArrowLeft className="size-4 mr-1" />
                    Retour
                </Link>
            </Button>
        </div>
    );
}
