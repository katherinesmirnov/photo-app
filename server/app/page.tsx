import PhotoGrid from '@/app/components/PhotoGrid';
import prisma from '@/lib/prisma'

export default async function Home() {
  const photos = await prisma.photo.findMany();
  return (
    <PhotoGrid photos={photos} />
  );
}
