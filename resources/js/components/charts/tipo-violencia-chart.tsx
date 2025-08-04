import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis, YAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "Grafica de los Tipo de Violencia por Semestre"

const colorPalette = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
    "var(--chart-6)",
    "var(--chart-7)",
    // Agrega más colores si necesitas
];
type ChartConfig = {
    [total: string]: {
        label: string;
        color?: string;
    }
};
interface TipoSemestre {
    anio: string;
    semestre: string;
    tipo_violencia: string;
    total: string;
}
interface ChartTipoDeViolenciaProps {
    tipo: TipoSemestre[];
}

//TODO: GENERAR EL CHARTCONFIG DINAMICO COMO EL DE quejas-chart

export function TipoViolenciaChart({ tipo }: ChartTipoDeViolenciaProps) {
    // Extraer tipos únicos de violencia
    const tiposUnicos = [
        ...new Set(tipo.map((item) => item.tipo_violencia.toLowerCase())),
    ];
    //Filtramos Data por Semestre Enero-Junio / Julio-Diciembre
    const fechaActual = new Date();
    const anioActual = fechaActual.getFullYear().toString();
    const mesActual = fechaActual.getMonth() + 1;
    const semestreActual = mesActual >= 7 ? "2" : "1";

    // Crear el chartConfig dinámicamente
    const chartConfig: Record<string, { label: string; color?: string }> = {
        total: {
            label: "Total quejas",
        },
    };

    tiposUnicos.forEach((tipo, idx) => {
        const label = tipo.charAt(0).toUpperCase() + tipo.slice(1).toLowerCase();
        chartConfig[tipo] = {
            label,
            color: colorPalette[idx % colorPalette.length], // ciclo de colores
        };
    });

    const dataFiltrada = tipo.filter(
        (item) =>
            item.anio === anioActual && item.semestre === semestreActual
    );
    const chartData = dataFiltrada.map(({ tipo_violencia, total }, idx) => ({
        tipo_violencia,
        total: Number(total),
        fill: colorPalette[idx % colorPalette.length], // <-- así recorres la paleta cíclicamente
    }));
    const maxIndex = chartData.reduce(
        (maxIdx, item, idx, arr) =>
            item.total > arr[maxIdx].total ? idx : maxIdx,
        0
    );

    return (
        <div className="w-full">
            <Card>
                <CardHeader>
                    <CardTitle>Tipos de Violencia</CardTitle>
                    {semestreActual === "1" ? (
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
                                className="text-[10px]"
                                dataKey="tipo_violencia"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) =>
                                    chartConfig[value as keyof typeof chartConfig]?.label
                                }
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
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
                                    )
                                }}
                            />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="flex gap-2 leading-none font-medium">
                        Revisa los datos del {semestreActual} semestre del {anioActual}.
                    </div>
                    <div className="text-muted-foreground leading-none">
                        Mostrando los tipo de violencia en las quejas del semestre actual.
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
