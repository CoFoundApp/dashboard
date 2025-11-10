"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RequestPasswordResetSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useMutation } from '@apollo/client/react';
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { REQUEST_PASSWORD_RESET } from "@/graphql/auth";

export default function ForgotPasswordForm() {
    const router = useRouter();
    const [requestPasswordReset, { loading }] = useMutation(REQUEST_PASSWORD_RESET);

    const form = useForm<z.infer<typeof RequestPasswordResetSchema>>({
        resolver: zodResolver(RequestPasswordResetSchema),
        defaultValues: {
            email: "",
        },
        mode: "onTouched",
    });

    const onSubmit = (values: z.infer<typeof RequestPasswordResetSchema>) => {
        const { email } = values;
        requestPasswordReset({ 
            variables: { 
                input: {
                    email 
                }
            } 
        })
            .then(() => {
                toast.success("Demande réussie !", {
                    description: "Un mail de réinitialisation de votre mot de passe vous a été envoyée.",
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
                    <div className="flex flex-col items-center gap-1 text-center">
                        <h1 className="text-2xl font-bold">Mot de passe oublié</h1>
                        <p className="text-muted-foreground text-sm">
                            Remplissez votre adresse e-mail et vous recevrez un lien de réinitialisation
                        </p>
                    </div>
                    <div className="grid gap-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Adresse e-mail</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Entrez votre adresse e-mail..."
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
                                    Demande en cours...
                                </>
                            ) : (
                                "Demander la réinitialisation"
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
}