import MyProfileLayout from "@/components/application/profile/my-profile-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CoFound - Mon profil",
}

export default function MyProfilePage() {
    return (
        <MyProfileLayout />
    );
}