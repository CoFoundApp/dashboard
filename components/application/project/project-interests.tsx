import { Badge } from "@/components/ui/badge";

interface ProjectInterestsProps {
    interests: string[];
}

export default function ProjectInterests({
    interests
}: ProjectInterestsProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Intérêts</h2>
            <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="text-sm">
                        {interest}
                    </Badge>
                ))}
            </div>
        </div>
    );
}