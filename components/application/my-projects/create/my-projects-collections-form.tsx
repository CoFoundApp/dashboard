import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { TagInput } from "@/components/ui/tag-input";
import { useFormContext } from "react-hook-form";

export default function MyProjectsCollectionsForm() {
    const { control } = useFormContext();

    return (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <h2 className="font-semibold text-foreground">
                Mots-clés & Compétences
            </h2>
            <div className="md:col-span-2">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
                    <div className="col-span-full">
                        <FormField
                            control={control}
                            name="project_skills"
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
                            name="project_interests"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Intêrets</FormLabel>
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