import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MultiSelect } from "@/components/ui/multi-select";
import { TagInput } from "@/components/ui/tag-input";
import { LANGUAGE_OPTIONS } from "@/lib/utils";
import { LanguageCode } from "@/schemas/introduction";
import { useFormContext } from "react-hook-form";
import z from "zod";

export default function ProfileEditOtherForm() {
    const { control } = useFormContext();

    return (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <h2 className="font-semibold text-foreground">
                Compétences & intérêts
            </h2>
            <div className="md:col-span-2">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
                    <div className="col-span-full">
                        <FormField
                            control={control}
                            name="languages"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Langues</FormLabel>
                                    <FormControl>
                                        <MultiSelect
                                            options={LANGUAGE_OPTIONS as any}
                                            selected={field.value ?? []}
                                            onSelectionChange={(sel) => {
                                                const valid = (sel ?? []).filter((v): v is z.infer<typeof LanguageCode> =>
                                                    LanguageCode.options.includes(v as any)
                                                );
                                                field.onChange(valid.length > 0 ? valid : []);
                                            }}
                                            placeholder="Sélectionnez vos langues..."
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
                            name="skills"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Compétences</FormLabel>
                                    <FormControl>
                                        <TagInput
                                            tags={field.value ?? []}
                                            onTagsChange={(next) => field.onChange(next)}
                                            placeholder="Tapez et Entrée pour ajouter une compétence..."
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
                            name="interests"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Intérêts</FormLabel>
                                    <FormControl>
                                        <TagInput
                                            tags={field.value ?? []}
                                            onTagsChange={(next) => field.onChange(next)}
                                            placeholder="Tapez et Entrée pour ajouter un intérêt..."
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
                            name="tags"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tags</FormLabel>
                                    <FormControl>
                                        <TagInput
                                            tags={field.value ?? []}
                                            onTagsChange={(next) => field.onChange(next)}
                                            placeholder="Tapez et Entrée pour ajouter un tag..."
                                        />
                                    </FormControl>
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