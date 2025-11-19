import MyApplicationsLayout from "@/components/application/my-applications/my-applications-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CoFound - Mes candidatures",
}

export default function MyApplicationsPage() {
    return (
        <MyApplicationsLayout />
    );
}