import z from "zod";

export const IntroductionSchema = z.object({
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
});

export const EducationSchema = z.object({
    school: z.string().min(1, { message: "L'école est requise." }),
    degree: z.string().optional(),
    field_of_study: z.string().optional(),
    start_date: z.string().min(1, { message: "La date de début est requise." }),
    end_date: z.string().optional(),
    grade: z.string().optional(),
    description: z.string().optional(),
    is_current: z.boolean().default(false),
})

export const WorkExperienceSchema = z.object({
    company: z.string().min(1, { message: "L'entreprise est requise." }),
    title: z.string().min(1, { message: "Le titre est requis." }),
    location: z.string().optional(),
    start_date: z.string().min(1, { message: "La date de début est requise." }),
    end_date: z.string().optional(),
    description: z.string().optional(),
    is_current: z.boolean().default(false),
})

export const LanguageCode = z.enum(["de", "en", "es", "fr", "it"]);