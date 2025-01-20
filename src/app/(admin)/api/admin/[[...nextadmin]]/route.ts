import { prisma } from "@/lib/prisma";
import { createHandler } from "@premieroctet/next-admin/appHandler";

console.log("Prisma instance:", prisma);

const { run } = createHandler({
  apiBasePath: "/api/admin",
  prisma,
  /*options*/
});

export { run as DELETE, run as GET, run as POST };
