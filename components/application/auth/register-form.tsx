"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { REGISTER } from "@/graphql/auth";
import { RegisterSchema } from "@/schemas/auth";
import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { useRef, useEffect } from "react";

export default function RegisterForm() {
    const router = useRouter();
    const [register, { loading, error: mutationError, reset }] = useMutation(REGISTER, {
        errorPolicy: 'all'
    });
    
    const submitButtonRef = useRef<HTMLButtonElement>(null);
    const isSubmitting = useRef(false);

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onTouched",
    });

    useEffect(() => {
        if (mutationError) {
            const subscription = form.watch(() => {
                reset();
            });
            return () => subscription.unsubscribe();
        }
    }, [mutationError, reset, form]);

    const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
        // Protection contre les soumissions multiples
        if (isSubmitting.current || loading) {
            return;
        }

        isSubmitting.current = true;
        const { email, password } = values;

        try {
            const { data, errors } = await register({
                variables: {
                    input: {
                        email,
                        password
                    },
                },
            });

            if (errors && errors.length > 0) {
                const errorMessage = errors[0]?.message || "Une erreur est survenue lors de l'inscription.";
                toast.error("Échec de l'inscription", {
                    description: errorMessage,
                });
                isSubmitting.current = false;
                return;
            }

            if (data) {
                toast.success("Inscription réussie !", {
                    description: "Vous allez être redirigé vers la page de connexion...",
                });

                form.reset();

                setTimeout(() => {
                    router.push("/login");
                    router.refresh();
                }, 800);
            }
        } catch (err) {
            const errorMessage = err instanceof Error 
                ? err.message 
                : "Une erreur réseau est survenue. Veuillez réessayer.";
            
            toast.error("Oups !", {
                description: errorMessage,
            });

            submitButtonRef.current?.focus();
        } finally {
            isSubmitting.current = false;
        }
    };

    return (
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                aria-busy={loading}
                aria-live="polite"
                noValidate
            >
                <div className="grid gap-8">
                    <div className="flex flex-col gap-4">
                        <Button 
                            variant="outline" 
                            className="w-full" 
                            disabled={loading}
                            type="button"
                            aria-label="S'inscrire avec Google"
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="mr-2 h-4 w-4"
                            >
                                <path
                                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                    fill="currentColor"
                                />
                            </svg>
                            S&apos;inscrire avec Google
                        </Button>
                    </div>
                    <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                        <span className="bg-card text-muted-foreground relative z-10 px-2">
                            Ou continue avec
                        </span>
                    </div>
                    <div className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="email">Adresse e-mail</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="dark-vador@etoile-noir.com"
                                            autoComplete="email"
                                            inputMode="email"
                                            disabled={loading}
                                            aria-required="true"
                                            aria-invalid={!!form.formState.errors.email}
                                            aria-describedby={form.formState.errors.email ? "email-error" : undefined}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage id="email-error" role="alert" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="password">Mot de passe</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="password"
                                            type="password"
                                            autoComplete="new-password"
                                            disabled={loading}
                                            aria-required="true"
                                            aria-invalid={!!form.formState.errors.password}
                                            aria-describedby={form.formState.errors.password ? "password-error" : undefined}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage id="password-error" role="alert" />
                                </FormItem>
                            )}
                        />
                        <Button 
                            ref={submitButtonRef}
                            type="submit" 
                            className="w-full" 
                            disabled={loading || isSubmitting.current || !form.formState.isValid}
                            aria-label={loading ? "Création du compte en cours" : "S'inscrire"}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />
                                    Création du compte...
                                </>
                            ) : (
                                "S'inscrire"
                            )}
                        </Button>
                    </div>
                    <div className="text-center text-sm">
                        Vous avez déjà un compte ?{" "}
                        <Link 
                            href="/login" 
                            className="underline underline-offset-4"
                            tabIndex={loading ? -1 : 0}
                        >
                            Se connecter
                        </Link>
                    </div>
                </div>
            </form>
        </Form>
    );
}
