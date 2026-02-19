import prisma from '@/lib/prisma';


async function main() {
  // create section
  const section = await prisma.section.create({
    data: {
      name: "test Album",
      totalItems: 1
    }
  })
  console.log('Created section:', section)


  // Create a new user with a post
  const photo = await prisma.photo.createMany({
    data: [
      {
        filePath: "/images/photo1.jpg",
        takenDate: new Date(),
        isFavorite: true,
        sectionId: 1
      },
      {
        filePath: "/images/photo2.jpg",
        takenDate: new Date(),
        isFavorite: false
      }
    ]
  })
  console.log('Created photo:', photo)
  // Fetch all users with their posts
  const allPhotos = await prisma.photo.findMany({
    include: {
      section: true,
    },
  })
  console.log('All photos:', JSON.stringify(allPhotos, null, 2))
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
