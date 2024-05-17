import React from 'react';
import { Photo } from 'pexels';
import Image from 'next/image';

interface CardGaleryProps {
  image: Photo;
}

export const CardGalery: React.FC<CardGaleryProps> = ({ image }) => {
  return (
    <div className="relative overflow-hidden rounded shadow-lg h-80 group">
      <Image
        layout="fill"
        objectFit="cover"
        src={image.src.medium}
        alt={image.photographer}
        className="object-cover w-full h-full"
      />
      <p className="absolute bottom-[-50px] left-0 w-full p-2 bg-black bg-opacity-50 text-white text-sm truncate transition-all duration-300 group-hover:bottom-0">
        {image.photographer}
      </p>
    </div>
  );
};
