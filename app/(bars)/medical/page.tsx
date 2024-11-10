import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { API_URL, NAV_HEIGHT } from "@/lib/constants";
import axios from "axios";
import Link from "next/link";
import Pagination from "@/components/Pagination";

type Relation = {
    id: number;
    name: string;
    relationship: string;
    photo?: string; // Assuming you have a photo URL for each relation
    email?: string;
    count: {
        value: number;
        first: string;
        last: string;
    };
};

// const relations: Relation[] = [
//     {
//         id: 1,
//         name: "Jane Doe",
//         relationship: "Mother",
//         photo: "/path/to/photo.jpg",
//         email: "jane.doe@example.com",
//     },
//     {
//         id: 2,
//         name: "John Smith",
//         relationship: "Father",
//         photo: "/path/to/photo.jpg",
//         email: "john.smith@example.com",
//     },
// ];

export default async function Home() {
    const res = await axios.get(`${API_URL}/get-user`);
    const relations: Relation[] = res.data.relations;

    return (
        <div
            className={`text-white min-h-[calc(100vh-${NAV_HEIGHT}px)] flex flex-col`}
        >
            <div className="fixed left-0 right-0 top-0 -z-10 h-[30%] bg-blu"></div>

            <div
                className={`flex h-[calc(100vh-${NAV_HEIGHT}px-8rem)] flex-col rounded-xl bg-white p-6 text-black shadow-md`}
            >
                <h2 className="mb-4 text-2xl font-bold opacity-75">
                    People patient interacted with
                </h2>

                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search Relations"
                        className="w-full border border-gray-200 py-5 pl-10"
                    />
                </div>

                <div className="flex-grow overflow-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Person</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Relationship</TableHead>
                                <TableHead>No. clicks</TableHead>
                                <TableHead>Earliest click</TableHead>
                                <TableHead>Latest click</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {relations.map((relation) => (
                                <TableRow key={relation.id}>
                                    <TableCell className="flex items-center gap-2">
                                        <Avatar>
                                            <AvatarImage
                                                src={relation.photo}
                                                alt={relation.name}
                                            />
                                            <AvatarFallback>
                                                {relation.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>{relation.name}</TableCell>
                                    <TableCell>
                                        {relation.relationship}
                                    </TableCell>
                                    <TableCell
                                        className={
                                            (relation.count &&
                                            relation.count.value &&
                                            relation.count.value < 3
                                                ? `text-emerald-600`
                                                : relation.count &&
                                                  relation.count.value &&
                                                  relation.count.value > 6
                                                ? "text-rose-600"
                                                : "text-amber-600") +
                                            " font-bold"
                                        }
                                    >
                                        {relation.count && relation.count.value}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(
                                            relation.count &&
                                                relation.count.first
                                        ).toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(
                                            relation.count &&
                                                relation.count.last
                                        ).toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        <Link href="/user/34324">
                                            <Button
                                                className="bg-blu"
                                                size="sm"
                                            >
                                                View
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="mt-2 flex items-center justify-between border-t border-muted pt-4">
                    <span className="text-muted-foreground">
                        Showing<span className="mx-2">—</span>
                        <span className="text-blu">10 results per page</span>
                    </span>
                </div>
            </div>
        </div>
    );
}
