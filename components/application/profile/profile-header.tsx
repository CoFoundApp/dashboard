import ContactButton from "@/components/global/contact-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Link from "next/link";

interface ProfileHeaderProps {
    display_name: string;
    headline: string;
    avatar_url: string | null;
    user_id: string;
    isEditable?: boolean;
    isContactable?: boolean;
}

export default function ProfileHeader({
    display_name,
    headline,
    avatar_url,
    user_id,
    isEditable = false,
    isContactable = false,
}: ProfileHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-center gap-8">
                <Avatar className="size-20">
                    <AvatarImage src={avatar_url ?? ""} alt={display_name} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
                        {display_name.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        {display_name}
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        {headline}
                    </p>
                </div>
            </div>
            {isContactable && (
                <ContactButton user_id={user_id} />
            )}
            {isEditable && (
                <Button asChild>
                    <Link href={`/my-profile/edit`}>
                        <Edit className="size-4 mr-1" />
                        Modifier mon profil
                    </Link>
                </Button>
            )}
        </div>
    );
}