import { usePage } from "@inertiajs/react";

export function useCan() {
  const { auth } = usePage().props as unknown as { auth: { permissions: string[] } };
  const set = new Set(auth?.permissions ?? []);

  const has = (perm?: string) => (perm ? set.has(perm) : true);
  return { has, permissions: set };
}