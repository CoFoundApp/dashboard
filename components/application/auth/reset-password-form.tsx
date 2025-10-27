"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RequestPasswordResetSchema, ResetPasswordSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useMutation } from '@apollo/client/react';
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { RESET_PASSWORD } from "@/graphql/auth";
import { useState } from "react";

export default function ResetPasswordForm() {
    const [showPassword, setShowPassword] = useState(false);
    
    const router = useRouter();
    const searchParams = useSearchParams();
    const [resetPassword, { loading }] = useMutation(RESET_PASSWORD);

    const form = useForm<z.infer<typeof ResetPasswordSchema>>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
        mode: "onTouched",
    });

    const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
        const token = searchParams.get("token");
        const { password } = values;

        if (!token) {
            toast.error("Réinitialisation échouée !", {
                description: "Le lien de réinitialisation est invalide ou a expiré.",
            });
        }

        resetPassword({ 
            variables: { 
                input: {
                    token,
                    password 
                }
            } 
        })
            .then(() => {
                toast.success("Réinitialisation réussie !", {
                    description: "Vous avez réinitialisé votre mot de passe avec succès.",
                });
                router.push("/");
            })
            .catch((err: Error) => {
                toast.error("Oups !", {
                    description: err.message || "Une erreur est survenue.",
                });
            });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} aria-busy={loading}>
                <div className="grid gap-6">
                    <div className="grid gap-6">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mot de passe</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                {...field}
                                                disabled={loading}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                                disabled={loading}
                                                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                                            >
                                                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mot de passe (Confirmation)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            {...field}
                                            disabled={loading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" />
                                    Réinitialisation...
                                </>
                            ) : (
                                "Réinitialiser votre mot de passe"
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
}