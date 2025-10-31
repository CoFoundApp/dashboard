import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MultiSelect } from "@/components/ui/multi-select";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { COLLABORATION_MODE_OPTIONS, COMMUNICATION_FREQUENCY_OPTIONS, COMMUNICATION_STYLE_OPTIONS, CULTURE_WORK_STYLES_OPTIONS, ENVIRONMENT_OPTIONS, PREFERRED_TEAM_SIZE_OPTIONS } from "@/lib/utils";
import { EnvironmentValues } from "@/schemas/profiles";
import { CultureWorkStyles } from "@/schemas/projects";
import { useFormContext } from "react-hook-form";
import z from "zod";

export default function ProfileEditCollaborationForm() {
    const { control } = useFormContext();

    return (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <h2 className="font-semibold text-foreground">
                Mode de travail & collaboration
            </h2>
            <div className="md:col-span-2">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
                    <div className="col-span-full sm:col-span-3">
                        <FormField
                            control={control}
                            name="preferred_collaboration_mode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mode de collaboration préféré</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Mode de collaboration préféré" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {COLLABORATION_MODE_OPTIONS.map((opt) => (
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
                    <div className="col-span-full sm:col-span-3">
                        <FormField
                            control={control}
                            name="preferred_team_size"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Taille d'équipe préféré</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Taille d'équipe préféré" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {PREFERRED_TEAM_SIZE_OPTIONS.map((opt) => (
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
                    <div className="col-span-full">
                        <FormField
                            control={control}
                            name="preferred_environments"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Environnements favoris</FormLabel>
                                    <MultiSelect
                                        options={ENVIRONMENT_OPTIONS as any}
                                        selected={field.value ?? []}
                                        onSelectionChange={(sel) => {
                                            const valid = (sel ?? []).filter((v): v is z.infer<typeof EnvironmentValues> =>
                                                EnvironmentValues.options.includes(v as any)
                                            );
                                            field.onChange(valid.length > 0 ? valid : []);
                                        }}
                                        placeholder="Sélectionnez vos environnements..."
                                        className="w-full"
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="col-span-full">
                        <FormField
                            control={control}
                            name="preferred_work_styles"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Style de travail</FormLabel>
                                    <FormControl>
                                        <MultiSelect
                                            options={CULTURE_WORK_STYLES_OPTIONS as any}
                                            selected={field.value ?? []}
                                            onSelectionChange={(sel) => {
                                                const valid = (sel ?? []).filter((v): v is z.infer<typeof CultureWorkStyles> =>
                                                    CultureWorkStyles.options.includes(v as any)
                                                );
                                                field.onChange(valid.length > 0 ? valid : []);
                                            }}
                                            placeholder="Sélectionnez vos styles..."
                                            className="w-full"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="col-span-full sm:col-span-3">
                        <FormField
                            control={control}
                            name="communication_style"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Style de communication</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Style de communication" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {COMMUNICATION_STYLE_OPTIONS.map((opt) => (
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
                    <div className="col-span-full sm:col-span-3">
                        <FormField
                            control={control}
                            name="communication_frequency"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Fréquence de communication</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Fréquence de communication" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {COMMUNICATION_FREQUENCY_OPTIONS.map((opt) => (
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