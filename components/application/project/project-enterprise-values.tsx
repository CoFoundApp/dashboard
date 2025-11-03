import { Badge } from "@/components/ui/badge";
import { CULTURE_VALUES_OPTIONS } from "@/lib/utils";

interface ProjectEnterpriseValuesProps {
  values: string[] | null;
}

export default function ProjectEnterpriseValues({ values }: ProjectEnterpriseValuesProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Valeurs entrepreneuriales</h2>
            <div className="flex flex-wrap gap-2">
                {values && values.length > 0 ? (
                    values.map((value) => {
                        const label =
                            CULTURE_VALUES_OPTIONS.find((opt) => opt.value === value)?.label || value;
                        return (
                            <Badge key={value} variant="secondary" className="text-xs">
                                {label}
                            </Badge>
                        );
                    })
                ) : (
                    <p className="text-sm text-muted-foreground">
                        Aucunes valeurs entrepreneuriales n’ont encore été définies pour ce projet..
                    </p>
                )}
            </div>
        </div>
    );
}
