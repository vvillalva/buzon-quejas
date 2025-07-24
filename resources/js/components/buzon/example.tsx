import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { useIsMobile } from "@/hooks/use-mobile"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
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
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { useEffect, useState } from "react"

export const description = "Grafica del total de quejas en todo el año actual."

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
    sexual: {
        label: "Sexual",
        color: "var(--chart-4)",
    },
    otra: {
        label: "Otros",
        color: "var(--chart-5)",
    },
} satisfies ChartConfig

interface DataChart {
    data: any[];
}
export default function QuejasChart({ data }: DataChart) {

    console.log(data)

    const isMobile = useIsMobile()
    const [timeRange, setTimeRange] = useState("90d")

    useEffect(() => {
        if (isMobile) {
            setTimeRange("7d")
        }
    }, [isMobile])

    // Sanitiza los datos para asegurar que los valores son numéricos
    const sanitizedData = data.map(item => {
        const newItem: any = { date: item.date };
        Object.keys(chartConfig).forEach(tipo => {
            if (item[tipo] !== undefined) {
                newItem[tipo] = Number(item[tipo]);
            }
        });
        return newItem;
    });

    // Filtra por rango de fechas (basado en tu lógica actual)
    const filteredData = sanitizedData.filter((item) => {
        const date = new Date(item.date)
        const referenceDate = new Date(); // Cambia esto si necesitas otra fecha de referencia
        let daysToSubtract = 90
        if (timeRange === "30d") {
            daysToSubtract = 30
        } else if (timeRange === "7d") {
            daysToSubtract = 7
        }
        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        return date >= startDate
    });

    // Saca todas las keys de chartConfig (menos 'total')
    const tiposViolencia = Object.keys(chartConfig);

    return (
        <Card className="@container/card">
            <CardHeader>
                <CardTitle>Total de Quejas</CardTitle>
                <CardDescription>
                    <span className="hidden @[540px]/card:block">
                        Total para los últimos 3 meses
                    </span>
                    <span className="@[540px]/card:hidden">Últimos 3 meses</span>
                </CardDescription>
                <CardAction>
                    <ToggleGroup
                        type="single"
                        value={timeRange}
                        onValueChange={setTimeRange}
                        variant="outline"
                        className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
                    >
                        <ToggleGroupItem value="90d">Últimos 3 meses</ToggleGroupItem>
                        <ToggleGroupItem value="30d">Últimos 30 días</ToggleGroupItem>
                        <ToggleGroupItem value="7d">Últimos 7 días</ToggleGroupItem>
                    </ToggleGroup>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden" size="sm" aria-label="Select a value">
                            <SelectValue placeholder="Últimos 3 meses" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="90d" className="rounded-lg">
                                Últimos 3 meses
                            </SelectItem>
                            <SelectItem value="30d" className="rounded-lg">
                                Últimos 30 días
                            </SelectItem>
                            <SelectItem value="7d" className="rounded-lg">
                                Últimos 7 días
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </CardAction>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={filteredData}>
                        <defs>
                            {tiposViolencia.map((tipo) => (
                                <linearGradient
                                    key={tipo}
                                    id={`fill-${tipo}`}
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor={(chartConfig as any)[tipo]?.color}
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor={(chartConfig as any)[tipo]?.color}
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
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
                                const date = new Date(value)
                                return date.toLocaleDateString("es-MX", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            defaultIndex={isMobile ? -1 : 10}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("es-MX", {
                                            month: "short",
                                            day: "numeric",
                                        })
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        {tiposViolencia.map((tipo) => (
                            <Area
                                key={tipo}
                                dataKey={tipo}
                                type="natural"
                                fill={`url(#fill-${tipo})`}
                                stroke={(chartConfig as any)[tipo]?.color}
                                stackId="a"
                                name={(chartConfig as any)[tipo]?.color}
                            />
                        ))}
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}