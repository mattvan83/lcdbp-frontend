import { prisma } from "@/lib/prisma";
import { createHandler } from "@premieroctet/next-admin/appHandler";
import { options } from "@/lib/options";

// console.log("Prisma instance:", prisma);

const { run } = createHandler({
  apiBasePath: "/api/admin",
  prisma,
  /*options*/
  options,
  onRequest: async (req: Request) => {
    const url = new URL(req.url);
    const { searchParams } = url;

    // Access query parameters
    const userToken = searchParams.get("token");

    if (!userToken) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    // Check if user exists and is admin
    const user = await prisma.users.findFirst({
      where: {
        token: userToken as string,
        type: "admin",
      },
    });

    if (!user) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }
  },
});

export { run as DELETE, run as GET, run as POST };
