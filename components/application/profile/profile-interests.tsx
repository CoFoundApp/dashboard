import { Badge } from "@/components/ui/badge";

interface ProfileInterestsProps {
    interests: Array<{
        name: string;
    }>;
}

export default function ProfileInterests({
    interests
}: ProfileInterestsProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Intérêts</h2>
            <div className="flex flex-wrap gap-2">
                {interests.length === 0 ? (
                    <p className="text-muted-foreground">
                        Aucun intérêt ajouté pour le moment.
                    </p>
                ) : (
                    interests.map((interest) => (
                        <Badge key={interest.name} variant="secondary" className="text-xs">
                            {interest.name}
                        </Badge>
                    ))
                )}
            </div>
        </div>
    );
}