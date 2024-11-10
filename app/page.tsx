"use client";
import React from "react";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import { ArrowLeft, ArrowRight, User, BriefcaseMedical } from "lucide-react";

const Hero = () => {
    return (
        <div className="h-screen w-full overflow-y-auto">
            <div className="relative h-screen">
                <Spline scene="https://prod.spline.design/iXWp5T2scXWGQstp/scene.splinecode" />
            </div>

            {/* Navigation buttons */}
            <div className="absolute top-1/2 w-full flex justify-between items-center px-8 -translate-y-1/2">
                <Link href="/user">
                    <div className="flex items-center gap-2 text-slate-800 hover:text-slate-600 transition-colors">
                        <ArrowLeft size={44} />
                        <User size={44} />
                    </div>
                </Link>
                <Link href="/medical">
                    <div className="flex items-center gap-2 text-slate-800 hover:text-slate-600 transition-colors">
                        <BriefcaseMedical size={44} />
                        <ArrowRight size={44} />
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Hero;
