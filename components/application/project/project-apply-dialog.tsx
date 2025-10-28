"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { APPLY_TO_PROJECT } from "@/graphql/application";
import { GET_PROJECT_POSITIONS, GetProjectPositionsResult } from "@/graphql/projects";
import { useMutation, useQuery } from "@apollo/client/react";
import { ArrowBigRight, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ProjectApplyDialogProps {
    projectId: string;
}

export default function ProjectApplyDialog({
    projectId
}: ProjectApplyDialogProps) {
    const [open, setOpen] = useState(false);
    const [positionId, setPositionId] = useState("");
    const [note, setNote] = useState("");

    const { data, loading, error } = useQuery<GetProjectPositionsResult>(GET_PROJECT_POSITIONS, {
        variables: { project_id: projectId },
        fetchPolicy: "cache-and-network",
        errorPolicy: "all",
        notifyOnNetworkStatusChange: true,
    });

    const [applyToProject, { loading: applyLoading }] = useMutation(APPLY_TO_PROJECT, {
        onCompleted: () => {
            toast.success("Candidature envoyée !", {
                description: "Votre candidature a été envoyée avec succès.",
            });
            setOpen(false);
            setNote("");
            setPositionId("");
        },
        onError: (error) => {
            toast.error("Oups !", {
                description: "Une erreur est survenue lors de l'envoi de votre candidature.",
            });
        },
    })

    if (loading && !data) {
        return (
            <section className="space-y-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="size-8 animate-spin text-muted-foreground" aria-label="Chargement de votre projet" />
                </div>
            </section>
        );
    }

    if (error || !data || !data.listProjectPositions) {
        return (
            <section className="space-y-8">
                <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                    <p className="text-destructive" role="alert">
                        Une erreur est survenue lors du chargement de votre projet.
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

    const handleSubmit = async () => {
        if (!note.trim() || !positionId) {
            return;
        }

        try {
            await applyToProject({
                variables: {
                    input: {
                        position_id: positionId,
                        project_id: projectId,
                        note: note.trim(),
                    },
                },
            });
        } catch (error) {
            toast.error("Oups !", {
                description: "Une erreur est survenue lors de l'envoi de votre candidature.",
            });
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" className="flex items-center gap-2">
                    <ArrowBigRight className="size-4" />
                    Candidater au projet
                </Button>
            </DialogTrigger>
            <DialogContent className="!w-full !max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Candidateur au projet</DialogTitle>
                </DialogHeader>
                <div className="grid gap-8">
                    <div className="space-y-2">
                        <Label htmlFor="positionId">Poste à candidater</Label>
                        <Select value={positionId} onValueChange={setPositionId}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Sélectionnez un poste à candidater..." />
                            </SelectTrigger>
                            <SelectContent>
                                {positions.map((position) => (
                                    <SelectItem key={position.id} value={position.id}>{position.title}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="note">Message de motivation (optionnel)</Label>
                        <Textarea
                            id="note"
                            placeholder="Expliquez pourquoi vous êtes intéressé par ce poste..."
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            rows={5}
                            className="resize-none"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)} disabled={applyLoading}>
                        Annuler
                    </Button>
                    <Button onClick={handleSubmit} disabled={applyLoading}>
                        {applyLoading ? (
                            <>
                                <Loader2 className="size-4 mr-2 animate-spin" />
                                Envoi...
                            </>
                        ) : (
                            <>
                                <Send className="size-4 mr-2" />
                                Envoyer
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}