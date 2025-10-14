import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from 'recharts';

export const description = 'Grafica de los Tipo de Violencia por Semestre';

const colorPalette = [
    'var(--chart-1)',
    'var(--chart-2)',
    'var(--chart-3)',
    'var(--chart-4)',
    'var(--chart-5)',
    'var(--chart-6)',
    'var(--chart-7)',
    'var(--chart-8)',
    'var(--chart-9)',
    'var(--chart-10)',
    // Agrega más colores si necesitas
];

interface TipoSemestre {
    anio: number;
    semestre: number;
    tipo_violencia: string;
    total: number;
}
interface ChartTipoDeViolenciaProps {
    tipo: TipoSemestre[];
}

export function TipoViolenciaChart({ tipo }: ChartTipoDeViolenciaProps) {
    // 1) Semestre/año como número
    const now = new Date();
    const anioActual = now.getFullYear();
    const semestreActual = now.getMonth() + 1 >= 7 ? 2 : 1;

    // 2) tipos únicos (keys en minúsculas)
    const tiposUnicos = [...new Set((tipo ?? []).map((i) => String(i.tipo_violencia).toLowerCase().trim()))];

    // 3) chartConfig consistente con keys en minúsculas
    const chartConfig: Record<string, { label: string; color?: string }> = {
        total: { label: 'Total quejas' },
    };

    tiposUnicos.forEach((t, idx) => {
        const label = t
            .split(' ')
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(' ');
        chartConfig[t] = {
            label,
            color: colorPalette[idx % colorPalette.length],
        };
    });
    // const chartConfig: Record<string, { label: string; color?: string }> = {
    //     total: { label: 'Total quejas' },
    // };
    // tiposUnicos.forEach((t, idx) => {
    //     // Tomamos la primera palabra dividiendo por espacio
    //     const firstWord = t.split(' ')[0];

    //     // Capitalizamos solo esa palabra
    //     const label = firstWord.charAt(0).toUpperCase() + firstWord.slice(1).toLowerCase();

    //     chartConfig[t] = { label, color: colorPalette[idx % colorPalette.length] };
    // });

    // 4) Filtra haciendo coerción segura
    const dataFiltrada = (tipo ?? []).filter((i) => Number(i.anio) === anioActual && Number(i.semestre) === semestreActual);

    // 5) Dataset final
    const chartData = dataFiltrada.map(({ tipo_violencia, total }, idx) => ({
        tipo_violencia: String(tipo_violencia).trim(),
        total: Number(total),
        fill: colorPalette[idx % colorPalette.length],
    }));

    const maxIndex = chartData.reduce((maxIdx, item, idx, arr) => (item.total > arr[maxIdx].total ? idx : maxIdx), 0);

    return (
        <div className="w-full">
            <Card>
                <CardHeader>
                    <CardTitle className="text-primary-600">Tipos de Violencia</CardTitle>
                    {semestreActual === 1 ? (
                        <CardDescription>Enero - Junio {anioActual}</CardDescription>
                    ) : (
                        <CardDescription>Julio - Diciembre {anioActual}</CardDescription>
                    )}
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <BarChart accessibilityLayer data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                className="truncate"
                                tick={false}
                                type="category"
                                padding={'gap'}
                                dataKey="tipo_violencia"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => chartConfig[value as keyof typeof chartConfig]?.label}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={({ payload }) => {
                                    if (!payload || payload.length === 0) return null;
                                    const data = payload[0].payload;
                                    const label = chartConfig[data.tipo_violencia.toLowerCase()]?.label || data.tipo_violencia;
                                    return (
                                        <div className="rounded bg-white p-2 text-xs shadow flex flex-row gap-2">
                                            <p className='font-semibold text-primary-600'>{label}</p><p>Total: {data.total}</p>
                                        </div>
                                    );
                                }}
                            />
                            <Bar
                                dataKey="total"
                                strokeWidth={2}
                                radius={8}
                                activeIndex={maxIndex}
                                activeBar={({ ...props }) => {
                                    return (
                                        <Rectangle
                                            {...props}
                                            fillOpacity={0.8}
                                            stroke={props.payload.fill}
                                            strokeDasharray={4}
                                            strokeDashoffset={4}
                                        />
                                    );
                                }}
                            />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="flex gap-2 leading-none font-medium">
                        Revisa los datos del {semestreActual} semestre del {anioActual}.
                    </div>
                    <div className="leading-none text-muted-foreground">Mostrando los tipo de violencia en las quejas del semestre actual.</div>
                </CardFooter>
            </Card>
        </div>
    );
}
