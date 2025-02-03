import { prisma } from "@/lib/prisma";
import { Voice } from "@prisma/client";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const format = url.searchParams.get("format");

  console.log("url: ", url);
  console.log("format: ", format);

  if (format === "csv") {
    const users = await prisma.users.findMany();
    const csv = users.map(
      (user: {
        id: string;
        v: number;
        createdAt: Date;
        email: string;
        firstname: string;
        lastname: string;
        phone: string | null;
        updatedAt: Date;
        address: string;
        birthDate: Date;
        city: string;
        incomingDate: Date;
        mobile: string | null;
        postalCode: string;
        type: string;
        voice: Voice;
      }) => {
        return `${user.id},${user.firstname},${user.lastname},${user.email},${user.voice},${user.incomingDate},${user.birthDate},${user.address},${user.postalCode},${user.city},${user.phone},${user.mobile},${user.type}`;
      }
    );

    const headers = new Headers();
    headers.set("Content-Type", "text/csv");
    headers.set("Content-Disposition", `attachment; filename="users.csv"`);

    return new Response(csv.join("\n"), {
      headers,
    });
  } else if (format === "json") {
    const users = await prisma.users.findMany();
    return new Response(JSON.stringify(users), {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": "attachment; filename=users.json",
      },
    });
  } else {
    return new Response("Unsupported format", { status: 400 });
  }
}
