import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardStatsProps {
    projectsCount: number;
    applicationsCount: number;
    conversationsCount: number;
}

export default function DashboardStats({
    projectsCount,
    applicationsCount,
    conversationsCount
}: DashboardStatsProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Quelques chiffres...</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Nombre de vos projets</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl font-bold">
                        {projectsCount}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Nombre de vos candidatures</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl font-bold">
                        {applicationsCount}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Nombre de vos conversations</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl font-bold">
                        {conversationsCount}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}