"use client";

import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { PlusIcon, Upload } from "lucide-react";
import axios from "axios";
import { API_URL, NAV_HEIGHT } from "@/lib/constants";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Relation = {
    id: number;
    name: string;
    relationship: string;
    photo?: string;
    email?: string;
};

const AddRelationDialog = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        relationship: "",
        photo: null,
    });
    const [previewUrl, setPreviewUrl] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [relations, setRelations] = useState<Relation[]>([]);

    const handleImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target?.files?.[0];
        if (!file) return;

        // Create preview URL
        const preview = URL.createObjectURL(file);
        setPreviewUrl(preview);

        setIsUploading(true);
        try {
            // Create FormData for Imgur upload
            const formData = new FormData();
            formData.append("image", file);

            const response = await axios.post(
                "https://api.imgur.com/3/image",
                formData,
                {
                    headers: {
                        Authorization: "Client-ID YOUR_IMGUR_CLIENT_ID", // Replace with your Imgur client ID
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setFormData((prev) => ({
                ...prev,
                photo: response.data.data.link,
            }));
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await axios.post(`${API_URL}/add-relation`, {
                relation: formData,
            });
            setOpen(false);
            setFormData({ name: "", relationship: "", photo: null });
            setPreviewUrl("");
            // You might want to trigger a refresh of the relations list here
        } catch (error) {
            console.error("Error adding relation:", error);
        }
    };

    useEffect(() => {
        axios.get(`${API_URL}/get-user`).then((res) => {
            setRelations(res.data.relations);
        });
    }, [open]);

    return (
        <>
            <div
                className={`text-white min-h-[calc(100vh-${NAV_HEIGHT}px)] flex flex-col`}
            >
                <div className="fixed left-0 right-0 top-0 -z-10 h-[30%] bg-blu"></div>

                <div className="flex h-[calc(100vh-${NAV_HEIGHT}px-8rem)] flex-col rounded-xl bg-white p-6 text-black shadow-md">
                    <div className="flex w-full items-center justify-between">
                        <h2 className="mb-4 text-2xl font-bold opacity-75">
                            People you love, in one place
                        </h2>

                        <Button
                            className="bg-blu"
                            onClick={() => setOpen(!open)}
                        >
                            <PlusIcon /> Add Relation
                        </Button>
                    </div>

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
                                    <TableHead>Relation</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Relationship</TableHead>
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
                                        <TableCell>
                                            <Button
                                                className="bg-blu"
                                                size="sm"
                                            >
                                                View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="mt-2 flex items-center justify-between border-t border-muted pt-4">
                        <span className="text-muted-foreground">
                            Showing<span className="mx-2">—</span>
                            <span className="text-blu">
                                10 results per page
                            </span>
                        </span>
                    </div>
                </div>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Add New Relation</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative">
                                <label htmlFor="img-input">
                                    <Avatar className="h-24 w-24">
                                        {previewUrl ? (
                                            <AvatarImage
                                                src={previewUrl}
                                                alt="Preview"
                                                className="cursor-pointer object-cover"
                                            />
                                        ) : (
                                            <AvatarFallback className="cursor-pointer">
                                                <Upload className="h-8 w-8 text-muted-foreground" />
                                            </AvatarFallback>
                                        )}
                                    </Avatar>
                                </label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    name="img-input"
                                    id="img-input"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                    disabled={isUploading}
                                />
                            </div>
                            {isUploading && (
                                <span className="text-sm text-muted-foreground">
                                    Uploading...
                                </span>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        name: e.target.value,
                                    }))
                                }
                                required
                                placeholder="John Doe"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="relationship">Relationship</Label>
                            <Input
                                id="relationship"
                                value={formData.relationship}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        relationship: e.target.value,
                                    }))
                                }
                                required
                                placeholder="Father / Mother / Sibling / Friend"
                            />
                        </div>

                        <div className="flex justify-end gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-blu"
                                disabled={isUploading}
                            >
                                Add Relation
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AddRelationDialog;
