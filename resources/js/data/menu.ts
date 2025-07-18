import { LayoutDashboard, Layers3, BookOpen, List } from "lucide-react"

// Menu items.
export const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        options: []
    },
    {
        title: "Casos",
        url: "/casos",
        icon: Layers3,
        options: []
    },
    {
        title: "Expedientes",
        url: "/expedientes",
        icon: BookOpen,
        options: []
    },
    {
        title: "Catalogos",
        url: "/catalogos/situacion-conyugal",
        icon: List,
        options: [
            {
                title: "Situación conyugal",
                url: "/catalogos/situacion-conyugal",
            },
            {
                title: "Vivienda",
                url: "/catalogos/vivienda",
            },
            {
                title: "Escolaridad",
                url: "/catalogos/escolaridad",
            },
            {
                title: "Actividades",
                url: "/catalogos/actividades",
            },
            {
                title: "Canalización",
                url: "/catalogos/canalizacion",
            },
            {
                title: "Tipo de Violencia",
                url: "/catalogos/tipo-violencia",
            },
        ]
    },
]