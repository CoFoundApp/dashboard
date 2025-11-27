"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface LearningFiltersProps {
    onFiltersChange: (filters: CourseFilters) => void;
}

export interface CourseFilters {
    search?: string;
}

export default function LearningFilters({ onFiltersChange }: LearningFiltersProps) {
    const [searchValue, setSearchValue] = useState("");
    
    const debouncedSearch = useCallback(
        (value: string) => {
            const timer = setTimeout(() => {
                updateFilters({ search: value });
            }, 500);

            return () => clearTimeout(timer);
        },
        [],
    );

    useEffect(() => {
        const cleanup = debouncedSearch(searchValue);
        return cleanup;
    }, [searchValue, debouncedSearch]);

    const updateFilters = (updates: Partial<CourseFilters>) => {
        const filters: CourseFilters = {
            search: searchValue || undefined,
            ...updates,
        }
        onFiltersChange(filters);
    }

    return (
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                    placeholder="Rechercher un cours..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="pl-9"
                />
            </div>
        </div>
    );
}