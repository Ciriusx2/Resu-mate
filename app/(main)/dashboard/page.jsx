import DashboardView from "./_component/dashboard-view";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      industryInsight: true,
    },
  });

  if (!user) throw new Error("User not found");

  redirect(`/dashboard/${user.industry}`);

  return (
    <div>
      <p className="text-white">Redirecting to Industry Insights</p>
    </div>
  );
}