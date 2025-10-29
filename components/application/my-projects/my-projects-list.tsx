import { IProject } from "@/types";
import MyProjectsCard from "./my-project-card";
import { Lightbulb, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface MyProjectsListProps {
    projects: IProject[];
}

export default function MyProjectsList({ projects }: MyProjectsListProps) {
    if (projects.length === 0) {
        return (
            <div className="text-center py-10 px-6 bg-muted rounded-lg border-2 border-dashed border-muted-foreground/30">
                <div className="flex flex-col items-center space-y-4">
                    <div className="p-4 bg-primary rounded-full">
                        <Lightbulb className="size-8 text-primary-foreground" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-lg md:text-xl font-bold text-foreground">
                            Votre prochaine grande idée commence ici.
                        </h2>
                        <p className="text-muted-foreground">
                            Lancez un projet pour trouver des co-fondateurs ou rejoignez une équipe existante.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                        <Button asChild>
                            <Link href="/my-projects/create">
                                <Plus className="size-4 mr-1" />
                                Créer un projet
                            </Link>
                        </Button>
                        <Button variant="ghost" asChild>
                            <Link href="/discover">
                                Découvrir des projets
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
                <MyProjectsCard key={project.id} project={project} />
            ))}
        </div>
    );
}