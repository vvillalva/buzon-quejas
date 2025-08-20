import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export const ACTIONS = ["ver", "crear", "editar", "eliminar"] as const;
export const DOMAINS = [
    "catalogos",
    "estadisticas",
    "opciones",
    "quejas",
    "roles",
    "usuarios",
] as const;

export type Action = typeof ACTIONS[number];
export type Domain = typeof DOMAINS[number];

// "ver.usuarios" | "crear.opciones" | ...
export type Permission = `${Action}.${Domain}`;

// Si tu formulario guarda permisos:
export interface RoleForm {
    permissions: Permission[]; // arreglo estrictamente tipado
}

type Permission = `${"ver" | "crear" | "editar" | "eliminar"}.${"catalogos" | "estadisticas" | "opciones" | "quejas" | "roles" | "usuarios"}`;
type RoleFormData = {
    id: number;
    name: string;
    permissions: Permission[]; // <<— importante: string[]
};

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    subitems?: {
        title: string
        url: string
    }[]
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    nombre: string;
    correo: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
