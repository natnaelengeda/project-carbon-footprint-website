
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export default function BarGraph() {

  const chartData = [
    { month: "Global", desktop: 800, color: "#35D36A" },
    { month: "USA", desktop: 700, color: "#35D36A" },
    { month: "UK", desktop: 500, color: "#35D36A" },
    { month: "S. Africa", desktop: 300, color: "#35D36A" },
    { month: "Ethiopia", desktop: 200, color: "#35D36A" },
    { month: "Fitsum", desktop: 100, color: "#35D36A" },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#35D36A",
    },
  } satisfies ChartConfig

  return (
    <div className="w-full h-auto">
      <Card>
        <CardHeader>
          <CardTitle>Global Chart</CardTitle>
          {/* <CardDescription>January - June 2024</CardDescription> */}
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}>
            <BarChart
              accessibilityLayer data={chartData}>
              <CartesianGrid
                vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="desktop"
                fill="var(--color-desktop)"
                radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        {/* <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter> */}
      </Card>
    </div>
  )
}
