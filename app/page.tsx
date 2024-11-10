"use client";
import React from "react";
import Spline from "@splinetool/react-spline";
import Link from "next/link";

const Hero = () => {
    return (
        <div className="h-screen w-full overflow-y-auto">
            <div className="relative h-screen">
                <Spline scene="https://prod.spline.design/iXWp5T2scXWGQstp/scene.splinecode" />
            </div>

            {/* Scrollable content */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-20 w-full flex justify-center items-center">
                <div className="flex gap-10">
                    <Link href="/user">
                        <button className="px-20 py-3 bg-transparent text-slate-800 rounded-full border-2 border-slate-800 text-lg font-semibold hover:shadow-lg transform transition-transform duration-300 hover:scale-110">
                            User Dashboard
                        </button>
                    </Link>
                    <Link
                        href="/medical"
                        className="px-20 py-3 bg-transparent text-slate-800 rounded-full border-2 border-slate-800 text-lg font-semibold hover:shadow-lg transform transition-transform duration-300 hover:scale-110"
                    >
                        Medical Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Hero;
