"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

interface DiscoverProfileCardProps {
    profile: {
        id: string;
        display_name: string;
        headline: string;
        avatar_url: string | null;
        location: string | null;
        availability_hours: number | null;
        skills: Array<{
            name: string;
        }>;
        interests: Array<{
            name: string;
        }>;
        languages: string[];
    },
}

export default function DiscoverProfileCard({ profile }: DiscoverProfileCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Link href={`/profile/${profile.id}`} className="block">
            <Card className="h-fit flex flex-col transition-colors hover:border-foreground/20">
                <CardHeader className="space-y-3">
                    <div className="flex items-start gap-3 flex-1">
                        <Avatar className="size-12 shrink-0">
                            <AvatarImage src={profile.avatar_url || undefined} alt={profile.display_name} />
                            <AvatarFallback className="bg-primary text-primary-foreground">{profile.display_name.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <CardTitle className="text-balance">{profile.display_name}</CardTitle>
                            <p className="text-sm text-muted-foreground leading-relaxed text-pretty mt-2 line-clamp-2">{profile.headline}</p>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4 flex-1 flex flex-col">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                            {profile.location && <Badge variant="outline">{profile.location}</Badge>}
                            {profile.availability_hours && <Badge variant="outline">{profile.availability_hours}h/semaine</Badge>}
                        </div>
                    </div>

                    {isExpanded && (
                        <div className="space-y-4 pt-4 border-t">
                            {profile.skills.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-medium mb-2">Compétences</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {profile.skills.map((skill, index) => (
                                            <Badge key={index} variant="secondary" className="text-xs">
                                                {skill.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {profile.interests.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-medium mb-2">Centres d'intérêt</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {profile.interests.map((interest, index) => (
                                            <Badge key={index} variant="secondary" className="text-xs">
                                                {interest.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {profile.languages.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-medium mb-2">Langues</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {profile.languages.map((language, index) => (
                                            <Badge key={index} variant="secondary" className="text-xs">
                                                {language}
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