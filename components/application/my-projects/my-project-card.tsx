import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, projectStageLabels, projectStatusLabels } from "@/lib/utils";
import { IProject } from "@/types";
import { Calendar } from "lucide-react";
import Link from "next/link";

interface MyProjectsCardProps {
    project: IProject;
}

export default function MyProjectsCard({ project }: MyProjectsCardProps) {
    return (
        <Link href={`/my-projects/${project.id}`} className="block">
            <Card className="flex flex-col transition-colors hover:border-foreground/20">
                <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex flex-1 items-start gap-3">
                            <Avatar className="size-12 shrink-0">
                                <AvatarImage src={project.avatar_url} alt={project.title} />
                                <AvatarFallback className="bg-primary text-sm font-medium text-primary-foreground">
                                    {project.title.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <CardTitle className="mb-2 text-balance leading-tight">
                                    {project.title}
                                </CardTitle>
                                <div className="flex flex-wrap items-center gap-2">
                                    <Badge variant="outline">{projectStatusLabels[project.status]}</Badge>
                                    <Badge variant="outline" className="text-muted-foreground">
                                        {projectStageLabels[project.stage]}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                    {project.summary && (
                        <CardDescription className="text-pretty leading-relaxed">{project.summary}</CardDescription>
                    )}
                </CardHeader>

                <CardContent className="mt-auto flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="size-4" />
                        <span>{formatDate(new Date(project.created_at).toDateString())}</span>
                        <span className="text-border">•</span>
                        <span className="rounded-sm bg-muted px-2 py-1">{project.industry}</span>
                    </div>

                    {project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {project.tags.map((tag) => (
                                <span key={tag} className="rounded-sm bg-secondary px-2 py-1 text-xs text-secondary-foreground">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </Link>
    );
}