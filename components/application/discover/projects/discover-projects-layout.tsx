"use client";

import { useState } from "react";
import DiscoverProjectsHeader from "./discover-projects-header";
import DiscoverProjectsFilters, { ProjectFilters, SortOption } from "./discover-projects-filters";
import DiscoverProjectsList from "./discover-projects-list";

export default function DiscoverProjectsLayout() {
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
            <DiscoverProjectsHeader />
            <div className="space-y-6">
                <DiscoverProjectsFilters onFiltersChange={handleFiltersChange} onSortChange={handleSortChange} />
                <DiscoverProjectsList filters={filters} sort={sort} />
            </div>
        </section>
    );
}