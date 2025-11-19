import MyMessagesLayout from "@/components/application/my-messages/my-messages-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CoFound - Mes messages",
}

export default function MyMessages() {
    return (
        <MyMessagesLayout />
    );
}