// hooks/useGetImages.ts
import { useState, useEffect } from 'react';
import { createClient, Photo, PhotosWithTotalResults, ErrorResponse } from 'pexels';

const client = createClient('lcUID8vBcKivD1Jdkk5YAkd6f54U1RSNItwjaOmGB7CzKuxcSdkrzvVY');

export const useGetImages = (query: string) => {
  const [images, setImages] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const response: PhotosWithTotalResults | ErrorResponse = await client.photos.search({ query, per_page: 40 });
        if ('photos' in response) {
          setImages(response.photos);
        } else {
          console.error('Error response from Pexels API:', response);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query]);

  return { images, isLoading };
};
