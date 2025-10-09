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
import ProfileEditProForm from "./profile-edit-pro-form";
import ProfileEditEducationsForm from "./profile-edit-educations-form";
import ProfileEditOtherForm from "./profile-edit-other-form";
import { Button } from "@/components/ui/button";
import ProfileEditExperiencesForm from "./profile-edit-experiences-form";
import { toast } from "sonner";
import { GET_NAVIGATION } from "@/graphql/navigation";

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
            availability_hours: Number(profile.availability_hours),
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
                    <ProfileEditProForm />
                    <Separator className="my-8" />
                    <ProfileEditEducationsForm />
                    <Separator className="my-8" />
                    <ProfileEditExperiencesForm />
                    <Separator className="my-8" />
                    <ProfileEditOtherForm />
                    <Separator className="my-8" />
                    <div className="flex items-center justify-end space-x-4">
                        <Button type="submit" className="whitespace-nowrap">
                            Modifier le profil
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}