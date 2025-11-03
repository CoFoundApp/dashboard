import MyProjectsCreateLayout from "@/components/application/my-projects/create/my-projects-create-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CoFound - Mes projets",
}

export default function MyProjectsCreatePage() {
    return (
        <MyProjectsCreateLayout />
    );
}