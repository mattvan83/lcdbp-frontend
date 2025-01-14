import { NextAdmin, PageProps } from "@premieroctet/next-admin";
import { getNextAdminProps } from "@premieroctet/next-admin/appRouter";
import { prisma } from "@prisma/client";
import "@/app/globals.css"; // .css file containing tailiwnd rules

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
