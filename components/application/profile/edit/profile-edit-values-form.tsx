import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MultiSelect } from "@/components/ui/multi-select";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CULTURE_VALUES_OPTIONS, PREFERRED_TEAM_ROLE_OPTIONS, PRIMARY_MOTIVATIONS_OPTIONS } from "@/lib/utils";
import { PrimaryMotivationsValues } from "@/schemas/profiles";
import { CultureValues } from "@/schemas/projects";
import { useFormContext } from "react-hook-form";
import z from "zod";

export default function ProfileEditValuesForm() {
    const { control } = useFormContext();

    return (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <h2 className="font-semibold text-foreground">
                Valeurs & motivations
            </h2>
            <div className="md:col-span-2">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
                    <div className="col-span-full">
                        <FormField
                            control={control}
                            name="culture_values"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Valeurs fondamentales</FormLabel>
                                    <FormControl>
                                        <MultiSelect
                                            options={CULTURE_VALUES_OPTIONS as any}
                                            selected={field.value ?? []}
                                            onSelectionChange={(sel) => {
                                                const valid = (sel ?? []).filter((v): v is z.infer<typeof CultureValues> =>
                                                    CultureValues.options.includes(v as any)
                                                );
                                                field.onChange(valid.length > 0 ? valid : []);
                                            }}
                                            placeholder="Sélectionnez vos valeurs..."
                                            className="w-full"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="col-span-full">
                        <FormField
                            control={control}
                            name="primary_motivations"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Motivations principales</FormLabel>
                                    <FormControl>
                                        <MultiSelect
                                            options={PRIMARY_MOTIVATIONS_OPTIONS as any}
                                            selected={field.value ?? []}
                                            onSelectionChange={(sel) => {
                                                const valid = (sel ?? []).filter((v): v is z.infer<typeof PrimaryMotivationsValues> =>
                                                    PrimaryMotivationsValues.options.includes(v as any)
                                                );
                                                field.onChange(valid.length > 0 ? valid : []);
                                            }}
                                            placeholder="Sélectionnez vos motivations..."
                                            className="w-full"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="col-span-full">
                        <FormField
                            control={control}
                            name="desired_team_role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rôle idéal en équipe</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Rôle d'équipe préféré" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {PREFERRED_TEAM_ROLE_OPTIONS.map((opt) => (
                                                <SelectItem key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}