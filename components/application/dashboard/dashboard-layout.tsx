"use client";

import { useQuery } from "@apollo/client/react";
import DashboardHeader from "./dashboard-header";
import { GET_DASHBOARD, GetDashboardResult } from "@/graphql/dashboard";
import { Loader2 } from "lucide-react";
import DashboardStats from "./dashboard-stats";

export default function DashboardLayout() {
    const { data, loading, error } = useQuery<GetDashboardResult>(GET_DASHBOARD, {
        fetchPolicy: "cache-and-network",
        errorPolicy: "all",
        notifyOnNetworkStatusChange: true,
    });

    if (loading && !data) {
        return (
            <section className="space-y-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="size-8 animate-spin text-muted-foreground" aria-label="Chargement du tableau de bord" />
                </div>
            </section>
        );
    }

    if (error || !data) {
        return (
            <section className="space-y-8">
                <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                    <p className="text-destructive" role="alert">
                        Une erreur est survenue lors du chargement du dashboard.
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
        <section className="space-y-8">
            <DashboardHeader display_name={data.myProfile.display_name} />
            <DashboardStats
                projectsCount={data.listMyProjects.length}
                applicationsCount={data.myApplications.items.length}
                conversationsCount={data.conversationsQuery.length} 
            />
        </section>
    );
}