import z from "zod";

export const LoginSchema = z.object({
    email: z
        .string()
        .email({
            message: "Vous devez renseigner une adresse e-mail valide.",
        }),
    password: z
        .string()
        .min(8, {
            message: "Votre mot de passe doit faire 8 caractères minimum.",
        })
});

export const RegisterSchema = z.object({
    email: z
        .string()
        .email({
            message: "Vous devez renseigner une adresse e-mail valide.",
        }),
    password: z
        .string()
        .min(8, {
            message: "Votre mot de passe doit faire 8 caractères minimum.",
        }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Les mots de passe ne correspondent pas.",
});

export const RequestPasswordResetSchema = z.object({
    email: z
        .string()
        .email({
            message: "Vous devez renseigner une adresse e-mail valide.",
        }),
});

export const ResetPasswordSchema = z.object({
    password: z
        .string()
        .min(8, {
            message: "Votre mot de passe doit faire 8 caractères minimum.",
        }),
    confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
})