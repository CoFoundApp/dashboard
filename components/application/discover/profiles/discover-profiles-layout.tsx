"use client";

import { useState } from "react";
import DiscoverProfilesHeader from "./discover-profiles-header";
import DiscoverProfilesFilters, { ProfileFilters } from "./discover-profiles-filters";
import DiscoverProfilesList from "./discover-profiles-list";

export default function DiscoverProfilesLayout() {
    const [filters, setFilters] = useState<ProfileFilters>({});

    const handleFiltersChange = (newFilters: ProfileFilters) => {
        setFilters(newFilters);
    }

    return (
        <section className="space-y-12">
            <DiscoverProfilesHeader />
            <div className="space-y-6">
                <DiscoverProfilesFilters onFiltersChange={handleFiltersChange} />
                <DiscoverProfilesList filters={filters} />
            </div>
        </section>
    );
}