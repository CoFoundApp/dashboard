"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DELETE_PROJECT, LEAVE_PROJECT, ProjectStage, ProjectStatus } from "@/graphql/projects";
import { projectStageLabels, projectStatusLabels } from "@/lib/utils";
import { DoorClosed, Edit, Trash2, X } from "lucide-react";
import ProjectApplyDialog from "./project-apply-dialog";
import { useMutation } from "@apollo/client/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import Link from "next/link";

interface ProjectHeaderProps {
    projectId: string;
    title: string;
    summary: string;
    avatar_url: string | null;
    industry: string | null;
    stage: ProjectStage;
    status: ProjectStatus;
    isRemovable?: boolean;
    isEditable?: boolean;
    isCandidate?: boolean;
    isContactable?: boolean;
    isLeavable?: boolean;
}

export default function ProjectHeader({
    projectId,
    title,
    summary,
    avatar_url,
    industry,
    stage,
    status,
    isRemovable = false,
    isEditable = false,
    isCandidate = false,
    isLeavable = false,
}: ProjectHeaderProps) {
    const router = useRouter();
    const [deleteProject, { loading: deleting }] = useMutation(DELETE_PROJECT);
    const [leaveProject, { loading: leaving }] = useMutation(LEAVE_PROJECT);

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        deleteProject({
            variables: {
                id: projectId
            }
        })
            .then(() => {
                router.push("/my-projects");
                toast.success("Projet supprimé !", {
                    description: "Vous avez supprimé votre projet avec succès.",
                });
            })
            .catch((err: Error) => {
                console.log(err)
                toast.error("Oups !", {
                    description: err.message || "Une erreur est survenue.",
                });
            })
    }

    const handleLeave = (e: React.MouseEvent) => {
        e.stopPropagation();
        leaveProject({
            variables: {
                project_id: projectId
            }
        })
            .then(() => {
                router.push("/my-projects");
                toast.success("Projet quitté !", {
                    description: "Vous avez quitté le projet avec succès.",
                });
            })
            .catch((err: Error) => {
                toast.error("Oups !", {
                    description: err.message || "Une erreur est survenue.",
                });
            })
    }

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-center gap-8">
                <Avatar className="size-20">
                    <AvatarImage src={`${avatar_url}`} alt={title} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
                        {title.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">
                            {title}
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            {summary}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        {industry && <Badge variant="secondary">{industry}</Badge>}
                        <Badge variant="outline">{projectStageLabels[stage]}</Badge>
                        <Badge variant="outline">{projectStatusLabels[status]}</Badge>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-4">
                {isLeavable && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button 
                                variant="ghost" 
                                className="text-destructive hover:text-destructive"
                                onClick={(e) => e.stopPropagation()}
                                disabled={deleting}
                            >
                                <DoorClosed className="size-4 mr-1 text-destructive" />
                                Quitter le projet
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Quitter le projet ?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Êtes-vous sûr de vouloir quitter le projet ? Cette action est irréversible.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={(e) => e.stopPropagation()}>Annuler</AlertDialogCancel>
                                <AlertDialogAction onClick={handleLeave} disabled={leaving}>
                                    {leaving ? "Chargement..." : "Quitter"}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}
                {isRemovable && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button 
                                variant="ghost" 
                                className="text-destructive hover:text-destructive"
                                onClick={(e) => e.stopPropagation()}
                                disabled={deleting}
                            >
                                <Trash2 className="size-4 mr-1 text-destructive" />
                                Supprimer le projet
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Supprimer votre projet ?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Êtes-vous sûr de vouloir supprimer votre projet ? Cette action est irréversible.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={(e) => e.stopPropagation()}>Annuler</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete} disabled={deleting}>
                                    {deleting ? "Suppression..." : "Supprimer"}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}
                {isEditable && (
                    <Button asChild>
                        <Link href={`/my-projects/${projectId}/edit`}>
                            <Edit className="size-4 mr-1" />
                            Modifier le projet
                        </Link>
                    </Button>
                )}
                {isCandidate && (
                    <ProjectApplyDialog projectId={projectId} />
                )}
            </div>
        </div>
    );
}