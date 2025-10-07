"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GET_PROJECT_POSITIONS, GetProjectPositionsResult } from "@/graphql/projects";
import { useQuery } from "@apollo/client/react";
import { Loader2 } from "lucide-react";

interface ProjectPositionsProps {
    projectId: string;
}

export default function ProjectPositions({ projectId }: ProjectPositionsProps) {
    const { data, loading, error } = useQuery<GetProjectPositionsResult>(GET_PROJECT_POSITIONS, {
        variables: { project_id: projectId },
        fetchPolicy: "cache-and-network",
        errorPolicy: "all",
        notifyOnNetworkStatusChange: true,
    });

    if (loading && !data) {
        return (
            <section className="space-y-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="size-8 animate-spin text-muted-foreground" aria-label="Chargement des membres du projet" />
                </div>
            </section>
        );
    }

    if (error || !data || !data.listProjectPositions) {
        return (
            <section className="space-y-8">
                <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                    <p className="text-destructive" role="alert">
                        Une erreur est survenue lors du chargement des membres du projet.
                    </p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="text-sm underline underline-offset-4"
                    >
                        Réessayer
                    </button>
                </div>
            </section>
        );
    }

    const positions = data.listProjectPositions.filter((position) => position.status === "OPEN");

    const getPlaceholderCount = (count: number) => {
        if (count === 0) return { md: 0, lg: 0 };
        const mdRemainder = count % 2;
        const lgRemainder = count % 3;
        return {
            md: mdRemainder === 0 ? 0 : 2 - mdRemainder,
            lg: lgRemainder === 0 ? 0 : 3 - lgRemainder,
        };
    }

    const placeholderCounts = getPlaceholderCount(positions.length);
    const maxPlaceholders = Math.max(placeholderCounts.md, placeholderCounts.lg);

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Postes recherchés</h2>
            <div className="space-y-4">
                {positions.length === 0 ? (
                    <p className="text-muted-foreground">
                        Aucun poste ajoutée pour le moment.
                    </p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {positions.map((position) => (
                            <Card key={position.id}>
                                <CardHeader>
                                    <CardTitle className="text-base leading-tight">{position.title}</CardTitle>
                                    <CardDescription className="text-sm mt-1 leading-relaxed">
                                        {position.description ? position.description : "Aucun description"}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                        {Array.from({ length: maxPlaceholders }).map((_, index) => (
                            <Card
                                key={`placeholder-${index}`}
                                className={`border-2 border-dashed border-muted-foreground/30 pointer-events-none ${
                                    index < placeholderCounts.md ? "hidden md:block" : "hidden lg:block"
                                }`}
                            >
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}