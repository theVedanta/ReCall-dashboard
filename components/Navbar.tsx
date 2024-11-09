"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NAV_HEIGHT } from "@/lib/constants";

const Navbar = () => {
    return (
        <nav
            className="fixed left-0 right-0 top-0 z-40 flex w-screen items-center justify-between bg-background bg-white px-10 shadow"
            style={{
                height: NAV_HEIGHT + "px",
            }}
        >
            <div className="flex items-center">
                <h1 className="text-xl font-bold text-slate-800">ReCall</h1>
            </div>
            <div className="flex items-center space-x-4">
                {/* <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search"
                        className="w-56 border-none pl-10 text-xl"
                    />
                </div> */}

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="flex items-center gap-x-4 py-7"
                        >
                            <Avatar className="h-8 w-8">
                                <AvatarImage
                                    src="/avatar.jpg"
                                    alt="User Avatar"
                                />
                                <AvatarFallback>ID</AvatarFallback>
                            </Avatar>

                            <div className="flex flex-col text-left">
                                <span className="font-bold">Vedanta Som</span>
                                <span className="font-medium">
                                    vedanta@ua.ai
                                </span>
                            </div>
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
};

export default Navbar;
