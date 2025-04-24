// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding data...');

  const users = await prisma.user.createMany({
    data: [
      { name: 'Alice Johnson', email: 'alice@example.com' },
      { name: 'Bob Smith', email: 'bob@example.com' },
      { name: 'Charlie Brown', email: 'charlie@example.com' },
    ],
  });

  console.log(`✅ Seeded ${users.count} users.`);

  // Optional: Seed a loan for one of the users (e.g., user with ID 1)
  const loan = await prisma.loan.create({
    data: {
      userId: 1, // assuming user with ID 1 exists
      amount: 2500,
      interestRate: 5.2,
      startDate: new Date('2025-04-01'),
      dueDate: new Date('2025-10-01'),
      status: 'ACTIVE',
    },
  });

  console.log(`✅ Created loan ID: ${loan.id}`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
