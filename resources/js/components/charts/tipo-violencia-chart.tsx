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
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "Grafica de los Tipo de Violencia por Semestre"

const colorPalette = [
    "#E57373",
    "#F06292",
    "#BA68C8",
    "#64B5F6",
    "#4DB6AC",
    // Agrega más colores si necesitas
];
type ChartConfig = {
    [total: string]: {
        label: string;
        color?: string;
    }
};
const chartConfig = {
    total: {
        label: "Total quejas",
    },
    economica: {
        label: "Economica",
        color: "var(--chart-1)",
    },
    fisica: {
        label: "Fisica",
        color: "var(--chart-2)",
    },
    psicologica: {
        label: "Psicologica",
        color: "var(--chart-3)",
    },
    Sexual: {
        label: "Sexual",
        color: "var(--chart-4)",
    },
    otra: {
        label: "Otros",
        color: "var(--chart-5)",
    },
} satisfies ChartConfig

interface TipoSemestre {
    anio: string;
    semestre: string;
    tipo_violencia: string;
    total: string;
}

interface ChartTipoDeViolenciaProps {
    tipo: TipoSemestre[];
}

export function TipoViolenciaChart({ tipo }: ChartTipoDeViolenciaProps) {
    //Filtramos Data por Semestre Enero-Junio / Julio-Diciembre
    const fechaActual = new Date();
    const anioActual = fechaActual.getFullYear().toString();
    const mesActual = fechaActual.getMonth() + 1;
    const semestreActual = mesActual >= 7 ? "2" : "1";
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
