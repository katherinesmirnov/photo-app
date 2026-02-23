import prisma from '../src/lib/prisma';

async function main() {
  const section = await prisma.section.create({
    data: {
      name: 'test Album',
      totalItems: 2,
    },
  });
  console.log('Created section:', section);

  const photo = await prisma.photo.createMany({
    data: [
      {
        filePath: 'photo1.JPG',
        takenDate: new Date(),
        isFavorite: true,
        sectionId: section.id,
      },
      {
        filePath: 'photo2.JPG',
        takenDate: new Date(),
        isFavorite: false,
      },
    ],
  });
  console.log('Created photo:', photo);

  const allPhotos = await prisma.photo.findMany({
    include: {
      section: true,
    },
  });
  console.log('All photos:', JSON.stringify(allPhotos, null, 2));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });