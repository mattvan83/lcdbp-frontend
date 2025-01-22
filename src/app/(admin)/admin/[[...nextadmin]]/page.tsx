import { NextAdmin, PageProps } from "@premieroctet/next-admin";
import { getNextAdminProps } from "@premieroctet/next-admin/appRouter";
import { prisma } from "@/lib/prisma";
import { options } from "@/lib/options";
import "../../globals.css"; // .css file containing tailiwnd rules
import { redirect } from "next/navigation";

// console.log("Prisma instance:", prisma);

export default async function AdminPage({ params, searchParams }: PageProps) {
  // or PromisePageProps for Next 15+

  const userToken = searchParams?.["token"];

  if (!userToken) {
    redirect("/");
  }

  // Check if user exists and is admin
  const user = await prisma.users.findFirst({
    where: {
      token: userToken as string,
      type: "admin",
    },
  });

  if (!user) {
    redirect("/");
  }

  const props = await getNextAdminProps({
    params: params.nextadmin,
    searchParams,
    basePath: "/admin",
    apiBasePath: "/api/admin",
    prisma,
    /*options*/
    options,
  });

  return <NextAdmin {...props} />;
}
