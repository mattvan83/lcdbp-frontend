import { prisma } from "@/lib/prisma";

async function main() {
  const users = await prisma.user.findMany();
  console.log(users);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
