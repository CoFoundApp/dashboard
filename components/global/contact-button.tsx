"use client";

import { useMutation } from "@apollo/client/react";
import { Button } from "../ui/button";
import { CREATE_CONVERSATION } from "@/graphql/conversations";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";

interface ContactButtonProps {
    user_id: string;
    buttonSize?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg" | null | undefined;
    className?: string;
}

export default function ContactButton({
    user_id,
    buttonSize = "default",
    className
}: ContactButtonProps) {
    const router = useRouter();

    const [createConversation, { loading }] = useMutation(CREATE_CONVERSATION, {
        onCompleted: () => {
            router.push("/messages");
        },
        onError: () => {
            toast.error("Oups !", {
                description: "Une erreur s'est produite lors de la création de la conversation.",
            });
        }
    });

    const handleContact = () => {
        createConversation({
            variables: { user_id: user_id },
        });
    }

    return (
        <Button 
            size={buttonSize}
            onClick={handleContact}
            disabled={loading}
            className={className}
        >
            <MessageCircle className="size-4 mr-2" />
            {loading ? "Création..." : "Contacter"}
        </Button>
    );
}