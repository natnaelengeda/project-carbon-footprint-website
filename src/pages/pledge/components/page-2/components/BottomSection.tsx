
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
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "Transportation", desktop: 600 },
  { month: "Energy Usage", desktop: 800 },
  { month: "Diet & Consumption", desktop: 750 },
  { month: "Food Wastage", desktop: 250 },
  { month: "Water Usage", desktop: 850 },
  {
    month: "Waste Disposal", desktop: 850
    , color: "#35D36A"
  },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#35D36A",
  },
} satisfies ChartConfig

export default function BottomSection() {
  return (
    <div
      className='w-full md:w-[882px] h-auto flex flex-col items-start justify-start gap-2 md:gap-[80px]'>
      <hr className="w-full bg-[#D7D7D7]" />
      <div
        className="w-full h-auto flex flex-col items-center justify-start gap-3">

        {/* Title */}
        <div className="w-full h-40">
          <p className="text-center text-2xl md:text-[40px] font-bold">General Pledge Statistics</p>
        </div>

        {/* Bar Graph */}
        <div
          className="w-full h-auto md:h-[388px] flex items-center justify-center">
          <Card
            className="w-full">
            <CardHeader>
              {/* <CardTitle>Global Chart</CardTitle> */}
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

      </div>

    </div>
  )
}
