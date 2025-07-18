import { useCallback } from 'react';

export function useInitials() {
    return useCallback((fullName: string): string => {
        const names = fullName.trim().split(' ');

        if (names.length === 0) return '';
        if (names.length === 1) {
            // Si solo hay un nombre, tomar las primeras dos letras del nombre.
            return names[0].slice(0, 2).toUpperCase();
        }

        // Si hay nombre y apellido, tomar la primera letra del primer nombre y la primera letra del apellido.
        const firstInitial = names[0].charAt(0);
        const lastInitial = names[names.length - 1].charAt(0);

        return `${firstInitial}${lastInitial}`.toUpperCase();
    }, []);
}
