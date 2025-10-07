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

export function getLanguageName(code: string): string {
    const language = LANGUAGE_OPTIONS.find((lang) => lang.value.toLowerCase() === code.toLowerCase());
    return language ? language.label : code.toUpperCase();
}
