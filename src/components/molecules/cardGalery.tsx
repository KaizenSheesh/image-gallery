"use client"
import React, { useEffect, useState } from 'react';
import { Photo } from 'pexels';
import { ArrowDownToLine, MoveUpRight } from 'lucide-react';
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
        className="object-cover w-full h-full"
      />
      <div className="absolute flex justify-between items-center bottom-[-60px] left-0 w-full p-2 bg-black bg-opacity-50 text-white text-sm truncate transition-all duration-300 group-hover:bottom-0">
        <div className="py-2 px-2 md:px-3 md:py-2 flex justify-center items-center gap-x-1 rounded-full bg-orangeprimary">
          <Link href={image.photographer_url}>
            <span className={isMobile ? 'truncate' : ''}>{isMobile ? image.photographer.split(' ')[0] + '...' : image.photographer}</span>
          </Link>
          <MoveUpRight size={15} />
        </div>
        <button
          className='p-2 ml-1 text-white bg-orangeprimary rounded-full'
          onClick={handleDownloadClick}
        >
          <ArrowDownToLine size={20} />
        </button>
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
