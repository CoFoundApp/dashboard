"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface LearningFiltersProps {
    onFiltersChange: (filters: CourseFilters) => void;
}

export interface CourseFilters {
    search?: string;
}

export default function LearningFilters({ onFiltersChange }: LearningFiltersProps) {
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            onFiltersChange({
                search: searchValue.trim() || undefined,
            });
        }, 500);

        return () => clearTimeout(timer);
    }, [searchValue, onFiltersChange]);

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
