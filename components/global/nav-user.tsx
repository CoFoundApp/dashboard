"use client"

import type React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { useQuery } from "@apollo/client/react"
import { GET_NAVIGATION, type GetNavigationResult } from "@/graphql/navigation"
import { Skeleton } from "../ui/skeleton"
import { ChevronDown, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface NavUserProps {
    menu?: {
        title: string;
        url: string;
        icon?: React.ReactNode;
    }[];
}

export default function NavUser({ menu }: NavUserProps) {
    const router = useRouter();
    const { data, loading, error, refetch } = useQuery<GetNavigationResult>(GET_NAVIGATION, {
        fetchPolicy: "cache-and-network",
        errorPolicy: "all",
    });

    const handleLogout = async () => {
        try {
            toast.success("Déconnexion réussie", {
                description: "À bientôt !",
            });

            router.push("/login");
        } catch (error) {
            toast.error("Erreur lors de la déconnexion", {
                description: "Veuillez réessayer.",
            });
        }
    }

    if (loading) {
        return (
            <div className="flex items-center gap-2">
                <Skeleton className="h-9 w-9 rounded-full" />
                <Skeleton className="h-4 w-20 hidden md:block" />
            </div>
        );
    }

    if (error) {
        return (
            <Button variant="ghost" size="sm" onClick={() => refetch()} className="text-sm">
                Réessayer
            </Button>
        );
    }

    if (!data) {
        return (
            <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Se connecter</Link>
            </Button>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-auto p-1.5 rounded-full hover:bg-accent/50 transition-colors focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0"
                    aria-label={`Menu utilisateur pour ${data.myProfile.display_name}`}
                >
                    <div className="flex items-center gap-2">
                        <Avatar className="size-8 border border-border/50">
                            <AvatarImage
                                src="/placeholder.svg"
                                alt={`Photo de profil de ${data.myProfile.display_name}`}
                                className="object-cover"
                            />
                            <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                                {data.myProfile.display_name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex items-center gap-2 pr-1">
                            <span className="text-sm font-medium text-foreground">{data.myProfile.display_name}</span>
                            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount sideOffset={12}>
                <DropdownMenuLabel className="font-normal pb-2">
                    <div className="flex flex-col space-y-2">
                        <p className="text-sm font-medium leading-none">{data.myProfile.display_name}</p>
                        <p className="text-xs text-muted-foreground leading-none">{data.myEmail}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                    {menu?.map((item) => (
                        <DropdownMenuItem key={item.title} asChild className="cursor-pointer">
                            <Link href={item.url} className="flex items-center gap-2 w-full py-2">
                                {item.icon}
                                <span className="text-sm">{item.title}</span>
                            </Link>
                        </DropdownMenuItem>
                    ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-destructive focus:text-destructive py-2"
                >
                    <LogOut className="h-4 w-4 mr-2 text-destructive" />
                    <span className="text-sm">Se déconnecter</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}