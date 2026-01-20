import PhotoGrid from '@/app/components/PhotoGrid';
import type { Photo } from './types/photo';
// Pass photos from your database

// Mock photo data - replace with actual data from your database
const generateMockPhotos = (count: number): Photo[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    filePath: `https://picsum.photos/seed/photo-${i + 1}/800/600`,
    takenDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
    camera: ['Canon EOS R5', 'Sony A7IV', 'Nikon Z6'][Math.floor(Math.random() * 3)],
    isFavorite: Math.random() > 0.8
  }));
};

export default function Home() {
  return (
    <PhotoGrid photos={generateMockPhotos(50)} />
  );
}
