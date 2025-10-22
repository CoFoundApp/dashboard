"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { SUGGEST_PROJECTS_FOR_ME, type SuggestProjectsForMeResult } from "@/graphql/matches"
import { useQuery } from "@apollo/client/react"
import { Loader2, Star } from "lucide-react"

interface DashboardSuggestProjectsProps {
    profile_id: string;
}

const translations: Record<string, string> = {
    technical: "Technique",
    culture: "Culture",
    team: "Équipe",
    logistics: "Logistique",
    experience: "Expérience",
    semantic: "Sémantique",
    overall: "Global",
}

const translate = (key: string): string => {
    return translations[key.toLowerCase()] || key;
}

export default function DashboardSuggestProjects({ profile_id }: DashboardSuggestProjectsProps) {
    const { data, loading, error } = useQuery<SuggestProjectsForMeResult>(SUGGEST_PROJECTS_FOR_ME, {
        variables: {
            input: {
                mode: "BY_PROFILE",
                k: 3,
                profileId: profile_id,
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
                    <Loader2
                        className="size-8 animate-spin text-muted-foreground"
                        aria-label="Chargement des suggestions de projet"
                    />
                </div>
            </section>
        );
    }

    if (error || !data || !data.getBidirectionalProjectMatches) {
        return (
            <section className="space-y-8">
                <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                    <p className="text-destructive" role="alert">
                        Une erreur est survenue lors du chargement des suggestions de projet.
                    </p>
                    <button onClick={() => window.location.reload()} className="text-sm underline underline-offset-4">
                        Réessayer
                    </button>
                </div>
            </section>
        );
    }

    const projects = data.getBidirectionalProjectMatches.items

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Projets qui pourraient vous plaire</h2>
            <div className="space-y-4">
                {projects.length === 0 ? (
                    <p className="text-muted-foreground">Aucun projet suggéré pour le moment.</p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {projects.map((suggest, index) => (
                            <Card key={index} className="h-fit">
                                <CardHeader>
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 space-y-1">
                                            <CardTitle className="text-lg">{suggest.project.title}</CardTitle>
                                            <CardDescription>{suggest.project.summary}</CardDescription>
                                        </div>
                                        <Badge variant="secondary" className="flex items-center gap-1 shrink-0">
                                            <Star className="h-3 w-3" />
                                            {(suggest.score * 100).toFixed(0)}%
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {suggest.successProbability && (
                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium">Succès</span>
                                                    <span className="text-sm font-bold">{(suggest.successProbability * 100).toFixed(0)}%</span>
                                                </div>
                                                <Progress value={suggest.successProbability * 100} className="h-2" />
                                            </div>
                                        )}
                                        {suggest.confidence && (
                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium">Confiance</span>
                                                    <span className="text-sm font-bold">{(suggest.confidence * 100).toFixed(0)}%</span>
                                                </div>
                                                <Progress value={suggest.confidence * 100} className="h-2" />
                                            </div>
                                        )}
                                    </div>

                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" className="w-full mt-4 bg-transparent">
                                                En savoir plus
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
                                            <DialogHeader>
                                                <DialogTitle className="text-2xl">{suggest.project.title}</DialogTitle>
                                                <DialogDescription>{suggest.project.summary}</DialogDescription>
                                            </DialogHeader>

                                            <div className="space-y-6">
                                                <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-muted-foreground">Score global</span>
                                                        <span className="text-2xl font-bold text-primary">{(suggest.score * 100).toFixed(1)}%</span>
                                                    </div>
                                                    {suggest.successProbability && (
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm text-muted-foreground">Probabilité de succès</span>
                                                            <span className="text-2xl font-bold text-primary">
                                                                {(suggest.successProbability * 100).toFixed(1)}%
                                                            </span>
                                                        </div>
                                                    )}
                                                    {suggest.confidence && (
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm text-muted-foreground">Confiance</span>
                                                            <span className="text-2xl font-bold text-primary">
                                                                {(suggest.confidence * 100).toFixed(1)}%
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                {suggest.dimensionScores && suggest.dimensionScores.length > 0 && (
                                                    <div className="space-y-4">
                                                        <h3 className="text-lg font-semibold">Scores par dimension</h3>
                                                        <div className="space-y-4">
                                                            {suggest.dimensionScores.map((dim, idx) => (
                                                                <div key={`${dim.key}-${idx}`} className="space-y-3">
                                                                    <div>
                                                                        <div className="flex items-center justify-between mb-2">
                                                                            <span className="text-sm font-medium">{translate(dim.key)}</span>
                                                                            <span className="text-sm font-bold text-primary">
                                                                                {(dim.score * 100).toFixed(0)}%
                                                                            </span>
                                                                        </div>
                                                                        <Progress value={dim.score * 100} className="h-2" />
                                                                        {dim.confidence && (
                                                                            <p className="text-xs text-muted-foreground mt-1">
                                                                                Confiance: {(dim.confidence * 100).toFixed(0)}%
                                                                            </p>
                                                                        )}
                                                                    </div>

                                                                    {dim.strengths && dim.strengths.length > 0 && (
                                                                        <div className="pl-4 space-y-1">
                                                                            <p className="text-xs font-medium text-muted-foreground">Points forts:</p>
                                                                            <ul className="space-y-1">
                                                                                {dim.strengths.map((strength, sIdx) => (
                                                                                    <li key={sIdx} className="text-sm flex items-start gap-2">
                                                                                        <span className="text-primary mt-1">•</span>
                                                                                        <span>{strength}</span>
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        </div>
                                                                    )}

                                                                    {dim.gaps && dim.gaps.length > 0 && (
                                                                        <div className="pl-4 space-y-1">
                                                                            <p className="text-xs font-medium text-muted-foreground">Points à améliorer:</p>
                                                                            <ul className="space-y-1">
                                                                                {dim.gaps.map((gap, gIdx) => (
                                                                                    <li key={gIdx} className="text-sm flex items-start gap-2">
                                                                                        <span className="text-muted-foreground mt-1">•</span>
                                                                                        <span>{gap}</span>
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {suggest.forces && suggest.forces.length > 0 && (
                                                    <div className="space-y-3">
                                                        <h3 className="text-lg font-semibold">Points forts globaux</h3>
                                                        <div className="space-y-2">
                                                            {suggest.forces.map((force, idx) => (
                                                                <div key={idx} className="p-3 bg-muted/50 rounded-lg space-y-1">
                                                                    <div className="flex items-center justify-between">
                                                                        <p className="font-medium text-sm">{force.label}</p>
                                                                        <Badge variant="secondary" className="text-xs">
                                                                            {translate(force.dimension)}
                                                                        </Badge>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {suggest.gaps && suggest.gaps.length > 0 && (
                                                    <div className="space-y-3">
                                                        <h3 className="text-lg font-semibold">Points à améliorer globaux</h3>
                                                        <div className="space-y-2">
                                                            {suggest.gaps.map((gap, idx) => (
                                                                <div key={idx} className="p-3 bg-muted/50 rounded-lg space-y-2">
                                                                    <div className="flex items-start justify-between gap-2">
                                                                        <p className="font-medium text-sm">{gap.label}</p>
                                                                        <div className="flex items-center gap-2">
                                                                            <Badge variant="secondary" className="text-xs">
                                                                                {translate(gap.dimension)}
                                                                            </Badge>
                                                                            <Badge variant="outline" className="text-xs">
                                                                                Impact: {gap.impact}
                                                                            </Badge>
                                                                        </div>
                                                                    </div>
                                                                    <p className="text-sm text-muted-foreground">{gap.description}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {suggest.recommendations && suggest.recommendations.length > 0 && (
                                                    <div className="space-y-3">
                                                        <h3 className="text-lg font-semibold">Recommandations</h3>
                                                        <div className="space-y-2">
                                                            {suggest.recommendations.map((rec, idx) => (
                                                                <div key={idx} className="p-3 bg-muted/50 rounded-lg space-y-2">
                                                                    <div className="flex items-start justify-between gap-2">
                                                                        <p className="font-medium text-sm">{rec.label}</p>
                                                                            <Badge variant="default" className="shrink-0">
                                                                            {rec.priority}
                                                                        </Badge>
                                                                    </div>
                                                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                                        <span>Dimension: {translate(rec.dimension)}</span>
                                                                        <span>Impact: {rec.impact}</span>
                                                                        <span>Effort: {rec.effort}</span>
                                                                        <span>ETA: {rec.eta}</span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {suggest.chemistry && (
                                                    <div className="space-y-3">
                                                        <h3 className="text-lg font-semibold">Analyse de compatibilité</h3>
                                                        <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                                                            <div className="grid grid-cols-3 gap-4">
                                                                <div>
                                                                    <p className="text-xs text-muted-foreground">Score</p>
                                                                    <p className="text-xl font-bold text-primary">
                                                                        {(suggest.chemistry.score * 100).toFixed(1)}%
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-muted-foreground">Probabilité de succès</p>
                                                                    <p className="text-xl font-bold text-primary">
                                                                        {(suggest.chemistry.successProbability * 100).toFixed(1)}%
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-muted-foreground">Confiance</p>
                                                                    <p className="text-xl font-bold text-primary">
                                                                        {(suggest.chemistry.successConfidence * 100).toFixed(1)}%
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            {suggest.chemistry.notes && (
                                                                <div>
                                                                    <p className="text-xs text-muted-foreground mb-1">Notes:</p>
                                                                    <p className="text-sm">{suggest.chemistry.notes}</p>
                                                                </div>
                                                            )}
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
