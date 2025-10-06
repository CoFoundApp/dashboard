interface ProjectDescriptionProps {
    description: string | null;
}

export default function ProjectDescription({
    description
}: ProjectDescriptionProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Description</h2>
            <p className="text-base text-muted-foreground">
                {description 
                    ? description
                    : (
                        <p className="text-muted-foreground">
                            Aucun description ajoutée pour le moment.
                        </p>
                    )
                }
            </p>
        </div>
    );
}