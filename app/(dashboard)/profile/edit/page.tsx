import MyProfileEditLayout from "@/components/application/profile/edit/profile-edit-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CoFound - Mon profil",
}

export default function MyProfileEditPage() {
    return (
        <MyProfileEditLayout />
    );
}