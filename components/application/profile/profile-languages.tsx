import { Badge } from "@/components/ui/badge";

interface ProfileLanguagesProps {
    languages: string[];
}

export default function ProfileLanguages({
    languages
}: ProfileLanguagesProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Langues</h2>
            <div className="flex flex-wrap gap-2">
                {languages.map((language) => (
                    <Badge key={language} variant="secondary" className="text-sm">
                        {language}
                    </Badge>
                ))}
            </div>
        </div>
    );
}