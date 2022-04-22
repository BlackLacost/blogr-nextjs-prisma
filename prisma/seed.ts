import { faker } from '@faker-js/faker'
import prisma from '../lib/prisma'

async function createUsers(count: number = 3) {
  for (let i = 0; i < count; i++) {
    await prisma.user.create({
      data: {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: `${faker.hacker.noun()}@gmail.com`,
      },
    })
  }
}

async function getRandomUserId() {
  const users = await prisma.user.findMany()
  const userIds = users.map((user) => user.id)
  return userIds[Math.floor(Math.random() * userIds.length)]
}

export const main = async () => {
  await prisma.user.deleteMany({})
  await prisma.post.deleteMany({})

  await createUsers(3)

  for (let i = 0; i < 100; i++) {
    await prisma.post.create({
      data: {
        title: `${faker.hacker.noun()}`,
        content: `${faker.hacker.phrase()}`,
        published: Math.random() < 0.9,
        authorId: await getRandomUserId(),
      },
    })
  }
}

main()
  .catch((e) => {
    console.log(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
