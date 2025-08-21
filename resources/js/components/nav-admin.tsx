import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { ChevronRight } from 'lucide-react';

export function NavAdmin({ items = [] }: { items: NavItem[] }) {
    // 1) Trae permisos desde Inertia de forma segura
    const { auth } = usePage().props as unknown as { auth: { permissions: string[] } };
    const perms = new Set(auth?.permissions ?? []);
    const has = (perm?: string) => (perm ? perms.has(perm) : true);

        // 2) Filtrar árbol por permisos (NO muta href ni cambia tus tipos)
        const filterNav = (nodes: NavItem[]): NavItem[] => {
            const out: NavItem[] = [];
    
            for (const n of nodes) {
                const parentHasPermissionKey = typeof n.permission !== 'undefined';
                const parentAllowed = has(n.permission);
    
                // 1) Si el padre DEFINE permission y NO la tiene -> se oculta TODA la rama
                if (parentHasPermissionKey && !parentAllowed) {
                    continue;
                }
    
                // 2) Si el padre no define permission, filtramos hijos por sus propias permissions
                const visibleSubs = n.subitems?.filter((s: SubNavItem) => has((s as { permission?: string }).permission)) ?? [];
    
                const hasChildren = visibleSubs.length > 0;
    
                // 3) Incluir el padre:
                //    - Si define permission y la tiene -> incluir (con hijos filtrados si los hay)
                //    - Si NO define permission -> incluir si es hoja o si tiene hijos visibles
                if ((parentHasPermissionKey && parentAllowed) || (!parentHasPermissionKey && (hasChildren || !n.subitems))) {
                    out.push({
                        ...n,
                        subitems: hasChildren ? (visibleSubs as SubNavItem[]) : undefined,
                    });
                }
            }
            return out;
        };
    
        const visible = filterNav(items);

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Administrador</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) =>
                    item.subitems && item.subitems.length > 0 ? (
                        // Si tiene submenú
                        <Collapsible
                            key={item.title}
                            asChild
                            defaultOpen={item.isActive}
                            className="group/collapsible"
                        >
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton tooltip={item.title}>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {item.subitems.map((subItem) => (
                                            <SidebarMenuSubItem key={subItem.title}>
                                                <SidebarMenuSubButton asChild>
                                                    <Link href={subItem.href} prefetch>
                                                        <span>{subItem.title}</span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    ) : (
                        // Si es solo un item normal (sin submenú)
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild tooltip={item.title}>
                                <Link href={item.href} prefetch>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )
                )}
            </SidebarMenu>
        </SidebarGroup>
    );
}
