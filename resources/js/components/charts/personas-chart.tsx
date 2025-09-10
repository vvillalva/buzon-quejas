import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

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

export const description = "Grafica para personas que mandaron su queja anonima o indentificandose."

interface PersonasChartProps {
    dataAnonimas: number;
    dataIdetificadas: number;
}

const chartConfig = {
    total: {
        label: "Total de Quejas",
    },
    anonima: {
        label: "Anonimas",
        color: "var(--chart-1)",
    },
    identificadas: {
        label: "Identificadas",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export default function PersonasChart({ dataAnonimas, dataIdetificadas }: PersonasChartProps) {
    //Filtramos Data por Semestre Enero-Junio / Julio-Diciembre
    const fechaActual = new Date();
    const anioActual = fechaActual.getFullYear().toString();
    const mesActual = fechaActual.getMonth() + 1;
    const semestreActual = mesActual >= 7 ? "2" : "1";

    const chartData = [
        { tipo: "Anonimas", total: dataAnonimas, fill: "var(--chart-1)" },
        { tipo: "Identificadas", total: dataIdetificadas, fill: "var(--chart-2)" },
    ]
    const totalVisitors = dataAnonimas + dataIdetificadas;

    return (
        <Card className="flex flex-col justify-between gap-1 min-w-[440px]">
            <CardHeader className="items-center pb-0">
                <CardTitle>Quejas Anonimas</CardTitle>
                {semestreActual === "1" ? (
                    <CardDescription>Enero - Junio {anioActual}</CardDescription>
                ) : (
                    <CardDescription>Julio - Diciembre {anioActual}</CardDescription>
                )}
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="total"
                            nameKey="tipo"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalVisitors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Total de Quejas
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none font-medium">
                    {dataAnonimas > dataIdetificadas ? (
                        <>Al parecer hay mas persona en anonimato  <TrendingUp className="h-4 w-4" /></>
                    ) : (
                        <>Al parecer hay mas personas indentificadas <TrendingUp className="h-4 w-4" /></>
                    )}

                </div>
                <div className="text-muted-foreground leading-none">
                    Mostrado el historia de quejas anonimas
                </div>
            </CardFooter>
        </Card>
    )
}
