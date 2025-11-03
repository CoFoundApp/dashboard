"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CLOSE_PROJECT_POSITION, GET_PROJECT_POSITIONS, GetProjectPositionsResult } from "@/graphql/projects";
import { useMutation, useQuery } from "@apollo/client/react";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import MyProjectsShowPositionForm from "./my-projects-show-position-form";

interface MyProjectsShowPositionsProps {
    projectId: string;
}

export default function MyProjectsShowPositions({ projectId }: MyProjectsShowPositionsProps) {
    const { data, loading, error } = useQuery<GetProjectPositionsResult>(GET_PROJECT_POSITIONS, {
        variables: { project_id: projectId },
        fetchPolicy: "cache-and-network",
        errorPolicy: "all",
        notifyOnNetworkStatusChange: true,
    });

    const [closeProjectPosition, { loading: closing }] = useMutation(CLOSE_PROJECT_POSITION, {
        refetchQueries: [{ query: GET_PROJECT_POSITIONS, variables: { project_id: projectId } }],
        onCompleted: () => {
            toast.success("Poste retirée", {
                description: "Votre poste a été retirée avec succès.",
            });
        },
        onError: (error) => {
            toast.error("Oups !", {
                description: "Une erreur est survenue lors du retrait de votre poste.",
            });
        },
    });

    const handleClose = (e: React.MouseEvent, positionId: string) => {
        e.stopPropagation()
        closeProjectPosition({
            variables: { id: positionId },
        })
    }

    if (loading && !data) {
        return (
            <section className="space-y-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="size-8 animate-spin text-muted-foreground" aria-label="Chargement des postes du projet" />
                </div>
            </section>
        );
    }

    if (error || !data || !data.listProjectPositions) {
        return (
            <section className="space-y-8">
                <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                    <p className="text-destructive" role="alert">
                        Une erreur est survenue lors du chargement des postes du projet.
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
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-bold tracking-tight">Postes recherchés</h2>
                <MyProjectsShowPositionForm projectId={projectId} />
            </div>
            <div className="space-y-4">
                {positions.length === 0 ? (
                    <p className="text-muted-foreground">
                        Aucun poste ajoutée pour le moment.
                    </p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {positions.map((position) => (
                            <Card key={position.id}>
                                <CardHeader className="flex justify-between items-center gap-4">
                                    <div>
                                        <CardTitle className="text-base leading-tight">{position.title}</CardTitle>
                                        <CardDescription className="text-sm mt-1 leading-relaxed">
                                            {position.description ? position.description : "Aucun description"}
                                        </CardDescription>
                                    </div>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="size-8 shrink-0"
                                                onClick={(e) => e.stopPropagation()}
                                                disabled={false}
                                            >
                                                <Trash2 className="size-4 text-destructive" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Retirer votre poste ?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Êtes-vous sûr de vouloir retirer le poste {" "}
                                                    <span className="font-medium">{position.title}</span> ?{" "}
                                                    Cette action est irréversible.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel onClick={(e) => e.stopPropagation()}>Annuler</AlertDialogCancel>
                                                <AlertDialogAction onClick={(e) => handleClose(e, position.id)} disabled={closing}>
                                                    {closing ? "Retrait..." : "Retirer"}
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
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