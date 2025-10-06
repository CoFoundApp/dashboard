import { MemberRole, ProjectStage, ProjectStatus, ProjectVisibility } from "@/graphql/projects"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
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
