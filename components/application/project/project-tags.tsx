import { Badge } from "@/components/ui/badge";

interface ProjectTagsProps {
    tags: string[];
}

export default function ProjectTags({
    tags
}: ProjectTagsProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Tags</h2>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                    </Badge>
                ))}
            </div>
        </div>
    );
}