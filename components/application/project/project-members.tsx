"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GET_PROJECT_MEMBERS, GetProjectMembersResult } from "@/graphql/projects";
import { memberRoleLabels } from "@/lib/utils";
import { useQuery } from "@apollo/client/react";
import { Loader2, Mail } from "lucide-react";
import Link from "next/link";

interface ProjectMembersProps {
    projectId: string;
}

export default function ProjectMembers({ projectId }: ProjectMembersProps) {
    const { data, loading, error } = useQuery<GetProjectMembersResult>(GET_PROJECT_MEMBERS, {
        variables: { project_id: projectId },
        fetchPolicy: "cache-and-network",
        errorPolicy: "all",
        notifyOnNetworkStatusChange: true,
    });

    if (loading && !data) {
        return (
            <section className="space-y-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="size-8 animate-spin text-muted-foreground" aria-label="Chargement des membres du projet" />
                </div>
            </section>
        );
    }

    if (error || !data || !data.projectMembers) {
        return (
            <section className="space-y-8">
                <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                    <p className="text-destructive" role="alert">
                        Une erreur est survenue lors du chargement des membres du projet.
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

    const getPlaceholderCount = (count: number) => {
        if (count === 0) return { md: 0, lg: 0 };
        const mdRemainder = count % 2;
        const lgRemainder = count % 3;
        return {
            md: mdRemainder === 0 ? 0 : 2 - mdRemainder,
            lg: lgRemainder === 0 ? 0 : 3 - lgRemainder,
        };
    }

    const placeholderCounts = getPlaceholderCount(data.projectMembers.length);
    const maxPlaceholders = Math.max(placeholderCounts.md, placeholderCounts.lg);

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Membres</h2>
            <div className="space-y-4">
                {data.projectMembers.length === 0 ? (
                    <p className="text-muted-foreground">
                        Aucun membre ajoutée pour le moment.
                    </p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data.projectMembers.map(member => (
                            <Link key={member.users.id} href={`/profile/${member.users.profile.id}`}>
                                <Card key={member.users.id}>
                                    <CardHeader>
                                        <div className="flex items-start gap-4">
                                            <Avatar className="size-12">
                                                <AvatarImage src={member.users.profile.avatar_url ?? ""} alt={member.users.profile.display_name} />
                                                <AvatarFallback className="bg-primary text-primary-foreground font-bold">{member.users.profile.display_name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="flex-1 min-w-0">
                                                        <CardTitle className="text-base leading-tight">{member.users.profile.display_name}</CardTitle>
                                                        {member.users.profile?.headline && (
                                                            <CardDescription className="text-sm mt-1 leading-relaxed">
                                                                {member.users.profile.headline}
                                                            </CardDescription>
                                                        )}
                                                    </div>
                                                    <Badge variant="secondary" className="shrink-0">
                                                        {memberRoleLabels[member.role]}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                                                    <Mail className="size-3" />
                                                    <span className="truncate">{member.users.email}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>
                                </Card>
                            </Link>
                        ))}
                        {Array.from({ length: maxPlaceholders }).map((_, index) => (
                            <Card
                                key={`placeholder-${index}`}
                                className={`border-2 border-dashed border-muted-foreground/30 pointer-events-none ${
                                    index < placeholderCounts.md ? "hidden md:block" : "hidden lg:block"
                                }`}
                            >
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}