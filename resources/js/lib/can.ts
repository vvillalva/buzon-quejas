import { usePage } from "@inertiajs/react";

export function can( permision : string ) : boolean{
    const {auth} = usePage().props as {
        auth : {
            permissions: string[]
        }
    }

    return auth.permissions.includes(permision);
}