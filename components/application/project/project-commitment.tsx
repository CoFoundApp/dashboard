import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Home } from "lucide-react";

interface ProjectCommitmentProps {
    required_hours_min: number | null;
    required_hours_max: number | null;
    duration_weeks_min: number | null;
    duration_weeks_max: number | null;
    remote_ratio_min: number | null;
    remote_ratio_max: number | null;
}

export default function ProjectCommitment({ 
    required_hours_min,
    required_hours_max,
    duration_weeks_min,
    duration_weeks_max,
    remote_ratio_min,
    remote_ratio_max
 }: ProjectCommitmentProps) {
    const formatRange = (min: number | null, max: number | null, unit: string) => {
        if (min === null && max === null) return null
        if (min === max || (min !== null && max === null)) return `${min}${unit}`
        if (min === null && max !== null) return `jusqu'à ${max}${unit}`
        return `${min}-${max}${unit}`;
    }

    const hoursText = formatRange(required_hours_min, required_hours_max, " h/semaine");
    const durationText = formatRange(duration_weeks_min, duration_weeks_max, " jours/semaines");
    const remoteText = formatRange(remote_ratio_min, remote_ratio_max, " % en remote");

    const hasAny = hoursText || durationText || remoteText;

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Engagement attendu</h2>
            {hasAny ? (
                <div className="flex flex-wrap gap-2">
                    {hoursText && (
                        <Badge variant="secondary" className="gap-1.5">
                            <Clock className="size-3.5" />
                            {hoursText}
                        </Badge>
                    )}
                    {durationText && (
                        <Badge variant="secondary" className="gap-1.5">
                            <Calendar className="size-3.5" />
                            {durationText}
                        </Badge>
                    )}
                    {remoteText && (
                        <Badge variant="secondary" className="gap-1.5">
                            <Home className="size-3.5" />
                            {remoteText}
                        </Badge>
                    )}
                </div>
            ) : (
                <p className="text-sm text-muted-foreground">
                    Aucune information d’engagement n’a encore été définie pour ce projet.
                </p>
            )}
        </div>
    );
}
