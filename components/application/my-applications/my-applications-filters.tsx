"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ApplicationStatus } from "@/graphql/application";

interface MyApplicationsFiltersProps {
    statusFilter: ApplicationStatus | "ALL"
    setStatusFilter: (status: ApplicationStatus | "ALL") => void
}

export default function MyApplicationsFilters({ statusFilter, setStatusFilter }: MyApplicationsFiltersProps) {
    return (
        <Tabs value={statusFilter} onValueChange={(value) => setStatusFilter(value as ApplicationStatus | "ALL")}>
            <TabsList>
                <TabsTrigger value="ALL">Toutes</TabsTrigger>
                <TabsTrigger value="PENDING">En attente</TabsTrigger>
                <TabsTrigger value="ACCEPTED">Acceptées</TabsTrigger>
                <TabsTrigger value="REJECTED">Refusées</TabsTrigger>
                <TabsTrigger value="WITHDRAWN">Retirées</TabsTrigger>
            </TabsList>
        </Tabs>
    );
}