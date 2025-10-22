"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { GET_PROFILEs_MATCHES, type GetProfilesMatchesResult } from "@/graphql/matches"
import { useQuery } from "@apollo/client/react"
import { Info, Lightbulb, Loader2, Star, TrendingUp, AlertCircle, Target } from "lucide-react"
import { useState } from "react"

interface MyProjectsShowProfilesProps {
    projectId: string;
}

const translations: Record<string, string> = {
    technical: "Technique",
    culture: "Culture",
    team: "Équipe",
    logistics: "Logistique",
    experience: "Expérience",
    semantic: "Sémantique",

    score: "Score",
    confidence: "Confiance",
    strengths: "Forces",
    gaps: "Lacunes",
    recommendations: "Recommandations",
    chemistry: "Compatibilité",

    low: "Faible",
    medium: "Moyen",
    high: "Élevé",
    "very high": "Très élevé",
}

const translate = (key: string): string => {
    if (!key) return "";
    const lowerKey = key.toLowerCase();
    return translations[lowerKey] || key;
}

export default function MyProjectsShowProfiles({ projectId }: MyProjectsShowProfilesProps) {
    const [selectedProfile, setSelectedProfile] = useState<any>(null);

    const { data, loading, error } = useQuery<GetProfilesMatchesResult>(GET_PROFILEs_MATCHES, {
        variables: {
            input: {
                mode: "BY_PROJECT",
                projectId,
                detailLevel: "BIDIRECTIONAL",
                k: 3,
            },
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
                    <button onClick={() => window.location.reload()} className="text-sm underline underline-offset-4">
                        Réessayer
                    </button>
                </div>
            </section>
        );
    }

    const profiles = data.getBidirectionalProfileMatches.items

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Profils suggérés</h2>
            <div className="space-y-4">
                {profiles.length === 0 ? (
                    <p className="text-muted-foreground">Aucun profile suggéré pour le moment.</p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {profiles.map((match) => (
                            <Card key={match.profile.id} className="h-fit">
                                <CardHeader>
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 space-y-1">
                                            <CardTitle className="text-lg">{match.profile.display_name}</CardTitle>
                                            <CardDescription>{match.profile.headline}</CardDescription>
                                        </div>
                                        <Badge variant="secondary" className="flex items-center gap-1 shrink-0">
                                            <Star className="h-3 w-3" />
                                            {(match.score * 100).toFixed(0)}%
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full bg-transparent"
                                                onClick={() => setSelectedProfile(match)}
                                            >
                                                <Info className="h-4 w-4 mr-2" />
                                                En savoir plus
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                                            <DialogHeader>
                                                <DialogTitle className="text-2xl">{match.profile.display_name}</DialogTitle>
                                                <DialogDescription>{match.profile.headline}</DialogDescription>
                                            </DialogHeader>

                                            <div className="space-y-6 mt-4">
                                                <div className="space-y-3 rounded-lg border bg-muted/30 p-4">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-muted-foreground">Score de matching</span>
                                                        <span className="text-lg font-bold">{(match.score * 100).toFixed(0)}%</span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-muted-foreground">Probabilité de succès</span>
                                                        <span className="text-lg font-bold">{(match.successProbability * 100).toFixed(0)}%</span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-muted-foreground">Confiance</span>
                                                        <span className="text-lg font-bold">{(match.successConfidence * 100).toFixed(0)}%</span>
                                                    </div>
                                                </div>

                                                {match.dimensionScores && match.dimensionScores.length > 0 && (
                                                    <div className="space-y-3">
                                                        <h3 className="font-semibold flex items-center gap-2">
                                                            <Target className="h-4 w-4" />
                                                            Scores par dimension
                                                        </h3>
                                                        <div className="space-y-4">
                                                            {match.dimensionScores.map((dim) => (
                                                                <div key={dim.key} className="space-y-2">
                                                                    <div className="flex items-center justify-between">
                                                                        <span className="text-sm font-medium">{translate(dim.key)}</span>
                                                                        <Badge variant="secondary">{(dim.score * 100).toFixed(0)}%</Badge>
                                                                    </div>
                                                                    <Progress value={dim.score * 100} className="h-2" />

                                                                    {dim.strengths && dim.strengths.length > 0 && (
                                                                        <div className="pl-4 space-y-1">
                                                                            <p className="text-xs font-medium text-muted-foreground">Forces:</p>
                                                                            <ul className="text-xs text-muted-foreground space-y-0.5">
                                                                                {dim.strengths.map((strength, idx) => (
                                                                                    <li key={idx}>• {strength}</li>
                                                                                ))}
                                                                            </ul>
                                                                        </div>
                                                                    )}

                                                                    {dim.gaps && dim.gaps.length > 0 && (
                                                                        <div className="pl-4 space-y-1">
                                                                            <p className="text-xs font-medium text-muted-foreground">Lacunes:</p>
                                                                            <ul className="text-xs text-muted-foreground space-y-0.5">
                                                                                {dim.gaps.map((gap, idx) => (
                                                                                    <li key={idx}>• {gap}</li>
                                                                                ))}
                                                                            </ul>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {match.forces && match.forces.length > 0 && (
                                                    <div className="space-y-3">
                                                        <h3 className="font-semibold flex items-center gap-2">
                                                            <TrendingUp className="h-4 w-4" />
                                                            Points forts
                                                        </h3>
                                                        <div className="space-y-2">
                                                            {match.forces.map((force, idx) => (
                                                                <div key={idx} className="rounded-lg border bg-muted/30 p-3 space-y-1">
                                                                    <div className="flex items-center gap-2">
                                                                        <Badge variant="outline" className="text-xs">
                                                                            {translate(force.dimension)}
                                                                        </Badge>
                                                                        <span className="text-sm font-medium">{force.label}</span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {match.gaps && match.gaps.length > 0 && (
                                                    <div className="space-y-3">
                                                        <h3 className="font-semibold flex items-center gap-2">
                                                            <AlertCircle className="h-4 w-4" />
                                                            Points à améliorer
                                                        </h3>
                                                        <div className="space-y-2">
                                                            {match.gaps.map((gap, idx) => (
                                                                <div key={idx} className="rounded-lg border bg-muted/30 p-3 space-y-2">
                                                                    <div className="flex items-center gap-2">
                                                                        <Badge variant="outline" className="text-xs">
                                                                            {translate(gap.dimension)}
                                                                        </Badge>
                                                                        <Badge variant="secondary" className="ml-auto text-xs">
                                                                            Impact: {gap.impact}/10
                                                                        </Badge>
                                                                    </div>
                                                                    {gap.label && <span className="text-sm font-medium">{gap.label}</span>}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {match.recommendations && match.recommendations.length > 0 && (
                                                    <div className="space-y-3">
                                                        <h3 className="font-semibold flex items-center gap-2">
                                                            <Lightbulb className="h-4 w-4" />
                                                            Recommandations
                                                        </h3>
                                                        <div className="space-y-2">
                                                            {match.recommendations
                                                                .sort((a, b) => b.priority - a.priority)
                                                                .map((rec, idx) => (
                                                                    <div key={idx} className="rounded-lg border bg-muted/30 p-3 space-y-2">
                                                                        <div className="flex items-start justify-between gap-2">
                                                                            <div className="flex-1 space-y-2">
                                                                                <div className="flex items-center gap-2 mb-1">
                                                                                    <Badge variant="outline" className="text-xs">
                                                                                        {translate(rec.dimension)}
                                                                                    </Badge>
                                                                                </div>
                                                                            </div>
                                                                            <Badge variant="secondary" className="text-xs shrink-0">
                                                                                Priorité {rec.priority}
                                                                            </Badge>
                                                                        </div>
                                                                        <p className="text-sm font-medium">{rec.label}</p>
                                                                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                                            <span>Impact: {rec.impact}/10</span>
                                                                            <span>Effort: {rec.effort}/10</span>
                                                                            <span>Délai: {rec.eta}</span>
                                                                        </div>
                                                                    </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {match.chemistry && (
                                                    <div className="space-y-3">
                                                        <h3 className="font-semibold">Analyse de compatibilité</h3>
                                                        <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div>
                                                                    <p className="text-xs text-muted-foreground">Score de compatibilité</p>
                                                                    <p className="text-lg font-bold">{(match.chemistry.score * 100).toFixed(0)}%</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-muted-foreground">Version du modèle</p>
                                                                    <p className="text-sm font-medium">{match.chemistry.modelVersion}</p>
                                                                </div>
                                                            </div>
                                                            {match.chemistry.notes && match.chemistry.notes.length > 0 && (
                                                                <div className="space-y-1">
                                                                    <p className="text-xs font-medium text-muted-foreground">Notes:</p>
                                                                    <ul className="text-xs text-muted-foreground space-y-1">
                                                                        {match.chemistry.notes.map((note, idx) => (
                                                                            <li key={idx}>• {note}</li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {match.contactPlan && match.contactPlan.length > 0 && (
                                                    <div className="space-y-3">
                                                        <h3 className="font-semibold">Plan de contact</h3>
                                                        <div className="space-y-2">
                                                            {match.contactPlan.map((step, idx) => (
                                                                <div key={idx} className="rounded-lg border bg-muted/30 p-3 space-y-1">
                                                                    <div className="font-medium flex items-center gap-2">
                                                                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                                                                            {idx + 1}
                                                                        </span>
                                                                        {step.title}
                                                                    </div>
                                                                    <p className="text-xs text-muted-foreground leading-relaxed pl-7">
                                                                        {step.description}
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
