import z from "zod";

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
    status: z
        .enum(["ACTIVE", "ARCHIVED", "DRAFT", "PAUSED", "SEEKING"]),
    stage: z
        .enum(["IDEA", "MVP", "SCALE", "TRACTION"]),
    visibility: z
        .enum(["PRIVATE", "PUBLIC", "UNLISTED"]),
    tags: z
        .array(z.string())
        .min(1, { message: "Vous devez renseigner un tag minimum." })
        .default([]),
    project_interests: z
        .array(z.string())
        .min(1, { message: "Vous devez renseigner un intérêt minimum." })
        .default([]),
    project_skills: z
        .array(z.string())
        .min(1, { message: "Vous devez renseigner une compétence minimum." })
        .default([]),
});