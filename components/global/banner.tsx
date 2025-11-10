"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface BannerProps {
    title: string;
    description: string;
    linkText: string;
    linkUrl: string;
    defaultVisible?: boolean;
}

export default function Banner({
    title, description, linkText, linkUrl, defaultVisible = true
}) {
    const [isVisible, setIsVisible] = useState(defaultVisible);

    const handleClose = () => {
        setIsVisible(false);
    }

    if (!isVisible) return null;

    return (
        <section className="bg-primary w-full border-b px-4 py-3">
            <div className="flex items-center justify-between gap-2">
                <div className="flex-1 text-center">
                    <span className="text-sm">
                        <span className="text-primary-foreground">{title}</span>{" "}
                        <span className="text-primary-foreground">
                            {description}{" "}
                            <Link
                                href={linkUrl}
                                className="underline underline-offset-2"
                            >
                                {linkText}
                            </Link>
                        </span>
                    </span>
                </div>
                <Button
                    variant="link"
                    size="icon"
                    className="mr-2 size-8 flex-none text-primary-foreground"
                    onClick={handleClose}
                >
                    <X className="size-4" />
                </Button>
            </div>
        </section>
    );
}