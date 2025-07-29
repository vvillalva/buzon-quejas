import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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

export const description = "Grafica de los estatus de las quejas"

interface EstatusChartProps{
    data: any[]
}

const chartData = [
    { month: "January", pendiente: 186, enCurso: 80, atendido: 89},
    { month: "February", pendiente: 305, enCurso: 200, atendido: 89 },
    { month: "March", pendiente: 237, enCurso: 120, atendido: 89 },
    { month: "April", pendiente: 73, enCurso: 190, atendido: 89 },
    { month: "May", pendiente: 209, enCurso: 130, atendido: 89 },
    { month: "June", pendiente: 214, enCurso: 140, atendido: 89 },
]

const chartConfig = {
    pendiente: {
        label: "Pendiente",
        color: "var(--chart-1)",
    },
    enCurso: {
        label: "En Curso",
        color: "var(--chart-2)",
    },
    atendido: {
        label: "Atendido",
        color: "var(--chart-3)",
    },
} satisfies ChartConfig

export function EstatusChart({ data }:EstatusChartProps ) {
        //Filtramos Data por Semestre Enero-Junio / Julio-Diciembre
    const fechaActual = new Date();
    const anioActual = fechaActual.getFullYear().toString();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Estatus de las Quejas</CardTitle>
                <CardDescription>Enero - Diciembre {anioActual}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={data}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar dataKey="pendiente" fill="var(--chart-1)" radius={4} />
                        <Bar dataKey="enCurso" fill="var(--chart-2)" radius={4} />
                        <Bar dataKey="atendido" fill="var(--chart-3)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Los datos son en todo el año {anioActual}
                </div>
                <div className="text-muted-foreground leading-none">
                    Se muestran los datos que actualmente se tienen registrados.
                </div>
            </CardFooter>
        </Card>
    )
}
