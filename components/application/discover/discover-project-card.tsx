"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn, projectStageLabels, projectStatusLabels } from "@/lib/utils"
import { Building2, CheckCircle2, ChevronDown, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { ProjectStage, ProjectStatus } from "@/graphql/projects"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

interface DiscoverProjectCardProps {
    project: {
        id: string;
        title: string;
        summary: string | null;
        avatar_url: string | null;
        banner_url: string | null;
        industry: string | null;
        stage: ProjectStage;
        status: ProjectStatus;
        project_skills: string[];
        project_interests: string[];
        tags: string[];
        created_at: Date;
    },
    score?: number;
    reasons?: string[];
}

export default function DiscoverProjectCard({ project, score, reasons }: DiscoverProjectCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const scorePercentage = score !== undefined ? Math.round(score * 100) : undefined;

    return (
        <Link href={`/projects/${project.id}`} className="block">
            <Card className="h-fit flex flex-col transition-colors hover:border-foreground/20">
                <CardHeader className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                            <Avatar className="size-12 shrink-0">
                                <AvatarImage src={project.avatar_url || undefined} alt={project.title} />
                                <AvatarFallback className="bg-primary text-primary-foreground">{project.title.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <CardTitle className="text-balance">{project.title}</CardTitle>
                                {project.summary && (
                                    <p className="text-sm text-muted-foreground leading-relaxed text-pretty mt-2">{project.summary}</p>
                                )}
                            </div>
                        </div>
                        {scorePercentage !== undefined && (
                            <Badge variant="secondary" className="shrink-0">
                                <Sparkles className="size-3 mr-1" />
                                {scorePercentage}% pertinent
                            </Badge>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="space-y-4 flex-1 flex flex-col">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                            {project.industry && (
                                <Badge>
                                    <Building2 className="size-3 mr-2" />
                                    {project.industry}
                                </Badge>
                            )}
                            <Badge variant="outline">{projectStatusLabels[project.status]}</Badge>
                            <Badge variant="outline">{projectStageLabels[project.stage]}</Badge>
                        </div>
                    </div>
                    {reasons && reasons.length > 0 && (
                        <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
                            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Pourquoi ce projet ?</h4>
                            <ul className="space-y-1.5">
                            {reasons.map((reason, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="size-4 text-primary mt-0.5 shrink-0" />
                                    <span className="text-pretty">{reason}</span>
                                </li>
                            ))}
                            </ul>
                        </div>
                    )}

                    {isExpanded && (
                        <div className="space-y-4 pt-4 border-t">
                            {project.project_skills.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-medium mb-2">Compétences recherchées</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.project_skills.map((skill, index) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {project.project_interests.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-medium mb-2">Centres d'intérêt</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.project_interests.map((interest, index) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                                {interest}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {project.tags.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-medium mb-2">Tags</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag, index) => (
                                            <Badge key={index} variant="secondary" className="text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-between group mt-auto"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsExpanded(!isExpanded);
                        }}
                    >
                        <span className="text-sm">{isExpanded ? "Masquer les détails" : "Voir les détails"}</span>
                        <ChevronDown className={cn("size-4 transition-transform", isExpanded && "rotate-180")} />
                    </Button>
                </CardContent>
            </Card>
        </Link>
    );
}