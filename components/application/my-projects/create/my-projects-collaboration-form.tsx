import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { COLLABORATION_MODE_OPTIONS, COMMUNICATION_FREQUENCY_OPTIONS, COMMUNICATION_STYLE_OPTIONS, ENVIRONMENT_OPTIONS } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

export default function MyProjectsCollaborationForm() {
    const { control } = useFormContext();

    return (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <h2 className="font-semibold text-foreground">
                Communication & Collaboration
            </h2>
            <div className="md:col-span-2">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
                    <div className="col-span-full sm:col-span-3">
                        <FormField
                            control={control}
                            name="communication_style"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Style de communication</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Style de communication" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {COMMUNICATION_STYLE_OPTIONS.map((opt) => (
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
                    <div className="col-span-full sm:col-span-3">
                        <FormField
                            control={control}
                            name="communication_frequency"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Fréquence de communication</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Fréquence de communication" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {COMMUNICATION_FREQUENCY_OPTIONS.map((opt) => (
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
                    <div className="col-span-full sm:col-span-3">
                        <FormField
                            control={control}
                            name="collaboration_mode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mode de collaboration</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Mode de collaboration" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {COLLABORATION_MODE_OPTIONS.map((opt) => (
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
                    <div className="col-span-full sm:col-span-3">
                        <FormField
                            control={control}
                            name="environment"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Environnement de travail</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Environnement de travail" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {ENVIRONMENT_OPTIONS.map((opt) => (
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