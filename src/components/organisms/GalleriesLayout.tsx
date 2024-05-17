"use client";

import { useState } from "react";
import { Photo } from "pexels";
import { useGetImages } from "@/hooks/useGetImages";
import { CardGalery } from "../molecules/cardGalery";
import { SkeletonCard } from "../molecules/skeletonCard";

export const GalleriesLayout = () => {
    const [query, setQuery] = useState<string>('nature');
    const { images, isLoading } = useGetImages(query);
    let splitArrays: Photo[][] = [];

    for (let i = 0; i < images.length; i += Math.ceil(images.length / 4)) {
        splitArrays.push(images.slice(i, i + Math.ceil(images.length / 4)));
    }

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            search: { value: string };
        };
        setQuery(target.search.value);
    };

    return (
        <section className="container mt-[5.5rem]">
            <form onSubmit={handleSearch} className="flex justify-center mb-4">
                <input
                    type="text"
                    name="search"
                    className="w-full max-w-lg p-2 border rounded"
                    placeholder="Search for images..."
                />
                <button type="submit" className="p-2 ml-2 text-white bg-blue-500 rounded">
                    Search
                </button>
            </form>
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
        </section>
    );
};
