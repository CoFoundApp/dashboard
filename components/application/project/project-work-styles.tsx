import { Badge } from "@/components/ui/badge";
import { CULTURE_WORK_STYLES_OPTIONS } from "@/lib/utils";

interface ProjectWorkStylesProps {
  styles: string[] | null;
}

export default function ProjectWorkStyles({ styles }: ProjectWorkStylesProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Style{styles && styles.length > 1 ? "s" : ""} de travail</h2>
            <div className="flex flex-wrap gap-2">
                {styles && styles.length > 0 ? (
                    styles.map((value) => {
                        const label =
                            CULTURE_WORK_STYLES_OPTIONS.find((opt) => opt.value === value)?.label || value;
                        return (
                            <Badge key={value} variant="secondary" className="text-xs">
                                {label}
                            </Badge>
                        );
                    })
                ) : (
                    <p className="text-sm text-muted-foreground">
                        Aucune valeur renseignée.
                    </p>
                )}
            </div>
        </div>
    );
}
