import { Badge } from "@/components/ui/badge";
import { COLLABORATION_MODE_OPTIONS, COMMUNICATION_FREQUENCY_OPTIONS, COMMUNICATION_STYLE_OPTIONS, CULTURE_VALUES_OPTIONS, ENVIRONMENT_OPTIONS, MANAGEMENT_STYLE_OPTIONS } from "@/lib/utils";

interface ProjectCollaborationProps {
    management_style: "COACHING" | "HANDS_OFF" | "HANDS_ON" | "SELF_MANAGED" | null;
    communication_style: "CASUAL" | "DIPLOMATIC" | "DIRECT" | "FORMAL" | null;
    communication_frequency: "ASYNC" | "BIWEEKLY" | "DAILY" | "WEEKLY" | null;
    collaboration_mode: "ASYNCHRONOUS" | "HYBRID" | "SYNCHRONOUS" | null;
    environment: "ENTERPRISE" | "SCALEUP" | "SOLO" | "STARTUP" | null;
}

export default function ProjectCollaboration({ 
    management_style,
    communication_style,
    communication_frequency,
    collaboration_mode,
    environment
 }: ProjectCollaborationProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Communication & Collaboration</h2>
            <div className="flex flex-wrap gap-2">
                {management_style && (
                    <Badge variant="secondary" className="text-xs">
                        {MANAGEMENT_STYLE_OPTIONS.find((opt) => opt.value)?.label || management_style}
                    </Badge>
                )}
                {communication_style && (
                    <Badge variant="secondary" className="text-xs">
                        {COMMUNICATION_STYLE_OPTIONS.find((opt) => opt.value)?.label || communication_style}
                    </Badge>
                )}
                {communication_frequency && (
                    <Badge variant="secondary" className="text-xs">
                        {COMMUNICATION_FREQUENCY_OPTIONS.find((opt) => opt.value)?.label || communication_frequency}
                    </Badge>
                )}
                {collaboration_mode && (
                    <Badge variant="secondary" className="text-xs">
                        {COLLABORATION_MODE_OPTIONS.find((opt) => opt.value)?.label || collaboration_mode}
                    </Badge>
                )}
                {environment && (
                    <Badge variant="secondary" className="text-xs">
                        {ENVIRONMENT_OPTIONS.find((opt) => opt.value)?.label || environment}
                    </Badge>
                )}
            </div>
        </div>
    );
}
