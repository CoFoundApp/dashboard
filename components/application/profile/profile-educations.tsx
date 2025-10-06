import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { GraduationCap } from "lucide-react";

interface ProfileEducationsProps {
    educations: Array<{
        degree: string | null;
        description: string | null;
        end_date: string | null;
        field_of_study: string | null;
        grade: string | null;
        is_current: boolean;
        school: string;
        start_date: string;
    }>;
}

export default function ProfileEducations({
    educations
}: ProfileEducationsProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Formations</h2>
            <div className="space-y-4">
                {educations.length === 0 ? (
                    <p className="text-muted-foreground">
                        Aucun formation ajoutée pour le moment.
                    </p>
                ) : (
                    educations.map((edu, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="rounded-full bg-primary p-2">
                                            <GraduationCap className="size-4 text-primary-foreground" />
                                        </div>
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <CardTitle className="text-lg">{edu.school}</CardTitle>
                                        {(edu.degree || edu.field_of_study) && (
                                            <p className="text-base text-foreground">
                                                {[edu.degree, edu.field_of_study].filter(Boolean).join(" en ")}
                                            </p>
                                        )}
                                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                                            <span>
                                                {formatDate(edu.start_date)} —{" "}
                                                {edu.is_current ? "Présent" : edu.end_date ? formatDate(edu.end_date) : "Présent"}
                                            </span>
                                            {edu.grade && <span>Note: {edu.grade}</span>}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            {edu.description && (
                                <CardContent>
                                    <p className="text-sm leading-relaxed text-muted-foreground">{edu.description}</p>
                                </CardContent>
                            )}
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}