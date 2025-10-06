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
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Éxpériences professionnelles</h2>
            <div className="space-y-4">
                {workExperiences.length === 0 ? (
                    <p className="text-muted-foreground">
                        Aucun expérience professionnelle ajoutée pour le moment.
                    </p>
                ) : (
                    workExperiences.map((exp, index) => (
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
                    ))
                )}
            </div>
        </div>
    );
}