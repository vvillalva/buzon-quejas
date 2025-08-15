import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, ChartLine, List, Mailbox, Users, Shield } from 'lucide-react';
import AppLogo from './app-logo';
import { NavAdmin } from './nav-admin';
import { NavOpciones } from './nav-opciones';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Quejas',
        href: '/quejas',
        icon: Mailbox,
    },
    {
        title: 'Estadisticas',
        href: '/estadisticas',
        icon: ChartLine,
    },
    {
        title: 'Catalogo',
        href: '/catalogos',
        icon: List,
        subitems:[
            {
                title: 'Tipo de Violencia',
                url: '/tipo-de-violencia'
            }
        ]
    },
];
const adminNavItems: NavItem[] = [
    {
        title: 'Usuarios',
        href: '/usuarios',
        icon: Users,
    },
    {
        title: 'Roles',
        href: '/roles',
        icon: Shield,
    },
];

const catalogoNavItems: NavItem[] = [
    {
        title: 'Lista de Catalogos',
        href: '/catalogos',
        icon: List,
    }
]

// Habilitar si se requiere un navbar en la parte del footer
// const footerNavItems: NavItem[] = [
//     {
//         title: 'Repository',
//         href: 'https://github.com/laravel/react-starter-kit',
//         icon: Folder,
//     },
//     {
//         title: 'Documentation',
//         href: 'https://laravel.com/docs/starter-kits#react',
//         icon: BookOpen,
//     },
// ];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
                <NavAdmin items={adminNavItems} />
                <NavOpciones items={catalogoNavItems} titulo="Catálogos" />
            </SidebarContent>
            
            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
