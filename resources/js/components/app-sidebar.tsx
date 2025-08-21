//import { NavFooter } from '@/components/nav-footer';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, ChartLine, List, Mailbox, Users, Shield } from 'lucide-react';
import AppLogo from './app-logo';
import { NavOpciones } from './nav-opciones';
import { can } from '@/lib/can';
import { NavMain } from './nav-main';

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
        permission: 'ver.quejas',
    },
    {
        title: 'Estadisticas',
        href: '/estadisticas',
        icon: ChartLine,
        permission: 'ver.estadisticas',
    },
    {
        title: 'Catalogo',
        href: '/catalogos',
        permission: 'ver.opciones',
        icon: List,
        subitems: [
            {
                title: 'Tipo de Violencia',
                href: '/tipo-de-violencia',
            },
        ],
    },
];
const adminNavItems: NavItem[] = [
    {
        title: 'Usuarios',
        href: '/usuarios',
        icon: Users,
        permission: 'ver.usuarios',
    },
    {
        title: 'Roles',
        href: '/roles',
        icon: Shield,
        permission: 'ver.roles',
    },
];

const catalogoNavItems: NavItem[] = [
    {
        title: 'Lista de Catalogos',
        href: '/catalogos',
        icon: List,
        permission: 'ver.catalogos'
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
                <NavMain items={mainNavItems}/>
                {[
                    'ver.usuarios',
                    'ver.roles',
                ].some((permiso) => can(permiso)) && <NavOpciones items={adminNavItems} titulo="Administrador" />}
                {[
                    'ver.catalogos',
                ].some((permiso) => can(permiso)) && (<NavOpciones items={catalogoNavItems} titulo="Catálogos" />)}
            </SidebarContent>
            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
