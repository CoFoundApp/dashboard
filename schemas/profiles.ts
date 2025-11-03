import z from "zod";
import { EducationSchema, LanguageCode, WorkExperienceSchema } from "./introduction";
import { CultureValues, CultureWorkStyles } from "./projects";

export const PrimaryMotivationsValues = z.enum(["CREATE", "EARN", "HELP", "LEARN", "TEACH"]);
export const EnvironmentValues = z.enum(["ENTERPRISE", "SCALEUP", "SOLO", "STARTUP"]);

const emptyToUndefined = (v: unknown) => v === "" || v === null ? undefined : v;

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
        })
        .max(100, {
            message: "Votre titre doit faire 100 caractères maximum.",
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
    core_values: z
        .array(CultureValues)
        .optional(),
    primary_motivations: z
        .array(PrimaryMotivationsValues)
        .optional(),
    desired_team_role: z
        .enum(["CONTRIBUTOR", "LEADER", "LEARNER", "MENTOR"])
        .optional(),
    preferred_collaboration_mode: z
        .enum(["ASYNCHRONOUS", "HYBRID", "SYNCHRONOUS"])
        .optional(),
    preferred_environments: z
        .array(EnvironmentValues)
        .optional(),
    preferred_team_size: z
        .enum(["FLEXIBLE", "LARGE", "MEDIUM", "SMALL"])
        .optional(),
    preferred_work_styles: z
        .array(CultureWorkStyles)
        .optional(),
    communication_style: z
        .enum(["CASUAL", "DIPLOMATIC", "DIRECT", "FORMAL"])
        .optional(),
    communication_frequency: z
        .enum(["ASYNC", "BIWEEKLY", "DAILY", "WEEKLY"])
        .optional(),
    availability_hours: z
        .preprocess(
            emptyToUndefined,
            z.coerce.number({
                message: "Vous devez renseigner un nombre valide.",
            })
            .int()
            .min(0, { message: "Le nombre d'heures doit être positif." })
        )
        .optional(),
    mission_duration_min_weeks: z
        .preprocess(
            emptyToUndefined,
            z.coerce.number({
                message: "Vous devez renseigner un nombre valide.",
            })
            .int()
            .min(0, { message: "Le nombre de jours doit être positif." })
        )
        .optional(),
    mission_duration_max_weeks: z
        .preprocess(
            emptyToUndefined,
            z.coerce.number({
                message: "Vous devez renseigner un nombre valide.",
            })
            .int()
            .min(0, { message: "Le nombre de jours doit être positif." })
        )
        .optional(),
    remote_preference_percent: z
        .preprocess(
            emptyToUndefined,
            z.coerce.number({
                message: "Vous devez renseigner un nombre valide.",
            })
            .int()
            .min(0, { message: "Le nombre doit être positif." })
            .max(100, { message: "Le pourcentage doit être entre 0 et 100." })
        )
        .optional(),
    timezone: z
        .string({
            message: "Vous devez renseigner une chaîne de caractère valide.",
        })
        .optional(),
    timezone_flexibility_minutes: z
        .preprocess(
            emptyToUndefined,
            z.coerce.number({
                message: "Vous devez renseigner un nombre valide.",
            })
            .int()
            .min(0, { message: "Le nombre doit être positif." })
        )
        .optional(),
    looking_for: z
        .string({
            message: "Vous devez renseigner une chaîne de caractère valide.",
        })
        .optional(),
})