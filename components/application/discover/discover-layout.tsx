"use client";

import { useState } from "react";
import DiscoverFilters, { ProjectFilters, SortOption } from "./discover-filters";
import DiscoverHeader from "./discover-header";
import DiscoverList from "./discover-list";

export default function DiscoverLayout() {
    const [filters, setFilters] = useState<ProjectFilters>({});
    const [sort, setSort] = useState<SortOption>({ by: "CREATED_AT", direction: "desc" });

    const handleFiltersChange = (newFilters: ProjectFilters) => {
        setFilters(newFilters);
    }

    const handleSortChange = (newSort: SortOption) => {
        setSort(newSort);
    }

    return (
        <section className="space-y-12">
            <DiscoverHeader />
            <div className="space-y-6">
                <DiscoverFilters onFiltersChange={handleFiltersChange} onSortChange={handleSortChange} />
                <DiscoverList filters={filters} sort={sort} />
            </div>
        </section>
    );
}