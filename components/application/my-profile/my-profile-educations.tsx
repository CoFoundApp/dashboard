import { formatDate } from "@/lib/utils";
import { GraduationCap } from "lucide-react";

interface MyProfileEducationsProps {
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

export default function MyProfileEducations({
    educations
}: MyProfileEducationsProps) {
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
                        <div key={index} className="flex gap-4">
                            <div className="flex-shrink-0 mt-2">
                                <div className="rounded-full bg-primary p-2">
                                    <GraduationCap className="size-4 text-primary-foreground" />
                                </div>
                            </div>

                            <div className="space-y-2 flex-1">
                                <div>
                                    <h3 className="text-lg font-semibold">{edu.school}</h3>
                                    {(edu.degree || edu.field_of_study) && (
                                        <p className="text-base text-foreground">
                                            {[edu.degree, edu.field_of_study].filter(Boolean).join(" en ")}
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                                    <span>
                                        {formatDate(edu.start_date)} —{" "}
                                        {edu.is_current ? "Présent" : edu.end_date ? formatDate(edu.end_date) : "Présent"}
                                    </span>
                                    {edu.grade && <span>Note: {edu.grade}</span>}
                                </div>

                                {edu.description && <p className="text-sm leading-relaxed text-muted-foreground">{edu.description}</p>}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}