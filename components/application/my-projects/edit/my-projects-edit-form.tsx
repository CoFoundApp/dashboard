"use client";

import { Form } from "@/components/ui/form";
import { UPDATE_PROJECT } from "@/graphql/projects";
import { ProjectSchema } from "@/schemas/projects";
import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import MyProjectsGeneralForm from "../create/my-projects-general-form";
import MyProjectsSettingsForm from "../create/my-projects-settings-form";
import MyProjectsVibeForm from "../create/my-projects-vibe-form";
import MyProjectsCollaborationForm from "../create/my-projects-collaboration-form";
import MyProjectsSearchingForm from "../create/my-projects-searching-form";
import MyProjectsCommitmentForm from "../create/my-projects-commitment-form";
import MyProjectsDisponibilityForm from "../create/my-projects-disponibility-form";

type ProjectFormValues = z.infer<typeof ProjectSchema>;
type ProjectWithId = ProjectFormValues & { id: string };

interface MyProjectsEditFormProps {
    project: ProjectWithId;
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
            tags: project.tags,
            avatar: [],
            status: project.status,
            stage: project.stage,
            visibility: project.visibility,
            culture_values: project.culture_values || [],
            culture_work_styles: project.culture_work_styles || [],
            management_style: project.management_style || undefined,
            communication_style: project.communication_style || undefined,
            communication_frequency: project.communication_frequency || undefined,
            collaboration_mode: project.collaboration_mode || undefined,
            environment: project.environment || undefined,
            preferred_team_role: project.preferred_team_role || undefined,
            preferred_team_size: project.preferred_team_size || undefined,
            project_interests: project.project_interests,
            project_skills: project.project_skills,
            required_hours_min: project.required_hours_min || 0,
            required_hours_max: project.required_hours_max || 0,
            duration_weeks_min: project.duration_weeks_min || 0,
            duration_weeks_max: project.duration_weeks_max || 0,
            urgency: project.urgency || undefined,
            timezone: project.timezone || "",
            remote_ratio_min: project.remote_ratio_min || 0,
            remote_ratio_max: project.remote_ratio_max || 0,
        },
        mode: "onTouched",
    });

    const onSubmit = (values: z.infer<typeof ProjectSchema>) => {
        const { avatar, ...restValues } = values;
        const inputData = avatar
            ? values
            : restValues;

        updateProject({
                variables: {
                    id: project.id,
                    input: inputData,
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
                    <MyProjectsVibeForm />
                    <Separator className="my-8" />
                    <MyProjectsCollaborationForm />
                    <Separator className="my-8" />
                    <MyProjectsSearchingForm />
                    <Separator className="my-8" />
                    <MyProjectsCommitmentForm />
                    <Separator className="my-8" />
                    <MyProjectsDisponibilityForm />
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