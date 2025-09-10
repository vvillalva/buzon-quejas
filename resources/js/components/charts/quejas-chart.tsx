import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

export const description = "Grafica del total de quejas en el año."
//*Van en MAYUS por que asi lo regresa el Backend
//* console.log(data)
const colorClasses = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
  "var(--chart-7)",
  // ...agrega más si esperas más tipos
];

type ChartConfigItem = {
  label: string;
  color: string;
};

type ChartConfig = {
  [key: string]: ChartConfigItem;
};

export default function QuejasChart({ data = [] }) {
    // Extrae todas las keys, quitando 'date'
    const tipoKeys = Object.keys(data[0]).filter(
        key => key !== "date"
    );

    // Ahora genera el chartConfig dinámico
    const chartConfig: ChartConfig = {} satisfies ChartConfig;

    tipoKeys.forEach((key, idx) => {
        // Pone la primera letra en mayúscula y el resto igual (por si son todo minúsculas)
        const label =
            key.charAt(0).toUpperCase() +
            key.slice(1).toLowerCase();

        chartConfig[key] = {
            label,
            color: colorClasses[idx % colorClasses.length], // va asignando colores progresivos
        };
    });

    const [timeRange, setTimeRange] = useState("90d")

    // Encuentra la fecha más reciente en tu data
    const lastDate = data.length
        ? new Date(data[data.length - 1].date)
        : new Date();

    const filteredData = data.filter((item) => {
        const date = new Date(item.date)
        let daysToSubtract = 90
        if (timeRange === "30d") {
            daysToSubtract = 30
        } else if (timeRange === "7d") {
            daysToSubtract = 7
        }
        const startDate = new Date(lastDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        return date >= startDate
    })

    return (
        <Card className="pt-0">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle>Quejas Generadas</CardTitle>
                    <CardDescription>
                        Mostrando el total de quejas generadas en los ultimos 3 meses.
                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="90d" className="rounded-lg">
                            Ultimos 3 meses
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            Ultimos 30 dias
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            Ultimos 7 dias
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">

                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={filteredData}>
                        <defs>
                            {/* Crea un linearGradient para cada tipo de violencia */}
                            {Object.entries(chartConfig).map(([key, config]) => (
                                key !== "total" && config.color && (
                                    <linearGradient id={`fill-${key}`} x1="0" y1="0" x2="0" y2="1" key={key}>
                                        <stop offset="5%" stopColor={config.color} stopOpacity={0.8} />
                                        <stop offset="95%" stopColor={config.color} stopOpacity={0.1} />
                                    </linearGradient>
                                )
                            ))}
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                // value === "2025-07-29"
                                if (!value) return "";
                                const [year, month, day] = value.split("-");
                                const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
                                return `${parseInt(day, 10)} ${meses[parseInt(month, 10) - 1]} ${year}`;
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        // value === "2025-07-29"
                                        if (!value) return "";
                                        const [year, month, day] = value.split("-");
                                        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Novviembre", "Diciembre"];
                                        return `${parseInt(day, 10)} ${meses[parseInt(month, 10) - 1]} ${year}`;
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        {Object.entries(chartConfig).map(([key, config]) =>
                            key !== "total" && config.color ? (
                                <Area
                                    key={key}
                                    dataKey={key}
                                    type="natural"
                                    fill={`url(#fill-${key})`}
                                    stroke={config.color}
                                    stackId="a"
                                />
                            ) : null
                        )}
                        <ChartLegend content={<ChartLegendContent className="flex flex-wrap gap-2" />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

