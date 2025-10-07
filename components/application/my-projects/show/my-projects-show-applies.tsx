"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ApplicationStatus, DECIDE_PROJECT_APPLICATION, GET_PROJECT_APPLICATIONS, GetProjectApplicationsResult } from "@/graphql/application";
import { applicationStatusLabels } from "@/lib/utils";
import { useMutation, useQuery } from "@apollo/client/react";
import { Check, FileText, Loader2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface MyProjectsShowAppliesProps {
    projectId: string;
}

export default function MyProjectsShowApplies({ projectId }: MyProjectsShowAppliesProps) {
    const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "ALL">("PENDING");
    const [positionFilter, setPositionFilter] = useState<string>("ALL");
    
    const [decisionDialog, setDecisionDialog] = useState<{
        open: boolean;
        applicationId: string;
        positionId: string;
        status: "ACCEPTED" | "REJECTED";
        applicantName: string;
    } | null>(null);

    const { data, loading, error } = useQuery<GetProjectApplicationsResult>(GET_PROJECT_APPLICATIONS, {
        variables: {
            project_id: projectId,
            status: statusFilter === "ALL" ? undefined : statusFilter,
            position_id: positionFilter === "ALL" ? undefined : positionFilter,
        },
        fetchPolicy: "network-only",
    });

    const [decideApplication, { loading: isDeciding }] = useMutation(DECIDE_PROJECT_APPLICATION, {
        refetchQueries: [
            {
                query: GET_PROJECT_APPLICATIONS,
                variables: { project_id: projectId },
            },
        ],
    });

    if (loading && !data) {
        return (
            <section className="space-y-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="size-8 animate-spin text-muted-foreground" aria-label="Chargement des candidatures du projet" />
                </div>
            </section>
        );
    }

    if (error || !data || !data.projectApplications) {
        return (
            <section className="space-y-8">
                <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                    <p className="text-destructive" role="alert">
                        Une erreur est survenue lors du chargement des candidatures du projet.
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

    const handleDecisionClick = (
        applicationId: string,
        positionId: string,
        status: "ACCEPTED" | "REJECTED",
        applicantName: string,
    ) => {
        setDecisionDialog({
            open: true,
            applicationId,
            positionId,
            status,
            applicantName,
        });
    }

    const handleConfirmDecision = () => {
        if (!decisionDialog) return;

        decideApplication({
            variables: {
                id: decisionDialog.applicationId,
                position_id: decisionDialog.positionId,
                status: decisionDialog.status,
            },
        })
            .then(() => {
                toast.success(decisionDialog.status === "ACCEPTED" ? "Candidature acceptée !" : "Candidature refusée", {
                    description:
                        decisionDialog.status === "ACCEPTED"
                        ? "Le candidat a été accepté avec succès."
                        : "Le candidat a été refusé.",
                })
                setDecisionDialog(null);
            })
            .catch((err: Error) => {
                toast.error("Oups !", {
                    description: err.message || "Une erreur est survenue.",
                });
                setDecisionDialog(null);
            });
    }

    const applications = data?.projectApplications?.items || [];

    const positions = Array.from(new Set(applications.map((app) => app.position.id))).map((id) => {
        const app = applications.find((a) => a.position.id === id)
        return { id, title: app?.position.title || "" }
    });

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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-xl font-bold tracking-tight">Candidatures</h2>
                <div className="flex flex-col md:flex-row gap-2">
                    <Select value={positionFilter} onValueChange={setPositionFilter}>
                        <SelectTrigger className="w-full md:w-fit">
                            <SelectValue placeholder="Tous les postes" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">Tous les postes</SelectItem>
                            {positions.map((position) => (
                                <SelectItem key={position.id} value={position.id}>
                                    {position.title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as ApplicationStatus | "ALL")}>
                        <SelectTrigger className="w-full md:w-fit">
                            <SelectValue placeholder="Statut" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">Tous les statuts</SelectItem>
                            <SelectItem value="PENDING">En attente</SelectItem>
                            <SelectItem value="ACCEPTED">Acceptées</SelectItem>
                            <SelectItem value="REJECTED">Refusées</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="space-y-4">
                {applications.length === 0 ? (
                    <p className="text-muted-foreground">
                        Aucun candidature ajoutée pour le moment.
                    </p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {applications.map((application) => {
                            const isPending = application.status === "PENDING";

                            return (
                                <Card key={application.id}>
                                    <CardHeader>
                                        <div className="flex items-start gap-4">
                                            <Avatar className="size-12">
                                                <AvatarImage src={application.applicant.profile?.avatar_url ?? ""} alt={application.applicant.profile?.display_name} />
                                                <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                                                    {application.applicant.profile?.display_name.charAt(0).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 min-w-0 space-y-3">
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="flex-1 min-w-0">
                                                        <CardTitle className="text-base leading-tight">{application.applicant.profile?.display_name}</CardTitle>
                                                        {application.applicant.profile?.headline && (
                                                            <CardDescription className="text-sm mt-1 leading-relaxed">
                                                                {application.applicant.profile.headline}
                                                            </CardDescription>
                                                        )}
                                                    </div>
                                                    <Badge variant="secondary">
                                                        {applicationStatusLabels[application.status]}
                                                    </Badge>
                                                </div>

                                                <div className="mt-3">
                                                    <Badge variant="outline" className="text-xs">
                                                        <FileText className="size-3 mr-1" />
                                                        {application.position.title}
                                                    </Badge>
                                                </div>

                                                {application.note && (
                                                    <div className="bg-muted/50 rounded-lg p-3 mt-3">
                                                        <p className="text-sm leading-relaxed">{application.note}</p>
                                                    </div>
                                                )}

                                                {isPending && (
                                                    <>
                                                        <Separator />
                                                        <div className="flex gap-2 pt-1">
                                                            <Button
                                                                size="sm"
                                                                className="gap-2"
                                                                onClick={() =>
                                                                    handleDecisionClick(application.id, application.position_id, "ACCEPTED", application.applicant.profile?.display_name)
                                                                }
                                                            >
                                                                <Check className="size-4" />
                                                                Accepter
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="gap-2 bg-transparent"
                                                                onClick={() =>
                                                                    handleDecisionClick(application.id, application.position_id, "REJECTED", application.applicant.profile?.display_name)
                                                                }
                                                            >
                                                                <X className="size-4" />
                                                                Refuser
                                                            </Button>
                                                        </div>
                                                    </>
                                                )}

                                                {application.decided_at && (
                                                    <p className="text-xs text-muted-foreground mt-2">
                                                        Décision prise le {new Date(application.decided_at).toLocaleDateString("fr-FR")}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </CardHeader>
                                </Card>
                            );
                        })}
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
                
                <AlertDialog open={decisionDialog?.open ?? false} onOpenChange={(open) => !open && setDecisionDialog(null)}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                {decisionDialog?.status === "ACCEPTED" ? "Accepter cette candidature ?" : "Refuser cette candidature ?"}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                {decisionDialog?.status === "ACCEPTED" ? (
                                    <>
                                        Vous êtes sur le point d&apos;accepter la candidature de <strong>{decisionDialog?.applicantName}</strong>.
                                        Cette action est définitive.
                                    </>
                                ) : (
                                    <>
                                        Vous êtes sur le point de refuser la candidature de <strong>{decisionDialog?.applicantName}</strong>.
                                        Cette action est définitive.
                                    </>
                                )}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleConfirmDecision}
                                disabled={isDeciding}
                                className={decisionDialog?.status === "REJECTED" ? "bg-destructive hover:bg-destructive/90" : ""}
                            >
                                {isDeciding ? "Traitement..." : decisionDialog?.status === "ACCEPTED" ? "Accepter" : "Refuser"}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}