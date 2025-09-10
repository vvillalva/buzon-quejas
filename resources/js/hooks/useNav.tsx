import { NavItem, SubNavItem } from "@/types";
import { usePage } from "@inertiajs/react";
interface PropsNav{
    menus: NavItem[];
}
export function useNav({ menus = [] }: PropsNav) {
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
    
        const visible = filterNav(menus);
    return(
        visible
    )
}
