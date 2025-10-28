"use client"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function FeedbackBubble() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {isOpen ? (
                <Card className="mb-4 w-80 shadow-lg animate-in slide-in-from-bottom-2">
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <CardTitle className="text-lg">Aidez-nous à faire grandir CoFound 🚀</CardTitle>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 -mt-1 -mr-1"
                                onClick={() => setIsOpen(false)}
                            >
                                <X className="h-4 w-4" />
                                <span className="sr-only">Fermer</span>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            CoFound évolue grâce à vos retours 💡  
                            Partagez votre expérience, vos idées ou vos suggestions pour améliorer la plateforme.
                        </p>
                        <Button asChild className="w-full">
                            <a
                                href={process.env.NEXT_PUBLIC_GOOGLE_FORM}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Donner mon avis
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <Button
                    size="icon"
                    className="h-14 w-14 rounded-full shadow-lg"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <MessageCircle className="h-6 w-6" />
                    <span className="sr-only">Ouvrir les retours CoFound</span>
                </Button>
            )}
        </div>
    );
}
