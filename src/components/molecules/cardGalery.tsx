import React from 'react';
import { Photo } from 'pexels';

interface CardGaleryProps {
  image: Photo;
}

export const CardGalery: React.FC<CardGaleryProps> = ({ image }) => {
  return (
    <div className="relative overflow-hidden rounded shadow-lg">
      <img
        className="object-cover w-full h-full"
        src={image.src.medium} 
        alt={image.photographer} 
      />
      <p className="absolute bottom-0 left-0 w-full p-2 bg-black bg-opacity-50 text-white text-sm truncate">
        {image.photographer}
      </p>
    </div>
  );
};
