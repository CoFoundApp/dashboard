import DiscoverLayout from "@/components/application/discover/discover-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CoFound - Découvrir des projets",
}

export default function DiscoverPage() {
    return (
        <DiscoverLayout />
    );
}