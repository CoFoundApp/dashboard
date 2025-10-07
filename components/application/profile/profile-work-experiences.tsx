import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Briefcase } from "lucide-react";

interface ProfileWorkExperiencesProps {
    workExperiences: Array<{
        company: string;
        description: string | null;
        end_date: string | null;
        is_current: boolean;
        location: string | null;
        start_date: string;
        title: string;
    }>;
}

export default function ProfileWorkExperiences({
    workExperiences
}: ProfileWorkExperiencesProps) {
    const getPlaceholderCount = (count: number) => {
        if (count === 0) return { md: 0, lg: 0 };
        const mdRemainder = count % 2;
        const lgRemainder = count % 3;
        return {
            md: mdRemainder === 0 ? 0 : 2 - mdRemainder,
            lg: lgRemainder === 0 ? 0 : 3 - lgRemainder,
        };
    }

    const placeholderCounts = getPlaceholderCount(workExperiences.length);
    const maxPlaceholders = Math.max(placeholderCounts.md, placeholderCounts.lg);

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Éxpériences professionnelles</h2>
            <div className="space-y-4">
                {workExperiences.length === 0 ? (
                    <p className="text-muted-foreground">
                        Aucun expérience professionnelle ajoutée pour le moment.
                    </p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {workExperiences.map((exp, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="rounded-full bg-primary p-2">
                                                <Briefcase className="size-4 text-primary-foreground" />
                                            </div>
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <CardTitle className="text-lg">{exp.title}</CardTitle>
                                            <p className="text-base text-foreground">{exp.company}</p>
                                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                                                <span>
                                                    {formatDate(exp.start_date)} —{" "}
                                                    {exp.is_current ? "Présent" : exp.end_date ? formatDate(exp.end_date) : "Présent"}
                                                </span>
                                                {exp.location && <span>{exp.location}</span>}
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                {exp.description && (
                                    <CardContent>
                                        <p className="text-sm leading-relaxed text-muted-foreground">{exp.description}</p>
                                    </CardContent>
                                )}
                            </Card>
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