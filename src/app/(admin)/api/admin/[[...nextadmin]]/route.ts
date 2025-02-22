import { prisma } from "@/lib/prisma";
import { createHandler } from "@premieroctet/next-admin/appHandler";
import { options } from "@/lib/options";
import { cookies } from "next/headers";

// console.log("Prisma instance:", prisma);

const { run } = createHandler({
  apiBasePath: "/api/admin",
  prisma,
  /*options*/
  options,
  onRequest: async (req: Request) => {
    // Get the token from cookies
    const cookieStore = cookies();
    const userToken = cookieStore.get("user_token")?.value;
    // console.log("userToken: ", userToken);

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
    // console.log("user: ", user);

    if (!user) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }
  },
});

export { run as DELETE, run as GET, run as POST };
