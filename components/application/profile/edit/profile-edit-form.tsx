"use client";

import { Form } from "@/components/ui/form";
import { UPDATE_MY_PROFILE } from "@/graphql/profile";
import { ProfileSchema } from "@/schemas/profiles";
import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form";
import z from "zod";
import ProfileEditGeneralForm from "./profile-edit-general-form";
import { Separator } from "@/components/ui/separator";
import ProfileEditEducationsForm from "./profile-edit-educations-form";
import ProfileEditOtherForm from "./profile-edit-other-form";
import { Button } from "@/components/ui/button";
import ProfileEditExperiencesForm from "./profile-edit-experiences-form";
import { toast } from "sonner";
import { GET_NAVIGATION } from "@/graphql/navigation";
import ProfileEditValuesForm from "./profile-edit-values-form";
import ProfileEditCollaborationForm from "./profile-edit-collaboration-form";
import ProfileEditDisponibilityForm from "./profile-edit-disponibility-form";

export default function MyProfileEditForm({ profile }: any) {
    const router = useRouter();
    const [updateMyProfile, { loading }] = useMutation(UPDATE_MY_PROFILE, {
        refetchQueries: [GET_NAVIGATION],
    });

    const formatDateForInput = (isoDate: string | null | undefined): string => {
        if (!isoDate) return "";
        try {
            return isoDate.split('T')[0];
        } catch {
            return "";
        }
    };

    const form = useForm({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            display_name: profile.display_name,
            visibility: profile.visibility,
            avatar: [],
            availability_hours: profile.availability_hours ?? undefined,
            bio: profile.bio,
            educations: profile.educations?.map(edu => ({
                ...edu,
                start_date: formatDateForInput(edu.start_date),
                end_date: formatDateForInput(edu.end_date),
                grade: edu.grade ?? "",
                description: edu.description ?? "",
            })) ?? [],
            headline: profile.headline,
            interests: profile.interests.map(i => i.name),
            languages: profile.languages?.map((lang: string) => lang.toLowerCase()),
            location: profile.location,
            looking_for: profile.looking_for,
            skills: profile.skills.map(s => s.name),
            tags: profile.tags,
            work_experiences: profile.workExperiences?.map(work => ({
                ...work,
                start_date: formatDateForInput(work.start_date),
                end_date: formatDateForInput(work.end_date),
                description: work.description ?? "",
            })) ?? [],
            core_values: profile.core_values ?? [],
            primary_motivations: profile.primary_motivations ?? [],
            desired_team_role: profile.desired_team_role ?? undefined,
            preferred_collaboration_mode: profile.preferred_collaboration_mode ?? undefined,
            preferred_environments: profile.preferred_environments ?? [],
            preferred_team_size: profile.preferred_team_size ?? undefined,
            preferred_work_styles: profile.preferred_work_styles ?? [],
            communication_style: profile.communication_style ?? undefined,
            communication_frequency: profile.communication_frequency ?? undefined,
            mission_duration_min_weeks: profile.mission_duration_min_weeks ?? undefined,
            mission_duration_max_weeks: profile.mission_duration_max_weeks ?? undefined,
            remote_preference_percent: profile.remote_preference_percent ?? undefined,
            timezone: profile.timezone ?? "",
            timezone_flexibility_minutes: profile.timezone_flexibility_minutes ?? undefined,
        },
        mode: "onTouched",
    });

    const onSubmit = (values: z.infer<typeof ProfileSchema>) => {
        const formData = form.getValues() as {
            display_name: string;
            visibility: string;
            availability_hours?: number;
            bio?: string;
            educations?: any[];
            headline?: string;
            interests?: string[];
            languages?: string[];
            location?: string;
            looking_for?: string;
            skills?: string[];
            tags?: string[];
            work_experiences?: any[];
        }

        const cleanedEducations = formData.educations?.map((edu) => ({
            ...edu,
            end_date: edu.is_current || !edu.end_date ? null : edu.end_date,
            grade: edu.grade || null,
            description: edu.description || null,
        }))

        const cleanedWorkExperiences = formData.work_experiences?.map((work) => ({
            ...work,
            end_date: work.is_current || !work.end_date ? null : work.end_date,
            description: work.description || null,
        }))

        const finalData = {
            ...formData,
            ...values,
            educations: cleanedEducations,
            work_experiences: cleanedWorkExperiences,
        };

        const { avatar, ...restValues } = finalData;
        const inputData = avatar
            ? finalData
            : restValues;

        updateMyProfile({
            variables: {
                input: inputData
            }
        })
            .then(() => {
                toast.success("Profil modifié !", {
                    description: "Vous avez modifié votre profil avec succès.",
                });
                router.push("/my-profile");
            })
            .catch((err: Error) => {
                console.log(err)
                toast.error("Oups !", {
                    description: err.message || "Une erreur est survenue.",
                });
            })
    }

    return (
        <div className="flex items-center justify-center">
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full"
                >
                    <ProfileEditGeneralForm />
                    <Separator className="my-8" />
                    <ProfileEditEducationsForm />
                    <Separator className="my-8" />
                    <ProfileEditExperiencesForm />
                    <Separator className="my-8" />
                    <ProfileEditOtherForm />
                    <Separator className="my-8" />
                    <ProfileEditValuesForm/>
                    <Separator className="my-8" />
                    <ProfileEditCollaborationForm />
                    <Separator className="my-8" />
                    <ProfileEditDisponibilityForm />
                    <Separator className="my-8" />
                    <div className="flex items-center justify-end space-x-4">
                        <Button type="submit" className="whitespace-nowrap">
                            { loading ? "Modification..." : "Modifier le profil"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}