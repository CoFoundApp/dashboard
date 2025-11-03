"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface DiscoverProfilesFiltersProps {
    onFiltersChange: (filters: ProfileFilters) => void;
}

export interface ProfileFilters {
    search?: string;
    skills?: string[];
}

export default function DiscoverProfilesFilters({ onFiltersChange }: DiscoverProfilesFiltersProps) {
    const [searchValue, setSearchValue] = useState("");
    const [selectedSkills, setSelectedSkills] = useState([]);

    const updateFilters = (updates: Partial<ProfileFilters>) => {
        const filters: ProfileFilters = {
            search: searchValue || undefined,
        }
        onFiltersChange(filters);
    }

    const debouncedSearch = useCallback(
        (value: string) => {
            const timer = setTimeout(() => {
                updateFilters({ search: value });
            }, 500);

            return () => clearTimeout(timer);
        },
        [updateFilters]
    );

    useEffect(() => {
        const cleanup = debouncedSearch(searchValue);
        return cleanup;
    }, [searchValue, debouncedSearch]);

    return (
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                    placeholder="Rechercher un profil..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="pl-9"
                />
            </div>
        </div>
    );
}