import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SUGGEST_PROFILES_FOR_ME, SuggestProfilesForMeResult } from "@/graphql/matches";
import { useQuery } from "@apollo/client/react";
import { Lightbulb, Loader2, Star } from "lucide-react";
import Link from "next/link";

export default function DashboardSuggestProfiles() {
    const { data, loading, error } = useQuery<SuggestProfilesForMeResult>(SUGGEST_PROFILES_FOR_ME, {
        variables: {
            limit: 3,
        },
        fetchPolicy: "cache-and-network",
        errorPolicy: "all",
        notifyOnNetworkStatusChange: true,
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

    if (error || !data || !data.suggestProfilesForMe) {
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

    const profiles = data.suggestProfilesForMe;
    
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Profils qui pourraient vous plaire</h2>
            <div className="space-y-4">
                {profiles.length === 0 ? (
                    <p className="text-muted-foreground">
                        Aucun profil suggéré pour le moment.
                    </p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {profiles.map((match) => (
                            <Link key={match.profile.id} href={`/profile/${match.profile.id}`}>
                                <Card className="h-fit">
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
                                    <CardContent>
                                        {match.reasons.length > 0 && (
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-sm font-medium">
                                                    <Lightbulb className="h-4 w-4 text-amber-500" />
                                                    <span>Avantages uniques</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {match.reasons.map((reason, idx) => (
                                                        <Badge key={idx} variant="outline" className="text-xs">
                                                            {reason}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}