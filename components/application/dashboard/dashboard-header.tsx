interface DashboardHeaderProps {
    display_name: string;
}

export default function DashboardHeader({
    display_name
}: DashboardHeaderProps) {
    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">
                Bonjour {display_name}
            </h1>
            <p className="text-base text-muted-foreground">
                Ravi de vous revoir ! Prêt à collaborer sur vos projets ?
            </p>
        </div>
    );
}