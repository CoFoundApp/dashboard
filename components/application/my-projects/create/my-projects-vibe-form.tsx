import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MultiSelect } from "@/components/ui/multi-select";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CULTURE_VALUES_OPTIONS, CULTURE_WORK_STYLES_OPTIONS, MANAGEMENT_STYLE_OPTIONS } from "@/lib/utils";
import { CultureValues, CultureWorkStyles } from "@/schemas/projects";
import { useFormContext } from "react-hook-form";
import z from "zod";

export default function MyProjectsVibeForm() {
    const { control } = useFormContext();

    return (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <h2 className="font-semibold text-foreground">
                Culture & mode de travail
            </h2>
            <div className="md:col-span-2">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
                    <div className="col-span-full">
                        <FormField
                            control={control}
                            name="culture_values"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Valeurs entreprenariales</FormLabel>
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
                            name="culture_work_styles"
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
                    <div className="col-span-full">
                        <FormField
                            control={control}
                            name="management_style"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Style managérial</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Style managérial" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {MANAGEMENT_STYLE_OPTIONS.map((style) => (
                                                <SelectItem key={style.value} value={style.value}>
                                                    {style.label}
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