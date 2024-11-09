"use client";
import React from "react";
import Spline from "@splinetool/react-spline";
import Link from "next/link";

const Hero = () => {
    return (
        <div className="h-screen w-full overflow-y-auto">
            <div className="relative h-screen">
                {/* Background 3D Spline Scene */}
                <Spline scene="https://prod.spline.design/8QuOI7F99R6CthFH/scene.splinecode" />
            </div>

            {/* Scrollable content */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-20 w-full flex justify-center items-center">
                <div className="flex gap-10">
                    <Link href="/user">
                        <button className="px-20 py-3 bg-white text-black text-lg rounded-md font-semibold hover:shadow-lg transform transition-transform duration-300 hover:scale-110">
                            User Dashboard
                        </button>
                    </Link>
                    <button className="px-20 py-3 bg-white text-black text-lg rounded-md font-semibold hover:shadow-lg transform transition-transform duration-300 hover:scale-110">
                        Medical Dashboard
                    </button>
                    <button className="px-20 py-3 bg-white text-black text-lg rounded-md font-semibold hover:shadow-lg transform transition-transform duration-300 hover:scale-110">
                        ReConverse
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
