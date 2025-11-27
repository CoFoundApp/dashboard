"use client";

import { useState } from "react";
import LearningHeader from "./learning-header";
import LearningFilters, { CourseFilters } from "./learning-filters";
import LearningList from "./learning-list";

export default function LearningLayout() {
    const [filters, setFilters] = useState<CourseFilters>({});
    
    const handleFiltersChange = (newFilters: CourseFilters) => {
        setFilters(newFilters);
    }

    return (
        <section className="space-y-12">
            <LearningHeader />
            <div className="space-y-6">
                <LearningFilters onFiltersChange={handleFiltersChange} />
                <LearningList filters={filters} />
            </div>
        </section>
    );
}