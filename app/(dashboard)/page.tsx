import DashboardLayout from "@/components/application/dashboard/dashboard-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CoFound - Tableau de bord",
}

export default function DashboardPage() {
    return (
        <DashboardLayout />
    );
}