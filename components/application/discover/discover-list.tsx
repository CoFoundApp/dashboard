"use client"

import { useQuery } from "@apollo/client/react"
import { LIST_PROJECTS, SEARCH_PROJECTS, type ListProjectsResult, type SearchProjectsResult } from "@/graphql/projects"
import DiscoverProjectCard from "./discover-project-card"
import { Inbox, Loader2 } from "lucide-react"
import type { ProjectFilters, SortOption } from "./discover-filters"
import { Card, CardContent } from "@/components/ui/card"

interface DiscoverListProps {
    filters: ProjectFilters;
    sort: SortOption;
}

export default function DiscoverList({ filters, sort }: DiscoverListProps) {
    const useSearchQuery = !!filters.search && filters.search.trim().length > 0;

    const listQuery = useQuery<ListProjectsResult>(LIST_PROJECTS, {
        variables: {
            filters: {
                stages: filters.stages,
                statuses: filters.statuses,
            },
            sort: {
                by: sort.by,
                direction: sort.direction,
            },
        },
        fetchPolicy: "network-only",
        errorPolicy: "all",
        skip: useSearchQuery,
    });

    const searchQuery = useQuery<SearchProjectsResult>(SEARCH_PROJECTS, {
        variables: {
            q: filters.search,
            k: 20,
        },
        fetchPolicy: "network-only",
        errorPolicy: "all",
        skip: !useSearchQuery,
    });

    const { data, loading, error } = useSearchQuery ? searchQuery : listQuery;

    if (loading && !data) {
        return (
            <section className="space-y-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="size-8 animate-spin text-muted-foreground" aria-label="Chargement de vos projets" />
                </div>
            </section>
        );
    }

    if (error || !data) {
        return (
            <section className="space-y-8">
                <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                    <p className="text-destructive" role="alert">
                        Une erreur est survenue lors du chargement de vos projets.
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

    const searchHits = useSearchQuery ? (data as SearchProjectsResult)?.searchProjects || [] : []

    const projects = useSearchQuery
        ? searchHits.map((hit) => hit.project)
        : (data as ListProjectsResult)?.listProjects?.items || []

    const total = useSearchQuery ? searchHits.length : (data as ListProjectsResult)?.listProjects?.total || 0

    if (projects.length === 0) {
        return (
            <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-muted p-4 mb-4">
                        <Inbox className="size-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Aucun projet trouvé</h3>
                    <p className="text-muted-foreground text-sm max-w-md">
                        {useSearchQuery
                            ? "Aucun projet ne correspond à votre recherche. Essayez avec d'autres mots-clés."
                            : "Essayez de modifier vos filtres pour découvrir plus de projets."}
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    {total} projet{total > 1 ? "s" : ""} trouvé{total > 1 ? "s" : ""}
                    {useSearchQuery && <span className="ml-1">(recherche sémantique)</span>}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {useSearchQuery
                    ? searchHits.map((hit) => (
                        <DiscoverProjectCard key={hit.project.id} project={hit.project} score={hit.score} reasons={hit.reasons} />
                        ))
                    : projects.map((project) => <DiscoverProjectCard key={project.id} project={project} />)
                }
            </div>
        </div>
    );
}