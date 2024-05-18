"use client"
import React, { useEffect, useState } from 'react';
import { Photo } from 'pexels';
import { MoveUpRight } from 'lucide-react';
import Link from 'next/link';
import { ModalGallery } from './modalGallery';

interface CardGaleryProps {
  image: Photo;
}

const useScreenWidth = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile;
};
export const CardGalery: React.FC<CardGaleryProps> = ({ image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useScreenWidth()

  const handleDownloadClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative overflow-hidden rounded shadow-lg group">
      <img
        src={image.src.medium}
        alt={image.photographer}
        className="object-cover w-full h-full group-hover:scale-105 transition-all duration-300 hover:brightness-50"
      />
      <div className="absolute flex justify-end items-center top-[-100px] left-0 w-full p-2 bg-opacity-50 text-white text-sm truncate transition-all duration-300 group-hover:top-0">
        <div className="py-2 px-2 flex justify-center items-center gap-x-1 rounded-full bg-orangeprimary">
          <button
            className='text-white bg-orangeprimary rounded-full'
            onClick={handleDownloadClick}
          >
            Simpan
          </button>
        </div>
      </div>
      <div className="absolute flex flex-col space-y-2 bottom-[-300px] left-0 w-full p-2 bg-opacity-50 text-white text-sm truncate transition-all duration-300 group-hover:bottom-0">
        <div className="py-2 px-2 md:px-3 md:py-2 flex w-max justify-center items-center gap-x-1 rounded-full bg-orangeprimary">
          <Link href={image.photographer_url}>
            <span className={isMobile ? 'truncate' : ''}>{isMobile ? image.photographer.split(' ')[0] + '...' : image.photographer}</span>
          </Link>
          <MoveUpRight size={15} />
        </div>
        <div className="py-2 flex-wrap px-2 md:px-3 md:py-2 flex w-full">
          <p className="max-w-full truncate text-xs md:max-w-full lg:text-sm">
            {image.alt}
          </p>
        </div>
      </div>
      {isModalOpen && (
        <ModalGallery
          imageUrl={image.src.large}
          photographer={image.photographer}
          photographer_url={image.photographer_url}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};
