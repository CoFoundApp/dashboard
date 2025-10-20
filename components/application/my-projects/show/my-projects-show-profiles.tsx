"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { GET_PROFILEs_MATCHES, GetProfilesMatchesResult } from "@/graphql/matches";
import { useQuery } from "@apollo/client/react";
import { ChevronDown, Lightbulb, Loader2, Star } from "lucide-react";

interface MyProjectsShowProfilesProps {
    projectId: string;
}

export default function MyProjectsShowProfiles({ projectId }: MyProjectsShowProfilesProps) {
    const { data, loading, error } = useQuery<GetProfilesMatchesResult>(GET_PROFILEs_MATCHES, {
        variables: {
            input: {
                mode: "BY_PROJECT",
                projectId,
                detailLevel: "BIDIRECTIONAL",
                k: 3
            }
        },
        fetchPolicy: "cache-and-network",
        errorPolicy: "all",
        notifyOnNetworkStatusChange: true,
    });

    if (loading && !data) {
        return (
            <section className="space-y-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="size-8 animate-spin text-muted-foreground" aria-label="Chargement des profils suggérés" />
                </div>
            </section>
        );
    }

    if (error || !data || !data.getBidirectionalProfileMatches) {
        return (
            <section className="space-y-8">
                <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                    <p className="text-destructive" role="alert">
                        Une erreur est survenue lors du chargement des profiles suggérés.
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

    const profiles = data.getBidirectionalProfileMatches.items;

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Profils suggérés</h2>
            <div className="space-y-4">
                {profiles.length === 0 ? (
                    <p className="text-muted-foreground">
                        Aucun profile suggéré pour le moment.
                    </p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {profiles.map((match) => (
                            <Card key={match.profile.id} className="h-fit">
                                <CardHeader>
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 space-y-1">
                                            <CardTitle className="text-lg">{match.profile.display_name}</CardTitle>
                                            <CardDescription>
                                                {match.profile.headline}
                                            </CardDescription>
                                        </div>
                                        <Badge variant="secondary" className="flex items-center gap-1 shrink-0">
                                            <Star className="h-3 w-3" />
                                            {(match.score * 100).toFixed(0)}%
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {match.competitive.uniqueAdvantages.length > 0 && (
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-sm font-medium">
                                                <Lightbulb className="h-4 w-4 text-amber-500" />
                                                <span>Avantages uniques</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {match.competitive.uniqueAdvantages.map((advantage, idx) => (
                                                    <Badge key={idx} variant="outline" className="text-xs">
                                                        {advantage}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {match.contactPlan.length > 0 && (
                                        <Collapsible defaultOpen={false}>
                                            <div className="space-y-2">
                                                <CollapsibleTrigger className="flex w-full items-center justify-between text-sm font-medium hover:underline">
                                                    <span>Plan de contact</span>
                                                    <ChevronDown className="h-4 w-4 transition-transform duration-200 [[data-state=open]_&]:rotate-180" />
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                    <div className="space-y-2 pt-2">
                                                        {match.contactPlan.map((step, idx) => (
                                                            <div key={idx} className="rounded-lg border bg-muted/50 p-3 text-sm space-y-1">
                                                                <div className="font-medium flex items-center gap-2">
                                                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                                                                        {idx + 1}
                                                                    </span>
                                                                    {step.title}
                                                                </div>
                                                                <p className="text-muted-foreground text-xs leading-relaxed pl-7">{step.description}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </CollapsibleContent>
                                            </div>
                                        </Collapsible>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}