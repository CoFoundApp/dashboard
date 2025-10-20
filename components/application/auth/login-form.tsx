"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { LOGIN } from "@/graphql/auth";
import { useRef, useEffect } from "react";
import { useMutation } from "@apollo/client/react";

export default function LoginForm() {
    const router = useRouter();
    const [login, { loading, error: mutationError, reset }] = useMutation(LOGIN, {
        errorPolicy: 'all'
    });
    
    const submitButtonRef = useRef<HTMLButtonElement>(null);
    const isSubmitting = useRef(false);

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
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

    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        if (isSubmitting.current || loading) {
            return;
        }

        isSubmitting.current = true;
        const { email, password } = values;

        try {
            const { data } = await login({ 
                variables: { 
                    input: { email, password }
                } 
            });

            if (data) {
                toast.success("Connexion réussie !", {
                    description: "Vous allez être redirigé...",
                });
                
                form.reset();
                
                setTimeout(() => {
                    router.push("/");
                }, 500);
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
                            aria-label="Se connecter avec Google"
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
                            Se connecter avec Google
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
                                            placeholder="harry-potter@poudlard.com"
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
                                    <div className="flex items-center justify-between">
                                        <FormLabel htmlFor="password">Mot de passe</FormLabel>
                                        <Link 
                                            href="/forgot-password"
                                            className="ml-auto text-sm underline-offset-4 hover:underline"
                                            tabIndex={loading ? -1 : 0}
                                        >
                                            Mot de passe oublié ?
                                        </Link>
                                    </div>
                                    <FormControl>
                                        <Input
                                            id="password"
                                            type="password"
                                            autoComplete="current-password"
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
                            aria-label={loading ? "Connexion en cours" : "Se connecter"}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />
                                    Connexion...
                                </>
                            ) : (
                                "Se connecter"
                            )}
                        </Button>
                    </div>
                    <div className="text-center text-sm">
                        Vous n&apos;avez pas de compte ?{" "}
                        <Link 
                            href="/register" 
                            className="underline underline-offset-4"
                            tabIndex={loading ? -1 : 0}
                        >
                            S&apos;inscrire
                        </Link>
                    </div>
                </div>
            </form>
        </Form>
    );
}
