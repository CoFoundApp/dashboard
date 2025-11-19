"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function ProfileEditExperiencesForm() {
    const { control, watch } = useFormContext();

    const {
        fields: workFields,
        prepend: prependWork,
        remove: removeWork,
    } = useFieldArray({
        control,
        name: "work_experiences",
    });

    return (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <h2 className="font-semibold text-foreground">
                Expériences professionnelles
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
                                    prependWork({
                                        company: "",
                                        title: "",
                                        location: "",
                                        start_date: "",
                                        end_date: "",
                                        description: "",
                                        is_current: false,
                                    })
                                }
                            >
                                <Plus className="size-4 mr-2" />
                                Ajouter une expérience
                            </Button>
                        </div>
                        {workFields.map((field, index) => (
                            <div key={field.id} className="border rounded-lg p-4 space-y-4">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-medium">Expérience {index + 1}</h4>
                                    <Button type="button" variant="ghost" size="sm" onClick={() => removeWork(index)}>
                                        <Trash2 className="size-4" />
                                    </Button>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={control}
                                        name={`work_experiences.${index}.company`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Entreprise</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Entrez votre entreprise..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={control}
                                        name={`work_experiences.${index}.title`}
                                        render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Titre du poste</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Entrez votre titre..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={control}
                                    name={`work_experiences.${index}.location`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Localisation</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Entrez votre localisation..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={control}
                                        name={`work_experiences.${index}.start_date`}
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
                                        name={`work_experiences.${index}.end_date`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Date de fin</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="date"
                                                        {...field}
                                                        disabled={watch(`work_experiences.${index}.is_current`)}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={control}
                                    name={`work_experiences.${index}.is_current`}
                                    render={({ field }) => (
                                        <FormItem className="flex items-center space-x-2">
                                            <FormControl>
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                            <FormLabel className="!mt-0">Poste actuel</FormLabel>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name={`work_experiences.${index}.description`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Décrivez vos responsabilités..." {...field} />
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