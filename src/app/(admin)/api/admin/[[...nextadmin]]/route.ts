import { prisma } from "@/lib/prisma";
import { createHandler } from "@premieroctet/next-admin/appHandler";
import { options } from "@/lib/options";

// console.log("Prisma instance:", prisma);

const { run } = createHandler({
  apiBasePath: "/api/admin",
  prisma,
  /*options*/
  options,
});

export { run as DELETE, run as GET, run as POST };
