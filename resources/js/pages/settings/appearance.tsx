//** Hooks  */
import { Head } from '@inertiajs/react';
//** Components  */
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
//** Assets  */
//** Interface or Types  */
import type { BreadcrumbItem } from '@/types';
//** Consts or Fuctions*/
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Apariencia del Sistema',
        href: '/settings/appearance',
    },
];

export default function Appearance() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Apariencia del sistema" />
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Apariencia del sistema" description="Actualiza la configuración de apariencia de su cuenta" />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
