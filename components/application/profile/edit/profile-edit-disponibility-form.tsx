import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export default function ProfileEditDisponibilityForm() {
    const { control } = useFormContext();

    return (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <h2 className="font-semibold text-foreground">
                Disponibilités
            </h2>
            <div className="md:col-span-2">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
                    <div className="col-span-full sm:col-span-3">
                        <FormField
                            control={control}
                            name="availability_hours"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Heures disponibles par semaine</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min={0}
                                            step={1}
                                            value={field.value ?? ""}
                                            onChange={(e) =>
                                                field.onChange(e.target.value === "" ? 0 : e.target.valueAsNumber)
                                            }
                                            placeholder="Entrez votre nombre..."
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
                            name="remote_preference_percent"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Préférence de télétravail (%)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min={0}
                                            step={1}
                                            value={field.value ?? ""}
                                            onChange={(e) =>
                                                field.onChange(e.target.value === "" ? 0 : e.target.valueAsNumber)
                                            }
                                            placeholder="Entrez votre pourcentage..."
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
                            name="mission_duration_weeks_min"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Jours minimum par semaine</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min={0}
                                            step={1}
                                            value={field.value ?? ""}
                                            onChange={(e) =>
                                                field.onChange(e.target.value === "" ? 0 : e.target.valueAsNumber)
                                            }
                                            placeholder="Entrez votre nombre..."
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
                            name="mission_duration_weeks_max"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Jours maximum par semaine</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min={0}
                                            step={1}
                                            value={field.value ?? ""}
                                            onChange={(e) =>
                                                field.onChange(e.target.value === "" ? 0 : e.target.valueAsNumber)
                                            }
                                            placeholder="Entrez votre nombre..."
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
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
                    <div className="col-span-full">
                        <FormField
                            control={control}
                            name="looking_for"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ce que vous recherchez actuellement</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Entrez ce que vous recherchez..."
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