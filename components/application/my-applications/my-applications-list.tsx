"use client";

import { Button } from "@/components/ui/button";
import { ApplicationStatus, GET_MY_APPLICATIONS, GetMyApplicationsResult } from "@/graphql/application";
import { IProjectApplication } from "@/types";
import { useQuery } from "@apollo/client/react";
import { Box, Loader2 } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import MyApplicationCard from "./my-application-card";

interface MyApplicationsListProps {
    statusFilter: ApplicationStatus | "ALL"
}

export default function MyApplicationsList({ statusFilter }: MyApplicationsListProps) {
    const { data, loading, error } = useQuery<GetMyApplicationsResult>(GET_MY_APPLICATIONS, {
        fetchPolicy: "network-only",
        errorPolicy: "all",
        variables: {
            limit: 50,
        },
    });

    const filteredApplications = useMemo(() => {
        const applications = data?.myApplications?.items as IProjectApplication[] | undefined;
        if (!applications) return [];
        if (statusFilter === "ALL") return applications;
        return applications.filter((app) => app.status === statusFilter);
    }, [data?.myApplications?.items, statusFilter]);

    if (loading && !data) {
        return (
            <section className="space-y-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="size-8 animate-spin text-muted-foreground" aria-label="Chargement de vos candidatures" />
                </div>
            </section>
        );
    }

    if (error || !data || !data?.myApplications) {
        return (
            <section className="space-y-8">
                <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                    <p className="text-destructive" role="alert">
                        Une erreur est survenue lors du chargement de vos candidatures.
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

    if (data.myApplications.items.length === 0) {
        return (
            <div className="text-center py-10 px-6 bg-muted rounded-lg border-2 border-dashed border-muted-foreground/30">
                <div className="flex flex-col items-center space-y-4">
                    <div className="p-4 bg-primary rounded-full">
                        <Box className="size-8 text-primary-foreground" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-lg md:text-xl font-bold text-foreground">
                            Aucune candidature pour le moment
                        </h2>
                        <p className="text-muted-foreground">
                            Explorez les projets disponibles et postulez pour rejoindre une équipe qui vous inspire.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
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
            {filteredApplications.map(application => (
                <MyApplicationCard key={application.id} application={application} />
            ))}
        </div>
    );
}