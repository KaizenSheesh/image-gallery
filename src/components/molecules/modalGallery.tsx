import React from 'react';
import { Photo } from "pexels";
import { MoveUpRight, X } from 'lucide-react';
import Link from 'next/link';

interface DownloadModalProps {
    imageUrl: string;
    photographer: string;
    photographer_url: string;
    onClose: () => void;
}

export const ModalGallery: React.FC<DownloadModalProps> = ({ imageUrl, photographer, photographer_url, onClose }) => {
    const handleDownload = async () => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const imageUrlObject = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = imageUrlObject;
            link.download = `photocode-${photographer}.jpg`;
            document.body.appendChild(link);
            link.click();
            URL.revokeObjectURL(imageUrlObject);

            onClose();
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white flex flex-col lg:flex-row p-2 rounded-xl shadow-lg gap-2">
                <button
                    onClick={onClose}
                    className="absolute -top-2 -right-2 p-1 rounded-full bg-white hover:bg-gray-400"
                >
                    <X />
                </button>
                <img src={imageUrl} alt={photographer} className="w-full rounded-lg object-cover h-56 max-h-96" />
                <div className="flex flex-col justify-between space-y-5 w-96 h-auto">
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold">Tentang foto</h2>
                        <p>Terima kasih sudah mendownload foto dari Photocode, jangan lupa untuk mampir ke profile sang Fotografer!</p>
                        <div className="space-y-2">
                            <h5>Fotografer</h5>
                            <div className="py-2 px-2 md:px-3 w-max md:py-2 flex justify-center items-center gap-x-1 rounded-full bg-orangeprimary">
                                <Link href={photographer_url} className='text-white'>
                                    <span>{photographer}</span>
                                </Link>
                                <MoveUpRight color='white' size={15} />
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleDownload}
                        className="px-4 py-2 bg-orangeprimary text-white rounded-full hover:bg-white hover:text-orangeprimary hover:border hover:border-orangeprimary transition-all duration-300"
                    >
                        Download
                    </button>
                </div>
            </div>
        </div>
    );
};
