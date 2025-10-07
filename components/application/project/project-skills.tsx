import { Badge } from "@/components/ui/badge";

interface ProjectSkillsProps {
    skills: string[];
}

export default function ProjectSkills({
    skills
}: ProjectSkillsProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Compétences recherchées</h2>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                    </Badge>
                ))}
            </div>
        </div>
    );
}