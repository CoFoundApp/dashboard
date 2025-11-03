import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export default function MyProjectsDisponibilityForm() {
    const { control } = useFormContext();

    return (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <h2 className="font-semibold text-foreground">
                Culture & mode de travail
            </h2>
            <div className="md:col-span-2">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
                    <div className="col-span-full">
                        <FormField
                            control={control}
                            name="timezone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Fuseau horaire principal</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Entrez le fuseau horaire..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="col-span-full sm:col-span-3">
                        <FormField
                            control={control}
                            name="remote_ratio_min"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Télétravail minimum (%)</FormLabel>
                                    <FormControl>
                                        <Input
                                            min={0}
                                            step={1}
                                            placeholder="Entrez votre pourcentage..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="col-span-full sm:col-span-3">
                        <FormField
                            control={control}
                            name="remote_ratio_max"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Télétravail maximum (%)</FormLabel>
                                    <FormControl>
                                        <Input
                                            min={0}
                                            step={1}
                                            placeholder="Entrez votre pourcentage..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}