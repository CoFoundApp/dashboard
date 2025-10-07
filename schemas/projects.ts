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