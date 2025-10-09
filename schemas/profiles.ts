import z from "zod";
import { EducationSchema, LanguageCode, WorkExperienceSchema } from "./introduction";

export const ProfileSchema = z.object({
    display_name: z
        .string({
            message: "Vous devez renseigner un nom d'utilisateur valide."
        })
        .min(3, {
            message: "Votre nom d'utilisateur doit faire 3 caractères minimum.",
        }),
    headline: z
        .string({
            message: "Vous devez renseigner un titre valide.",
        })
        .min(3, {
            message: "Votre titre doit faire 3 caractères minimum.",
        }),
    bio: z
        .string({
            message: "Vous devez renseigner une description valide.",
        })
        .optional(),
    avatar: z
        .array(z.instanceof(File))
        .max(1, "Un seul logo est autorisé")
        .optional()
        .transform((files) => files?.[0] || undefined)
        .refine((file) => !file || file.size <= 5 * 1024 * 1024, "L'image doit faire moins de 5MB")
        .refine(
            (file) => !file || ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type),
            "Seuls les formats JPG, PNG et WebP sont acceptés",
        ),
    visibility: z
        .enum(["PRIVATE", "PUBLIC", "UNLISTED"]),
    location: z
        .string({
            message: "Vous devez renseigner une localisation valide.",
        })
        .optional(),
    availability_hours: z
        .number({
            message: "Vous devez renseigner un nombre d'heures valide.",
        })
        .int()
        .min(0, { message: "Le nombre d'heures doit être positif." })
        .optional(),
    looking_for: z
        .string({
            message: "Vous devez renseigner une chaîne de caractère valide.",
        })
        .optional(),
    educations: z.array(EducationSchema).default([]),
    work_experiences: z.array(WorkExperienceSchema).default([]),
    languages: z
        .array(LanguageCode)
        .min(1, { message: "Sélectionnez au moins une langue." })
        .default([]),
    skills: z
        .array(z.string())
        .min(1, { message: "Vous devez renseigner une compétence minimum." })
        .default([]),
    interests: z
        .array(z.string())
        .min(1, { message: "Vous devez renseigner un intérêt minimum." })
        .default([]),
    tags: z
        .array(z.string())
        .min(1, { message: "Vous devez renseigner un tag minimum." })
        .default([]),
})