import DiscoverProfilesLayout from "@/components/application/discover/profiles/discover-profiles-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CoFound - Découvrir des profils",
}

export default function DiscoverProfilesPage() {
    return (
        <DiscoverProfilesLayout />
    );
}