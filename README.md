photo-app

future features
- sqlite connection
- set up server
- photo albums?



https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/sqlite#8-write-your-first-query

https://www.prisma.io/docs/guides/nextjs#31-update-your-data-optional

docker build --no-cache -t nextjs-image . && docker run --rm -e DATABASE_URL=file:./data/dev.db -p 3000:3000 nextjs-image