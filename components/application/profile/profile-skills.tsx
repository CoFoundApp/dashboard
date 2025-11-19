import { Badge } from "@/components/ui/badge";

interface ProfileSkillsProps {
    skills: Array<{
        name: string;
    }>;
}

export default function ProfileSkills({
    skills
}: ProfileSkillsProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Compétences</h2>
            <div className="flex flex-wrap gap-2">
                {skills.length === 0 ? (
                    <p className="text-muted-foreground">
                        Aucune compétence ajoutée pour le moment.
                    </p>
                ) : (
                    skills.map((skill) => (
                        <Badge key={skill.name} variant="secondary" className="text-xs">
                            {skill.name}
                        </Badge>
                    ))
                )}
            </div>
        </div>
    );
}