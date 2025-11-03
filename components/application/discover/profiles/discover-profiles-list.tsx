"use client";

import { useQuery } from "@apollo/client/react";
import { ProfileFilters } from "./discover-profiles-filters";
import { SEARCH_PROFILES, SearchProfilesResult } from "@/graphql/profile";
import { Loader2, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import DiscoverProfileCard from "./discover-profile-card";
import { Button } from "@/components/ui/button";

interface DiscoverProfilesListProps {
    filters: ProfileFilters;
}

const LIMIT = 6;

export default function DiscoverProfilesList({ filters }: DiscoverProfilesListProps) {
    const { data, loading, error, fetchMore } = useQuery<SearchProfilesResult>(SEARCH_PROFILES, {
        variables: {
            limit: LIMIT,
            q: filters.search,
        },
        fetchPolicy: "network-only",
        errorPolicy: "all",
        notifyOnNetworkStatusChange: true,
    });

    const handleLoadMore = () => {
        if (!data?.searchProfiles.nextCursor) return;

        fetchMore({
            variables: {
                cursor: data.searchProfiles.nextCursor,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) return previousResult;
                return {
                    searchProfiles: {
                        ...fetchMoreResult.searchProfiles,
                        items: [
                            ...previousResult.searchProfiles.items,
                            ...fetchMoreResult.searchProfiles.items,
                        ],
                    },
                };
            },
        });
    };

    if (loading && !data) {
        return (
            <section className="space-y-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="size-8 animate-spin text-muted-foreground" aria-label="Chargement des profils" />
                </div>
            </section>
        );
    }

    if (error || !data) {
        return (
            <section className="space-y-8">
                <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                    <p className="text-destructive" role="alert">
                        Une erreur est survenue lors du chargement des profils.
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

    const profiles = data.searchProfiles.items;
    const hasNextPage = data.searchProfiles.items.length % LIMIT === 0;

    if (profiles.length === 0) {
        return (
            <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-muted p-4 mb-4">
                        <Users className="size-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Aucun profil trouvé</h3>
                    <p className="text-muted-foreground text-sm max-w-md">
                        Essayez de modifier vos filtres pour découvrir plus de profils.
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {profiles.map((profile) => (
                    <DiscoverProfileCard
                        key={profile.id}
                        profile={profile}
                    />
                ))}
            </div>
            {hasNextPage && (
                <div className="flex justify-center">
                    <Button
                        onClick={handleLoadMore}
                        disabled={loading}
                        variant="outline"
                        size="lg"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 size-4 animate-spin" />
                                Chargement...
                            </>
                        ) : (
                            "Charger plus"
                        )}
                    </Button>
                </div>
            )}
        </div>
    );
}