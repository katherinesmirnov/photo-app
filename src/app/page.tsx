import PhotoGrid from '@/components/PhotoGrid';
import prisma from '@/lib/prisma'
export const dynamic = "force-dynamic";

export default async function Home() {
  const photos = await prisma.photo.findMany();
  return (
    <PhotoGrid photos={photos} />
  );
}
