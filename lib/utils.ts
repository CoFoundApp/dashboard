import { ApplicationStatus } from "@/graphql/application"
import { MemberRole, ProjectStage, ProjectStatus, ProjectVisibility } from "@/graphql/projects"
import confetti from "canvas-confetti";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function sideCannons() {
    const end = Date.now() + 2 * 1000;
    const colors = ["#4a37f6", "#ff00e2", "#e2ee4c"];
    const frame = () => {
        if (Date.now() > end) return;
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            startVelocity: 60,
            origin: { x: 0, y: 0.5 },
            colors: colors,
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            startVelocity: 60,
            origin: { x: 1, y: 0.5 },
            colors: colors,
        });
        requestAnimationFrame(frame);
    };
    frame();
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", { month: "short", year: "numeric" })
}

export const projectStageLabels: Record<ProjectStage, string> = {
    IDEA: "Idéation",
    MVP: "MVP",
    SCALE: "En levé",
    TRACTION: "Tractation",
}

export const projectStatusLabels: Record<ProjectStatus, string> = {
    DRAFT: "Brouillon",
    ACTIVE: "Actif",
    ARCHIVED: "Archivé",
    PAUSED: "En pause",
    SEEKING: "En recherche",
}

export const projectVisibilityLabels: Record<ProjectVisibility, string> = {
    PUBLIC: "Public",
    PRIVATE: "Privé",
    UNLISTED: "Équipe",
}

export const memberRoleLabels: Record<MemberRole, string> = {
    MAINTAINER: "Soutien",
    MEMBER: "Membre",
    MENTOR: "Mentor",
    OWNER: "Propriétaire",
}

export const applicationStatusLabels: Record<ApplicationStatus, string> = {
    PENDING: "En attente",
    ACCEPTED: "Acceptée",
    REJECTED: "Refusée",
    CANCELED: "Annulée",
    WITHDRAWN: "Retirée",
}

export const LANGUAGE_OPTIONS = [
    { label: "Allemand", value: "de" },
    { label: "Anglais", value: "en" },
    { label: "Espagnol", value: "es" },
    { label: "Français", value: "fr" },
    { label: "Italien", value: "it" },
] as const;

export const CULTURE_VALUES_OPTIONS = [
    { label: "Croissance", value: "GROWTH" },
    { label: "Innovation", value: "INNOVATION" },
    { label: "Impact Social", value: "SOCIAL_IMPACT" },
    { label: "Stabilité", value: "STABILITY" },
] as const;

export const CULTURE_WORK_STYLES_OPTIONS = [
    { label: "Agile", value: "AGILE" },
    { label: "Autonome", value: "AUTONOMOUS" },
    { label: "Collaboratif", value: "COLLABORATIVE" },
    { label: "Structuré", value: "STRUCTURED" },
] as const;

export const MANAGEMENT_STYLE_OPTIONS = [
    { label: "Coaching", value: "COACHING" },
    { label: "Sans intervention", value: "HANDS_OFF" },
    { label: "Avec intervention", value: "HANDS_ON" },
    { label: "Autogestion", value: "SELF_MANAGED" },
] as const;

export const COMMUNICATION_STYLE_OPTIONS = [
    { label: "Décontracté", value: "CASUAL" },
    { label: "Diplomatique", value: "DIPLOMATIC" },
    { label: "Direct", value: "DIRECT" },
    { label: "Formel", value: "FORMAL" },
] as const;

export const COMMUNICATION_FREQUENCY_OPTIONS = [
    { label: "Asynchrone", value: "ASYNC" },
    { label: "Bi-hebdomadaire", value: "BIWEEKLY" },
    { label: "Quotidien", value: "DAILY" },
    { label: "Hebdomadaire", value: "WEEKLY" },
] as const;

export const COLLABORATION_MODE_OPTIONS = [
    { label: "Asynchrone", value: "ASYNCHRONOUS" },
    { label: "Hybride", value: "HYBRID" },
    { label: "Synchrone", value: "SYNCHRONOUS" },
] as const;

export const ENVIRONMENT_OPTIONS = [
    { label: "Entreprise", value: "ENTERPRISE" },
    { label: "Croissance à l'échelle", value: "SCALEUP" },
    { label: "Solo", value: "SOLO" },
    { label: "Startup", value: "STARTUP" },
] as const;

export const PREFERRED_TEAM_ROLE_OPTIONS = [
    { label: "Contributeur", value: "CONTRIBUTOR" },
    { label: "Leader", value: "LEADER" },
    { label: "Apprenant", value: "LEARNER" },
    { label: "Mentor", value: "MENTOR" },
] as const;

export const PREFERRED_TEAM_SIZE_OPTIONS = [
    { label: "Flexible", value: "FLEXIBLE" },
    { label: "Grande", value: "LARGE" },
    { label: "Moyenne", value: "MEDIUM" },
    { label: "Petite", value: "SMALL" },
] as const;

export const URGENCY_OPTIONS = [
    { label: "Critique", value: "CRITICAL" },
    { label: "Haut", value: "HIGH" },
    { label: "Moyen", value: "MEDIUM" },
    { label: "Bas", value: "LOW" },
] as const;

export const PRIMARY_MOTIVATIONS_OPTIONS = [
    { label: "Créer", value: "CREATE" },
    { label: "Gagner de l'argent", value: "EARN" },
    { label: "Aider", value: "HELP" },
    { label: "Apprendre", value: "LEARN" },
    { label: "Enseigner", value: "TEACH" },
]

export function getLanguageName(code: string): string {
    const language = LANGUAGE_OPTIONS.find((lang) => lang.value.toLowerCase() === code.toLowerCase());
    return language ? language.label : code.toUpperCase();
}
