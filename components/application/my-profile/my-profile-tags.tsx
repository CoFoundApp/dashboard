import { Badge } from "@/components/ui/badge";

interface MyProfileTagsProps {
    tags: string[];
}

export default function MyProfileTags({
    tags
}: MyProfileTagsProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Compétences</h2>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-sm">
                        {tag}
                    </Badge>
                ))}
            </div>
        </div>
    );
}