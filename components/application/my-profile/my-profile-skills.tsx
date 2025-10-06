import { Badge } from "@/components/ui/badge";

interface MyProfileSkillsProps {
    skills: Array<{
        name: string;
    }>;
}

export default function MyProfileSkills({
    skills
}: MyProfileSkillsProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Compétences</h2>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <Badge key={skill.name} variant="secondary" className="text-sm">
                        {skill.name}
                    </Badge>
                ))}
            </div>
        </div>
    );
}