"use client";

import { useState, useEffect } from "react";
import { Photo } from "pexels";
import { useGetImages } from "@/hooks/useGetImages";
import { CardGalery } from "../molecules/cardGalery";
import { SkeletonCard } from "../molecules/skeletonCard";
import { KEYWORD } from "@/constant";
import { useSearchHandlers } from "@/hooks/useSearchHandlers";

export const GalleriesLayout = () => {
    const { query, handleSearch, handleKeywordSearch } = useSearchHandlers();
    const { images, isLoading } = useGetImages(query);
    let splitArrays: Photo[][] = [];

    for (let i = 0; i < images.length; i += Math.ceil(images.length / 4)) {
        splitArrays.push(images.slice(i, i + Math.ceil(images.length / 4)));
    }

    return (
        <section className="space-y-5">
            <div className="relative w-full h-[545px]">
                <img
                    src={'/image.jpg'}
                    alt="Header Image"
                    className="w-full h-full object-cover brightness-[0.4]"
                />
                <div className="absolute top-0 w-full h-full flex flex-col justify-center items-center z-10 space-y-5 p-5">
                    <h1 className="text-3xl md:text-5xl font-bold text-white">Photo<span className="text-orangeprimary">code</span></h1>
                    <p className="text-base md:text-2xl text-center text-white md:w-1/2">
                        Temukan apapun yang ingin anda cari disini! Photocode menyediakan lebih dari 130k+ gambar dengan tinggi, cepat dan tentunya gratis hanya untuk kamu!
                    </p>
                    <form onSubmit={handleSearch} className="flex w-full justify-center mb-4">
                        <input
                            type="text"
                            name="search"
                            className="w-full max-w-lg p-2 border rounded"
                            placeholder="Temukan gambar anda!"
                        />
                        <button type="submit" className="p-2 ml-2 text-white bg-orangeprimary rounded">
                            Search
                        </button>
                    </form>
                </div>
            </div>
            <div className="container space-y-5">
                <div className="w-full flex flex-col justify-center items-center h-auto space-y-2">
                    <h2 className="text-xl font-semibold text-center">Free {query} Images</h2>
                    <div className="w-full flex justify-start md:justify-center items-center h-auto overflow-x-auto space-x-2">
                        <div className="flex space-x-2 px-2">
                            {KEYWORD.map((keyword, index) => (
                                <button key={index} className="w-max h-18 text-white bg-orangeprimary rounded-full p-2 whitespace-nowrap" onClick={() => handleKeywordSearch(keyword)}>
                                    {keyword}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                {isLoading ? (
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <SkeletonCard key={index} />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
                        {splitArrays.length > 0 ? (
                            splitArrays.map((splitArray, index) => (
                                <div key={index} className="grid gap-2 md:gap-4">
                                    {splitArray.map((image) => (
                                        <CardGalery key={image.id} image={image} />
                                    ))}
                                </div>
                            ))
                        ) : (
                            <div className="h-screen flex items-center justify-center">
                                <div className="text-lg">No images found.</div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};
