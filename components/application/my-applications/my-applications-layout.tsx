"use client";

import { useState } from "react";
import MyApplicationsHeader from "./my-applications-header";
import { ApplicationStatus } from "@/graphql/application";
import MyApplicationsFilters from "./my-applications-filters";
import MyApplicationsList from "./my-applications-list";

export default function MyApplicationsLayout() {
    const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "ALL">("ALL");

    return (
        <section className="space-y-12">
            <MyApplicationsHeader />
            <div className="space-y-8">
                <MyApplicationsFilters statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
                <MyApplicationsList statusFilter={statusFilter} />
            </div>
        </section>
    );
}