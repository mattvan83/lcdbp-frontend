import { NextAdmin, PageProps } from "@premieroctet/next-admin";
import { getNextAdminProps } from "@premieroctet/next-admin/appRouter";
import { prisma } from "@/lib/prisma";
import { options } from "@/lib/options";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import "../../globals.css"; // .css file containing tailiwnd rules

// console.log("Prisma instance:", prisma);

export default async function AdminPage({ params, searchParams }: PageProps) {
  // or PromisePageProps for Next 15+

  // Get the token from cookies
  const cookieStore = cookies();
  const userToken = cookieStore.get("user_token")?.value;
  // console.log("userToken: ", userToken);

  if (!userToken) {
    redirect("/");
  }

  // Check if user exists and is admin
  const user = await prisma.users.findFirst({
    where: {
      token: userToken,
      type: "admin",
    },
  });
  // console.log("user: ", user);

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

  return (
    <NextAdmin
      {...props}
      // user={{
      //   data: {
      //     name: `${user.firstname}`,
      //   },
      // }}
    />
  );
}
