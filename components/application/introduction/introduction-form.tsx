"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Loader2 } from "lucide-react";
import { useMutation } from "@apollo/client/react";
import { UPDATE_MY_PROFILE } from "@/graphql/profile";
import { sideCannons } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { IntroductionSchema } from "@/schemas/introduction";
import { Input } from "@/components/ui/input";

export default function IntroductionForm() {
    const router = useRouter();

    const [updateMyProfile, { loading }] = useMutation(UPDATE_MY_PROFILE);

    const form = useForm<z.infer<typeof IntroductionSchema>>({
        mode: "onTouched",
        resolver: zodResolver(IntroductionSchema),
        defaultValues: {
            display_name: "",
            headline: "",
        }
    });

    const onSubmit = (values: z.infer<typeof IntroductionSchema>) => {
        const { display_name, headline } = values;

        updateMyProfile({
            variables: {
                input: {
                    display_name, headline
                }
            }
        })
            .then(() => {
                sideCannons();
                toast.success("Profil créé !", {
                    description: "Vous avez créé votre profil avec succès.",
                });
                router.push("/");
            })
            .catch((err: Error) => {
                console.log(err)
                toast.error("Oups !", {
                    description: err.message || "Une erreur est survenue.",
                });
            })
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                aria-busy={loading}
            >
                <div className="grid gap-6">
                    <div className="flex flex-col items-center gap-1 text-center">
                        <h1 className="text-2xl font-bold">Fais-toi remarquer !</h1>
                        <p className="text-muted-foreground text-sm">
                            Comment veux-tu qu’on te reconnaisse ?
                        </p>
                    </div>
                    <div className="grid gap-6">
                        <FormField
                            control={form.control}
                            name="display_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nom d'utilisateur</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Entrez votre nom d'utilisateur..."
                                            {...field}
                                            disabled={loading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="headline"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Titre professionnel</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Entrez votre titre professionnel..."
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
                                    Initialisation...
                                </>
                            ) : (
                                "C'est parti !"
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
}