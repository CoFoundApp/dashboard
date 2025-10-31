import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { URGENCY_OPTIONS } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

export default function MyProjectsCommitmentForm() {
    const { control } = useFormContext();

    return (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <h2 className="font-semibold text-foreground">
                Engagement attendu
            </h2>
            <div className="md:col-span-2">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
                    <div className="col-span-full sm:col-span-3">
                        <FormField
                            control={control}
                            name="required_hours_min"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Heures minimales par jour</FormLabel>
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
                            name="required_hours_max"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Heures maximales par jour</FormLabel>
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
                            name="duration_weeks_min"
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
                            name="duration_weeks_max"
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
                            name="urgency"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Niveau d'urgence</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Niveau d'urgence" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {URGENCY_OPTIONS.map((opt) => (
                                                <SelectItem key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
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