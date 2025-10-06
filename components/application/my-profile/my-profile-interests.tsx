import { Badge } from "@/components/ui/badge";

interface MyProfileInterestsProps {
    interests: Array<{
        name: string;
    }>;
}

export default function MyProfileInterests({
    interests
}: MyProfileInterestsProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Intérêts</h2>
            <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                    <Badge key={interest.name} variant="secondary" className="text-sm">
                        {interest.name}
                    </Badge>
                ))}
            </div>
        </div>
    );
}