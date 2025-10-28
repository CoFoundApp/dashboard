import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function ProfileEditEducationsForm() {
    const { control } = useFormContext();

    const {
        fields: educationFields,
        prepend: prependEducation,
        remove: removeEducation,
    } = useFieldArray({
        control,
        name: "educations",
    });

    return (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <h2 className="font-semibold text-foreground">
                Formations
            </h2>
            <div className="md:col-span-2">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
                    <div className="col-span-full space-y-4">
                        <div className="flex justify-end">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    prependEducation({
                                        school: "",
                                        degree: "",
                                        field_of_study: "",
                                        start_date: "",
                                        end_date: "",
                                        grade: "",
                                        description: "",
                                        is_current: false,
                                    })
                                }
                            >
                                <Plus className="size-4 mr-2" />
                                Ajouter une formation
                            </Button>
                        </div>
                        {educationFields.map((field, index) => (
                            <div key={field.id} className="border rounded-lg p-4 space-y-4">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-medium">Formation {index + 1}</h4>
                                    <Button type="button" variant="ghost" size="sm" onClick={() => removeEducation(index)}>
                                        <Trash2 className="size-4" />
                                    </Button>
                                </div>

                                <FormField
                                    control={control}
                                    name={`educations.${index}.school`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>École / Université</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Entrez votre école..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={control}
                                        name={`educations.${index}.degree`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Diplôme</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Entrez votre diplôme..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={control}
                                        name={`educations.${index}.field_of_study`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Domaine d'études</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Entrez votre domaine..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={control}
                                        name={`educations.${index}.start_date`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Date de début</FormLabel>
                                                <FormControl>
                                                    <Input type="date" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={control}
                                        name={`educations.${index}.end_date`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Date de fin</FormLabel>
                                                <FormControl>
                                                    <Input type="date" {...field} disabled={control._formValues.educations?.[index]?.is_current} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={control}
                                    name={`educations.${index}.is_current`}
                                    render={({ field }) => (
                                        <FormItem className="flex items-center space-x-2">
                                            <FormControl>
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                            <FormLabel className="!mt-0">Formation en cours</FormLabel>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name={`educations.${index}.description`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Décrivez votre formation..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}