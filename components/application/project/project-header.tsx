import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

interface ProjectHeaderProps {
    title: string;
    summary: string;
    avatar_url: string | null;
    isEditable: boolean;
}

export default function ProjectHeader({
    title,
    summary,
    avatar_url,
    isEditable
}: ProjectHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-center gap-8">
                <Avatar className="size-20">
                    <AvatarImage src={avatar_url ?? ""} alt={title} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
                        {title.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        {title}
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        {summary}
                    </p>
                </div>
            </div>
            {isEditable && (
                <Button>
                    <Edit className="size-4 mr-1" />
                    Modifier mon projet
                </Button>
            )}
        </div>
    );
}