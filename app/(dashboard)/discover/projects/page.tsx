import DiscoverProjectsLayout from "@/components/application/discover/projects/discover-projects-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CoFound - Découvrir des projets",
}

export default function DiscoverProjectsPage() {
    return (
        <DiscoverProjectsLayout />
    );
}