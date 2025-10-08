"use client";

import { Form } from "@/components/ui/form";
import { ProjectStage, ProjectStatus, ProjectVisibility, UPDATE_PROJECT } from "@/graphql/projects";
import { ProjectSchema } from "@/schemas/projects";
import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import z from "zod";
import { sideCannons } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import MyProjectsGeneralForm from "../create/my-projects-general-form";
import MyProjectsSettingsForm from "../create/my-projects-settings-form";
import MyProjectsCollectionsForm from "../create/my-projects-collections-form";

interface MyProjectsEditFormProps {
    project: {
        id: string;
        title: string;
        summary: string;
        description?: string | null;
        industry: string | null;
        status: ProjectStatus;
        stage: ProjectStage;
        visibility: ProjectVisibility;
        tags: string[];
        project_skills: string[];
        project_interests: string[];
    };
}

export default function MyProjectsEditForm({ project }: MyProjectsEditFormProps) {
    const router = useRouter();
    const [updateProject, { loading }] = useMutation(UPDATE_PROJECT);

    const form = useForm({
        resolver: zodResolver(ProjectSchema),
        defaultValues: {
            title: project.title,
            summary: project.summary,
            description: project.description || "",
            industry: project.industry || "",
            avatar: [],
            status: project.status,
            stage: project.stage,
            visibility: project.visibility,
            tags: project.tags,
            project_interests: project.project_interests,
            project_skills: project.project_skills,
        },
        mode: "onTouched",
    });

    const onSubmit = (values: z.infer<typeof ProjectSchema>) => {
        updateProject({
                variables: {
                    id: project.id,
                    input: {
                        ...form.getValues(),
                        ...values
                    }
                }
            })
                .then(() => {
                    toast.success("Projet modifié !", {
                        description: "Vous avez modifié votre projet avec succès.",
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
                            Modifier le projet
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}