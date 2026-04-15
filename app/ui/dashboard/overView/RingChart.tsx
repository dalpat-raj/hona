"use client"
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
} from "@/app/ui/dashboard/shadcn/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/ui/dashboard/shadcn/chart"

interface DataProps {
    totalConfirm: number | null;
    totalPickup: number;
    totalShipped: number;
    totalDelivered: number;
    totalCancled: number;
    totalRefunded: number;
}

// export function RingChart({data}: DataProps) {

//   }

export const RingChart: React.FC<DataProps | any>=({data})=>{
//   const {
//     totalConfirm,
//     totalPickup,
//     totalShipped,
//     totalDelivered,
//     totalCancled,
//     totalRefunded,
// } = data;
const dummyData: DataProps = {
  totalConfirm: 120,
  totalPickup: 80,
  totalShipped: 60,
  totalDelivered: 200,
  totalCancled: 20,
  totalRefunded: 15,
};
const {
  totalConfirm,
  totalPickup,
  totalShipped,
  totalDelivered,
  totalCancled,
  totalRefunded,
} = dummyData;

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

const chartData = [
  { browser: "Confirmed", visitors: totalConfirm, fill: "var(--color-chrome)" },
  { browser: "Pickup", visitors: totalPickup, fill: "var(--color-safari)" },
  { browser: "Shipped", visitors: totalShipped, fill: "var(--color-firefox)" },
  { browser: "Delivered", visitors: totalDelivered, fill: "#4ADE80" },
  { browser: "Cancled", visitors: totalCancled, fill: "#F87171" },
  { browser: "Refunded", visitors: totalRefunded, fill: "var(--color-other)" },
]

const totalVisitors = React.useMemo(() => {
  return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
}, [chartData]);


const finalData =
  process.env.NODE_ENV === "development" ? dummyData : data;

return (
  <Card className="flex flex-col">
    <CardHeader className="items-center pb-0">
      <CardTitle>Orders Analytics</CardTitle>
      <CardDescription>January - June 2024</CardDescription>
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
            dataKey="visitors"
            nameKey="browser"
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
                        Total Order
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
      <div className="flex items-center gap-2 font-medium leading-none">
        Our startup to now total orders <TrendingUp className="h-4 w-4" />
      </div>
      <div className="leading-none text-muted-foreground">
      Success is the sum of all efforts, repeated day-in & day out.
      </div>
    </CardFooter>
  </Card>
)
}