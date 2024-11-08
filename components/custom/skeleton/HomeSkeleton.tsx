"use client";
import React, { useEffect, useState } from "react";
import { listBenefit } from "@/initialData/home";

type Props = {
  serviceNames: string[];
  services: {
    name: string;
    id: string;
    description: string;
    image: string;
  }[];
};

export default function HomeContainerSkeleton() {
  const dotArray = Array.from({ length: 4 }, () => Array(4).fill(0));

  return (
    <div>
      <div className="w-full">
        <div className="relative">
          <div className="bg-[#FEF2E9] lg:h-auto h-[300px] dark:bg-slate-200 flex items-center justify-around animate-pulse" style={{ zIndex: 20 }}>
            <div className="lg:ml-40 ml-10 md:ml-20">
              <div className="flex flex-col min-w-80 mb-20 z-10 relative">
                <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-gray-300 rounded w-2/4 mb-4"></div>
              </div>
              <div className="mt-6">
                <div className="h-12 bg-gray-300 rounded w-48"></div>
              </div>
            </div>
            <div className="absolute lg:flex items-center justify-center w-16 right-20 top-20 hidden">
              {dotArray.map((row, rowIndex) => (
                <div key={rowIndex}>
                  {row.map((_, colIndex) => (
                    <div key={colIndex} className="w-5 h-5 bg-gray-300 rounded-full mx-1 my-2" />
                  ))}
                </div>
              ))}
            </div>
            <div className="relative z-0 lg:block hidden">
              <div className="w-96 h-96 bg-gray-300 rounded-full"></div>
            </div>
          </div>
          <div className="w-full h-16 bg-gray-300 z-10" />
        </div>

        <div className="lg:px-32 px-16">
          <div className="mt-16">
            <div className="flex justify-center">
              <div className="h-8 bg-gray-300 rounded w-2/4"></div>
            </div>
            <div className="flex justify-center mt-6">
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>

          <div className="mt-10 mb-20">
            <div className="flex justify-between">
              {Array(4).fill(0).map((_, index) => (
                <div key={index} className="flex flex-col items-center justify-between min-w-[280px] rounded-2xl shadow-md p-4 border dark:bg-slate-700 animate-pulse">
                  <div className="h-40 bg-gray-300 rounded-xl w-full"></div>
                  <div className="w-full h-6 bg-gray-300 mt-4 rounded"></div>
                  <div className="h-12 bg-gray-300 w-3/4 mt-4 rounded"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-24">
            <div>
              <div className="h-8 bg-gray-300 rounded w-2/4 mb-8"></div>
              <div className="w-full h-56 bg-gray-300 rounded"></div>
            </div>
            <div className="mt-12 grid xl:grid-cols-4 gap-2 md:grid-cols-2 grid-cols-1">
              {listBenefit.map((_, index) => (
                <div key={index} className="flex flex-col items-center justify-between min-w-[280px] rounded-2xl shadow-md p-4 border dark:bg-slate-700 animate-pulse">
                  <div className="h-24 bg-gray-300 rounded-xl w-full"></div>
                  <div className="w-full h-6 bg-gray-300 mt-4 rounded"></div>
                  <div className="h-12 bg-gray-300 w-3/4 mt-4 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

