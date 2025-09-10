import { NavItem } from "@/types";

type HasPermFn = (permission?: string) => boolean;

/**
 * Devuelve un nuevo árbol con:
 * - Items sin permiso -> se mantienen.
 * - Items con permiso -> se mantienen sólo si has(perm) = true.
 * - Subitems se filtran recursivamente.
 * - Si un padre no pasa su permiso pero tiene subitems visibles, se mantiene el padre sin href.
 */
export function filterNavByPermission(items: NavItem[], has: HasPermFn): NavItem[] {
  const res: NavItem[] = [];

  for (const item of items) {
    const children = item.subitems?.length ? filterNavByPermission(item.subitems, has) : [];

    const selfAllowed = has(item.permission);
    const hasVisibleChildren = children.length > 0;

    if (selfAllowed || hasVisibleChildren) {
      res.push({
        ...item,
        // Si el padre NO tiene permiso pero hay hijos visibles, evitamos navegación directa del padre
        href: selfAllowed ? item.href : "#",
        subitems: hasVisibleChildren ? children : undefined,
      });
    }
  }

  return res;
}