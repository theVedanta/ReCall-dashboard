"use client";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Tooltip } from "@/components/ui/tooltip";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { useState } from "react";
import {
    LineChart,
    PieChart,
    XAxis,
    YAxis,
    Line,
    CartesianGrid,
    Pie,
    Sector,
    AreaChart,
    Area,
} from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { GoogleMap, useLoadScript, HeatmapLayer } from "@react-google-maps/api";

const chartData = [
    { tag: "Healthy", count: 605, fill: "hsl(var(--chart-2))" },
    { tag: "Moderate", count: 342, fill: "hsl(var(--chart-4))" },
    { tag: "Unhealthy", count: 231, fill: "hsl(var(--chart-5))" },
    { tag: "Critical", count: 81, fill: "hsl(var(--chart-1))" },
];

const chartConfig = {
    healthy: {
        label: "Healthy",
        color: "hsl(var(--chart-2))",
    },
    moderate: {
        label: "Moderately Healthy",
        color: "hsl(var(--chart-4))",
    },
    unhealthy: {
        label: "Unhealthy",
        color: "hsl(var(--chart-5))",
    },
    critical: {
        label: "Critical",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

const currentMonthIndex = new Date().getMonth();
const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

const getYearlyData = () => {
    const newData = months.slice(0, currentMonthIndex + 1).map((month) => ({
        month: month,
        percentage: Math.floor(Math.random() * 30) + 60,
    }));

    return newData;
};

const lineChartData = {
    Yearly: getYearlyData(),
    Monthly: [
        { month: "Week 1", percentage: 65 },
        { month: "Week 2", percentage: 85 },
        { month: "Week 3", percentage: 75 },
        { month: "Week 4", percentage: 90 },
    ],
    Quarterly: [
        { month: "Q1", percentage: 40 },
        { month: "Q2", percentage: 65 },
        { month: "Q3", percentage: 80 },
        { month: "Q4", percentage: 70 },
    ],
};

// Sample heatmap data - replace with actual patient location data
const heatmapData = [
    { lat: 37.774546, lng: -122.433523, weight: 5 },
    { lat: 37.784546, lng: -122.443523, weight: 8 },
    { lat: 37.794546, lng: -122.453523, weight: 3 },
    // Add more location points as needed
];

const Summary = () => {
    const [timeFrame, setTimeFrame] = useState<
        "Yearly" | "Monthly" | "Quarterly"
    >("Yearly");
    const [activeIndex, setActiveIndex] = useState<number | undefined>(
        undefined
    );

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        libraries: ["visualization"],
    });

    const mapOptions = {
        center: { lat: 37.774546, lng: -122.433523 },
        zoom: 13,
    };

    return (
        <>
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center">
                    <h2 className="mr-4 text-lg font-semibold">
                        Stats for 2024-25
                    </h2>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                    >
                        <ChevronLeft />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                    >
                        <ChevronRight />
                    </Button>
                </div>
                <div className="flex space-x-1 rounded-lg border bg-white p-1">
                    <Button
                        className={
                            timeFrame === "Yearly"
                                ? "bg-blu text-white"
                                : "text-gray-700"
                        }
                        variant="ghost"
                        onClick={() => setTimeFrame("Yearly")}
                    >
                        Yearly
                    </Button>
                    <Button
                        className={
                            timeFrame === "Monthly"
                                ? "bg-blu text-white"
                                : "text-gray-700"
                        }
                        variant="ghost"
                        onClick={() => setTimeFrame("Monthly")}
                    >
                        Monthly
                    </Button>
                    <Button
                        className={
                            timeFrame === "Quarterly"
                                ? "bg-blu text-white"
                                : "text-gray-700"
                        }
                        variant="ghost"
                        onClick={() => setTimeFrame("Quarterly")}
                    >
                        Quarterly
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
                {[
                    {
                        title: "Total healthy social interactions",
                        count: 605,
                        change: "+131 since last year",
                    },
                    {
                        title: "Daily movement patterns",
                        count: 342,
                        change: "+12 since last year",
                    },
                    {
                        title: "Mood Tracking",
                        count: "Happy",
                        change: "Feeling great since today :)",
                    },
                    {
                        title: "Medication adherence",
                        count: 21,
                        change: "-11 since last month",
                    },
                ].map((item, i) => (
                    <Card key={i} className="rounded-lg bg-white p-6">
                        <CardTitle className="text-lg font-medium">
                            {item.title}
                        </CardTitle>
                        <p className="mt-6 text-2xl font-bold">{item.count}</p>
                        <p className="text-sm font-medium text-emerald-600">
                            {item.change}
                        </p>
                    </Card>
                ))}
            </div>

            <div className="flex space-x-6">
                <div className="mt-6 w-[40%]">
                    <Card className="h-full w-full p-6">
                        <CardTitle className="mb-2 text-xl font-semibold">
                            Cognition Conversation Percentage
                        </CardTitle>

                        <ChartContainer
                            config={chartConfig}
                            className="h-[90%] w-full"
                        >
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={
                                        <ChartTooltipContent
                                            className="bg-white"
                                            hideLabel
                                        />
                                    }
                                />
                                <Pie
                                    data={chartData}
                                    dataKey="count"
                                    nameKey="tag"
                                    innerRadius={90}
                                    activeIndex={activeIndex}
                                    onMouseEnter={(data, index) => {
                                        setActiveIndex(index);
                                    }}
                                    onMouseLeave={() => {
                                        setActiveIndex(undefined);
                                    }}
                                    activeShape={({
                                        outerRadius = 0,
                                        ...props
                                    }: PieSectorDataItem) => (
                                        <Sector
                                            {...props}
                                            outerRadius={outerRadius + 10}
                                        />
                                    )}
                                />

                                <ChartLegend
                                    content={<ChartLegendContent />}
                                    className="gap-4"
                                />
                            </PieChart>
                        </ChartContainer>
                    </Card>
                </div>

                <div className="mt-6 w-[60%]">
                    <Card className="h-full p-6">
                        <CardTitle className="mb-2 text-xl font-semibold">
                            Overall Health Assessment
                        </CardTitle>
                        <CardDescription className="mb-6 text-base text-black">
                            Tracking general wellness indicators and vitals over
                            time
                        </CardDescription>

                        <ChartContainer
                            config={{
                                value: {
                                    label: "Overall Health Trend",
                                    color: "#4CAF50",
                                },
                            }}
                            className="h-[30vh] w-full"
                        >
                            <LineChart
                                data={lineChartData[timeFrame]}
                                className="w-full"
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#e0e0e0"
                                    vertical={false}
                                />
                                <XAxis dataKey="month" />
                                <YAxis
                                    domain={[0, 100]}
                                    tickFormatter={(tick) => `${tick}%`}
                                />
                                <Tooltip />
                                <Line
                                    dataKey="percentage"
                                    strokeWidth={2}
                                    stroke="#059669"
                                />
                            </LineChart>
                        </ChartContainer>

                        <p className="mt-4 flex items-center text-sm font-medium text-emerald-600">
                            11% improvement from last month
                            <TrendingUp className="ml-2" />
                        </p>
                    </Card>
                </div>
            </div>

            <div className="flex flex-row-reverse gap-6 mt-6">
                <div className="w-[40%]">
                    <Card className="h-full w-full p-6">
                        <CardTitle className="mb-2 text-xl font-semibold">
                            Activity Location Heatmap
                        </CardTitle>
                        <CardDescription className="mb-6 text-base text-black">
                            Locations visited by the patient this week
                        </CardDescription>

                        <ChartContainer
                            config={{
                                activity: {
                                    label: "Visit Frequency",
                                    color: "hsl(var(--red-500))",
                                },
                            }}
                            className="h-[90%] w-full relative"
                        >
                            {isLoaded ? (
                                <div className="w-full h-[300px]">
                                    <GoogleMap
                                        mapContainerClassName="w-full h-full rounded-lg"
                                        options={mapOptions}
                                    >
                                        <HeatmapLayer
                                            data={heatmapData.map(
                                                (location) =>
                                                    new google.maps.LatLng(
                                                        location.lat,
                                                        location.lng
                                                    )
                                            )}
                                            options={{
                                                radius: 50,
                                                opacity: 0.8,
                                                gradient: [
                                                    "rgba(0, 0, 255, 0)",
                                                    "rgba(0, 255, 0, 0.6)",
                                                    "rgba(255, 255, 0, 0.7)",
                                                    "rgba(255, 128, 0, 0.8)",
                                                    "rgba(255, 0, 0, 1)",
                                                ],
                                                dissipating: true,
                                                maxIntensity: 100,
                                            }}
                                        />
                                    </GoogleMap>
                                </div>
                            ) : (
                                <div className="w-full h-[300px] flex items-center justify-center bg-gray-100 rounded-lg">
                                    Loading map...
                                </div>
                            )}
                        </ChartContainer>
                    </Card>
                </div>

                <div className="w-[60%]">
                    <Card className="h-full p-6">
                        <CardTitle className="mb-2 text-xl font-semibold">
                            Brain Function Analysis
                        </CardTitle>
                        <CardDescription className="mb-6 text-base text-black">
                            Detailed breakdown of memory retention and cognitive
                            processing abilities
                        </CardDescription>

                        <ChartContainer
                            config={{
                                memory: {
                                    label: "Memory Score",
                                    color: "hsl(var(--chart-2))",
                                },
                                cognitive: {
                                    label: "Cognitive Score",
                                    color: "hsl(var(--chart-4))",
                                },
                            }}
                            className="h-[30vh] w-full"
                        >
                            <AreaChart
                                data={[
                                    { month: "Jan", memory: 65, cognitive: 70 },
                                    { month: "Feb", memory: 68, cognitive: 72 },
                                    { month: "Mar", memory: 75, cognitive: 22 },
                                    { month: "Apr", memory: 72, cognitive: 75 },
                                    { month: "May", memory: 78, cognitive: 53 },
                                    { month: "Jun", memory: 82, cognitive: 85 },
                                ]}
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#e0e0e0"
                                    vertical={false}
                                />
                                <XAxis dataKey="month" />
                                <YAxis
                                    domain={[0, 100]}
                                    tickFormatter={(tick) => `${tick}%`}
                                />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="memory"
                                    stroke="hsl(var(--chart-4))"
                                    fill="hsl(var(--chart-4))"
                                    fillOpacity={0.3}
                                    strokeWidth={2}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="cognitive"
                                    stroke="hsl(var(--chart-1))"
                                    fill="hsl(var(--chart-1))"
                                    fillOpacity={0.3}
                                    strokeWidth={2}
                                />
                            </AreaChart>
                        </ChartContainer>

                        <p className="mt-4 flex items-center text-sm font-medium text-emerald-600">
                            15% improvement in overall cognitive scores
                            <TrendingUp className="ml-2" />
                        </p>
                    </Card>
                </div>
            </div>
        </>
    );
};
export default Summary;
