import { Badge } from "@/components/ui/badge";

interface ProfileTagsProps {
    tags: string[];
}

export default function ProfileTags({
    tags
}: ProfileTagsProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Tags</h2>
            <div className="flex flex-wrap gap-2">
                {tags.length === 0 ? (
                    <p className="text-muted-foreground">
                        Aucun tag ajouté pour le moment.
                    </p>
                ) : (
                    tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                        </Badge>
                    ))
                )}
            </div>
        </div>
    );
}