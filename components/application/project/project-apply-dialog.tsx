"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GET_PROJECT_POSITIONS, GetProjectPositionsResult } from "@/graphql/projects";
import { useQuery } from "@apollo/client/react";
import { ArrowBigRight, Loader2 } from "lucide-react";
import { useState } from "react";

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
                                {data.listProjectPositions.map((position) => (
                                    <SelectItem value={position.id}>{position.title}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}