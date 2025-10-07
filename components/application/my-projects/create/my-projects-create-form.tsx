"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CREATE_PROJECT } from "@/graphql/projects";
import { ProjectSchema } from "@/schemas/projects";
import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function MyProjectsCreateForm() {
    const [createProject, { loading }] = useMutation(CREATE_PROJECT);

    const form = useForm({
        resolver: zodResolver(ProjectSchema),
        defaultValues: {
            title: "",
            summary: "",
            description: "",
            industry: "",
            status: "DRAFT",
            stage: "IDEA",
            visibility: "PRIVATE",
            tags: [],
            project_interests: [],
            project_skills: [],
        },
        mode: "onTouched",
    });

    return (
        <div className="flex items-center justify-center">
            <Form {...form}>
                <form className="w-full">
                    <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                        <h2 className="font-semibold text-foreground">
                            Informations générales
                        </h2>
                        <div className="md:col-span-2">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
                                <div className="col-span-full">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Titre</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Entrez le titre de votre projet..."
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="col-span-full">
                                    <FormField
                                        control={form.control}
                                        name="summary"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Résumé</FormLabel>
                                                <FormControl>
                                                    <Textarea 
                                                        placeholder="Entrez le résumé de votre projet..."
                                                        {...field}
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
                </form>
            </Form>
        </div>
    );
}