"use client";

import { Form } from "@/components/ui/form";
import { CREATE_PROJECT } from "@/graphql/projects";
import { ProjectSchema } from "@/schemas/projects";
import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import MyProjectsGeneralForm from "./my-projects-general-form";
import MyProjectsSettingsForm from "./my-projects-settings-form";
import MyProjectsCollectionsForm from "./my-projects-collections-form";
import { Button } from "@/components/ui/button";
import z from "zod";
import { sideCannons } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function MyProjectsCreateForm() {
    const router = useRouter();
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

    const onSubmit = (values: z.infer<typeof ProjectSchema>) => {
        createProject({
                variables: {
                    input: {
                        ...form.getValues(),
                        ...values
                    }
                }
            })
                .then(() => {
                    sideCannons();
                    toast.success("Projet créé !", {
                        description: "Vous avez créé votre projet avec succès.",
                    });
                    router.push("/my-projects");
                })
                .catch((err: Error) => {
                    console.log(err)
                    toast.error("Oups !", {
                        description: err.message || "Une erreur est survenue.",
                    });
                });
    }

    return (
        <div className="flex items-center justify-center">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)} 
                    className="w-full"
                >
                    <MyProjectsGeneralForm />
                    <Separator className="my-8" />
                    <MyProjectsSettingsForm />
                    <Separator className="my-8" />
                    <MyProjectsCollectionsForm />
                    <Separator className="my-8" />
                    <div className="flex items-center justify-end space-x-4">
                        <Button type="submit" className="whitespace-nowrap">
                            Créer le projet
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}