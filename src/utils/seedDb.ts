import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function main() {
  console.log("Seeding DB");

  const user = await prisma.user.create({
    data: {
      id: 0,
      email: "test.user@email.com",
      sid: "U8rykxJ1n1cftGDPPPW3LNRws55-pF1a",
    },
  });
  console.log(`${user} created`);

  const audition = await prisma.audition.create({
    data: {
      id: 0,
      project: "Test Project",
      company: "Test Company",
      casting: [
        {
          name: "Test Casting Person",
        },
      ],
      notes: "Test note",
      userId: 0,
      date: 1682976446,
      type: "Theater",
    },
  });
  console.log(`${audition} created`);
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