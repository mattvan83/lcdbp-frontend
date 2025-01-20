import { NextAdmin, PageProps } from "@premieroctet/next-admin";
import { getNextAdminProps } from "@premieroctet/next-admin/appRouter";
import { prisma } from "@/lib/prisma";
import "../../globals.css"; // .css file containing tailiwnd rules

console.log("Prisma instance:", prisma);

export default async function AdminPage({ params, searchParams }: PageProps) {
  // or PromisePageProps for Next 15+
  const props = await getNextAdminProps({
    params: params.nextadmin,
    searchParams,
    basePath: "/admin",
    apiBasePath: "/api/admin",
    prisma,
    /*options*/
  });

  return <NextAdmin {...props} />;
}

// export default function AdminDashboard() {
//   return <h1>Admin Dashboard</h1>;
// }
