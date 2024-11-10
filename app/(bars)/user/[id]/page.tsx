"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Info, Mail } from "lucide-react";
import { CustomIcon } from "@/components/CustomIcon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import Loading from "@/components/Loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Suspense } from "react";
import { faker } from "@faker-js/faker";
import { useEffect } from "react";
import { GenRand } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import ProgressCircle from "../ProgressCircle";
import { CardDescription, CardTitle } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import {
    LineChart,
    PieChart,
    XAxis,
    YAxis,
    Line,
    CartesianGrid,
    Pie,
    Sector,
} from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { useState } from "react";

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

const RecommendationsContent = () => {
    const searchParams = useSearchParams();
    const userEmail = searchParams.get("email") || "vedanta1412@gmail.com";

    const [user, setUser] = useState<{
        email: string;
        name: string;
        image: string;
    } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<null | Error>(null);
    const healthStatus = GenRand(100);
    const [timeFrame, setTimeFrame] = useState<
        "Yearly" | "Monthly" | "Quarterly"
    >("Yearly");
    const [activeIndex, setActiveIndex] = useState<number | undefined>(
        undefined
    ); // Added state for active index
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

    useEffect(() => {
        const generateFakeUser = (email: string) => {
            const seed = email.split("@")[0];
            faker.seed(
                seed
                    .split("")
                    .reduce((acc, char) => acc + char.charCodeAt(0), 0)
            );

            return {
                email: email,
                name: faker.person.fullName(),
                image: faker.image.avatar(),
            };
        };

        try {
            const fakeUser = generateFakeUser(userEmail);

            setUser(fakeUser);
            setIsLoading(false);
        } catch (err) {
            setError(err as Error);
            setIsLoading(false);
        }
    }, [userEmail]);

    if (isLoading) return <Loading />;
    if (error) return <div>Error: {error.message}</div>;
    if (!user) return <div>No user selected</div>;

    const studentId = `S-${Math.floor(100000 + Math.random() * 900000)}`;

    const randomBadges = [
        <Badge
            key="friendly"
            variant="outline"
            className="border-amber-600 bg-amber-100 text-amber-600"
        >
            Friendly
        </Badge>,
        <Badge
            key="joyous"
            variant="outline"
            className="border-amber-600 bg-amber-100 text-amber-600"
        >
            Joyous
        </Badge>,
        <Badge
            key="creative"
            variant="outline"
            className="border-violet-600 bg-violet-100 text-violet-600"
        >
            Creative
        </Badge>,
        <Badge
            key="empathetic"
            variant="outline"
            className="border-violet-600 bg-violet-100 text-violet-600"
        >
            Empathetic
        </Badge>,
        <Badge
            key="determined"
            variant="outline"
            className="border-violet-600 bg-violet-100 text-violet-600"
        >
            Determined
        </Badge>,
        <Badge
            key="patient"
            variant="outline"
            className="border-green-600 bg-green-100 text-green-600"
        >
            Patient
        </Badge>,
        <Badge
            key="wise"
            variant="outline"
            className="border-green-600 bg-green-100 text-green-600"
        >
            Wise
        </Badge>,
    ];

    // Select three random badges
    const selectedBadges = [];
    const badgeIndices = new Set();
    while (selectedBadges.length < 3) {
        const randomIndex = Math.floor(Math.random() * randomBadges.length);
        if (!badgeIndices.has(randomIndex)) {
            badgeIndices.add(randomIndex);
            selectedBadges.push(randomBadges[randomIndex]);
        }
    }

    return (
        <>
            <Tabs defaultValue="overview" className="mb-8">
                <TabsList className="mb-8">
                    <TabsTrigger
                        value="overview"
                        className="text-xl font-semibold data-[state=active]:font-semibold"
                    >
                        Overview
                    </TabsTrigger>
                    <TabsTrigger
                        value="profile-summary"
                        className="text-xl data-[state=active]:font-semibold"
                    >
                        Profile summary
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                    <div className="w-full">
                        <div className="mb-8 flex space-x-8">
                            <Card className="flex-grow">
                                <CardContent className="flex h-full items-center justify-between p-8">
                                    <div className="relative h-32 w-32">
                                        <Avatar className="h-full w-full">
                                            <AvatarImage
                                                alt={user.name}
                                                src={user.image}
                                                className="object-cover"
                                            />
                                            <AvatarFallback className="text-2xl">
                                                {user.name
                                                    .split(" ")
                                                    .map((n: string) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>

                                    <div className="ml-10 flex-grow">
                                        <div className="flex items-center gap-5">
                                            <h2 className="text-2xl font-bold">
                                                {user.name}
                                            </h2>

                                            <p className="flex items-center text-gray-600">
                                                <CustomIcon>
                                                    <Mail />
                                                </CustomIcon>{" "}
                                                {user.email}
                                            </p>
                                        </div>
                                        <p className="text-gray-600">
                                            Relation ID: {studentId}
                                        </p>
                                        <div className="mt-6 flex flex-wrap items-center gap-2 text-sm sm:text-lg">
                                            <Badge
                                                variant="outline"
                                                className="border-blu bg-blue-100 text-blu"
                                            >
                                                {Math.random() > 0.5
                                                    ? "♂ Male"
                                                    : "♀ Female"}
                                            </Badge>

                                            <Badge
                                                variant="outline"
                                                className="border-blu bg-blue-100 text-blu"
                                            >
                                                {Math.floor(
                                                    Math.random() * 30
                                                ) + 50}{" "}
                                                Kg
                                            </Badge>

                                            <TooltipProvider>
                                                <Tooltip delayDuration={0}>
                                                    <TooltipTrigger>
                                                        <Badge
                                                            variant="outline"
                                                            className="cursor-help border-blu bg-blue-100 text-blu"
                                                        >
                                                            No allergies
                                                        </Badge>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>
                                                            No known allergies
                                                            reported
                                                        </p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>

                                            {selectedBadges}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="w-1/3 bg-blu text-white">
                                <CardContent className="flex items-center p-6">
                                    <div>
                                        <h3 className="mb-2 text-xl font-semibold">
                                            Overall conversation score
                                        </h3>
                                        <p className="mb-4">
                                            User&apos;s cognitive health is{" "}
                                            {healthStatus.text}.
                                        </p>
                                    </div>

                                    <ProgressCircle
                                        value={healthStatus.result}
                                        color={healthStatus.color}
                                    />
                                </CardContent>
                            </Card>
                        </div>

                        <div className="mb-8 mt-16 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <h2 className="text-2xl font-bold text-darkblu">
                                    {user.name}&apos;s vitals
                                </h2>
                                <p className="flex items-center text-gray-500">
                                    <CustomIcon>
                                        <Calendar />
                                    </CustomIcon>{" "}
                                    Vitals last monitored on 10/23/2023
                                </p>
                            </div>

                            <Button>Send new reminder</Button>
                        </div>

                        <div className="grid grid-cols-4 gap-8">
                            {[
                                "Social Intelligence",
                                "Emotional Resilience",
                                "Inner Harmony",
                                "Leadership Potential",
                            ].map((title, i) => {
                                const value = Math.floor(Math.random() * 100);
                                const color =
                                    value < 33
                                        ? "red"
                                        : value < 66
                                        ? "yellow"
                                        : "green";

                                return (
                                    <Link
                                        key={i}
                                        href={`/vitals/${title}?name=${encodeURIComponent(
                                            user.name
                                        )}`}
                                    >
                                        <Card className="h-full cursor-pointer transition-all hover:shadow-xl">
                                            <CardContent className="p-6">
                                                <h3 className="mb-8 flex w-full items-center justify-center text-lg font-semibold text-muted-foreground">
                                                    {title}
                                                    <TooltipProvider
                                                        delayDuration={0}
                                                    >
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <Info className="ml-2 h-6 w-6 text-blu" />
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>
                                                                    More
                                                                    information
                                                                    about{" "}
                                                                    {title}
                                                                </p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </h3>

                                                <ProgressCircle
                                                    value={value}
                                                    color={color}
                                                />

                                                <p
                                                    className={`mt-4 text-center font-semibold ${
                                                        color === "yellow"
                                                            ? "text-amber-500"
                                                            : color === "red"
                                                            ? "text-rose-500"
                                                            : "text-emerald-500"
                                                    }`}
                                                >
                                                    {title} levels are{" "}
                                                    {color === "green"
                                                        ? "optimal"
                                                        : color === "yellow"
                                                        ? "moderate"
                                                        : "concerning"}
                                                    .
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="profile-summary">
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
                                title: "Total properties marked healthy",
                                count: 605,
                                change: "+131 since last year",
                            },
                            {
                                title: "Mental health counselling sessions",
                                count: 342,
                                change: "+12 since last year",
                            },
                            {
                                title: "Total app sessions by others",
                                count: 231,
                                change: "+24 since last year",
                            },
                            {
                                title: "Total markers marked critical",
                                count: 21,
                                change: "-11 since last month",
                            },
                        ].map((item, i) => (
                            <Card key={i} className="rounded-lg bg-white p-6">
                                <CardTitle className="text-lg font-medium">
                                    {item.title}
                                </CardTitle>
                                <p className="mt-6 text-2xl font-bold">
                                    {item.count}
                                </p>
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
                                    Cognition health status
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
                                            activeIndex={activeIndex} // Use activeIndex state
                                            onMouseEnter={(data, index) => {
                                                setActiveIndex(index); // Highlight the active index on hover
                                            }}
                                            onMouseLeave={() => {
                                                setActiveIndex(undefined); // Reset the active index when not hovering
                                            }}
                                            activeShape={({
                                                outerRadius = 0,
                                                ...props
                                            }: PieSectorDataItem) => (
                                                <Sector
                                                    {...props}
                                                    outerRadius={
                                                        outerRadius + 10
                                                    }
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
                                    Trend for overall cognitive health
                                </CardTitle>
                                <CardDescription className="mb-6 text-base text-black">
                                    Average cognitive health level trends for
                                    year to date.
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
                </TabsContent>
            </Tabs>
        </>
    );
};

const Recommendations = () => {
    return (
        <Suspense fallback={<Loading />}>
            <RecommendationsContent />
        </Suspense>
    );
};

export default Recommendations;
