import z from "zod";

const emptyToUndefined = (v: unknown) => v === "" || v === null ? undefined : v;

export const ProjectPositionSchema = z.object({
    title: z
        .string({
            message: "Vous devez renseigner un titre valide."
        })
        .min(1, {
            message: "Vous devez spécifier le titre du projet.",
        }),
    description: z
        .string({
            message: "Vous devez renseigner une description valide.",
        })
        .optional(),
    project_id: z
        .string({
            message: "Vous devez renseigner un projet valide.",
        }),
});

export const CultureValues = z.enum(["GROWTH", "INNOVATION", "SOCIAL_IMPACT", "STABILITY"]);
export const CultureWorkStyles = z.enum(["AGILE", "AUTONOMOUS", "COLLABORATIVE", "STRUCTURED"]);

export const ProjectSchema = z.object({
    title: z
        .string({
            message: "Vous devez renseigner un titre valide."
        })
        .min(1, {
            message: "Vous devez spécifier le titre du projet.",
        }),
    summary: z
        .string({
            message: "Vous devez renseigner un résumé valide.",
        })
        .min(3, {
            message: "Vous devez spécifier le résumé du projet.",
        })
        .max(120, {
            message: "Votre résumé doit faire 120 caractères maximum.",
        }),
    description: z
        .string({
            message: "Vous devez renseigner une description valide.",
        })
        .optional(),
    industry: z
        .string({
            message: "Vous devez renseigner un secteur valide.",
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
    tags: z
        .array(z.string())
        .min(1, { message: "Vous devez renseigner un tag minimum." })
        .default([]),
    status: z
        .enum(["ACTIVE", "ARCHIVED", "DRAFT", "PAUSED", "SEEKING"]),
    stage: z
        .enum(["IDEA", "MVP", "SCALE", "TRACTION"]),
    visibility: z
        .enum(["PRIVATE", "PUBLIC", "UNLISTED"]),
    culture_values: z
        .array(CultureValues)
        .optional(),
    culture_work_styles: z
        .array(CultureWorkStyles)
        .optional(),
    management_style: z
        .enum(["COACHING", "HANDS_OFF", "HANDS_ON", "SELF_MANAGED"])
        .optional(),
    communication_style: z
        .enum(["CASUAL", "DIPLOMATIC", "DIRECT", "FORMAL"])
        .optional(),
    communication_frequency: z
        .enum(["ASYNC", "BIWEEKLY", "DAILY", "WEEKLY"])
        .optional(),
    collaboration_mode: z
        .enum(["ASYNCHRONOUS", "HYBRID", "SYNCHRONOUS"])
        .optional(),
    environment: z
        .enum(["ENTERPRISE", "SCALEUP", "SOLO", "STARTUP"])
        .optional(),
    preferred_team_role: z
        .enum(["CONTRIBUTOR", "LEADER", "LEARNER", "MENTOR"])
        .optional(),
    preferred_team_size: z
        .enum(["FLEXIBLE", "LARGE", "MEDIUM", "SMALL"])
        .optional(),
    project_interests: z
        .array(z.string())
        .min(1, { message: "Vous devez renseigner un intérêt minimum." })
        .default([]),
    project_skills: z
        .array(z.string())
        .min(1, { message: "Vous devez renseigner une compétence minimum." })
        .default([]),
    required_hours_min: z
        .preprocess(
            emptyToUndefined,
            z.coerce.number({
                message: "Vous devez renseigner un nombre valide.",
            })
            .int()
            .min(0, { message: "Le nombre d'heures doit être positif." })
        )
        .optional(),
    required_hours_max: z
        .preprocess(
            emptyToUndefined,
            z.coerce.number({
                message: "Vous devez renseigner un nombre valide.",
            })
            .int()
            .min(0, { message: "Le nombre d'heures doit être positif." })
        )
        .optional(),
    duration_weeks_min: z
        .preprocess(
            emptyToUndefined,
            z.coerce.number({
                message: "Vous devez renseigner un nombre valide.",
            })
            .int()
            .min(0, { message: "Le nombre de jours doit être positif." })
        )
        .optional(),
    duration_weeks_max: z
        .preprocess(
            emptyToUndefined,
            z.coerce.number({
                message: "Vous devez renseigner un nombre valide.",
            })
            .int()
            .min(0, { message: "Le nombre de jours doit être positif." })
        )
        .optional(),
    urgency: z
        .enum(["CRITICAL", "HIGH", "LOW", "MEDIUM"])
        .optional(),
    timezone: z
        .string({
            message: "Vous devez renseigner une chaîne de caractère valide.",
        })
        .optional(),
    remote_ratio_min: z
        .preprocess(
            emptyToUndefined,
            z.coerce.number({
                message: "Vous devez renseigner un nombre valide.",
            })
            .int()
            .min(0, { message: "Le pourcentage doit être positif." })
            .max(100, { message: "Le pourcentage doit être entre 0 et 100." })
        )
        .optional(),
    remote_ratio_max: z
        .preprocess(
            emptyToUndefined,
            z.coerce.number({
                message: "Vous devez renseigner un nombre valide.",
            })
            .int()
            .min(0, { message: "Le pourcentage doit être positif." })
            .max(100, { message: "Le pourcentage doit être entre 0 et 100." })
        )
        .optional(),
});