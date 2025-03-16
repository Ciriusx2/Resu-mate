import { getIndustryInsights } from "@/actions/dashboard";
import DashboardView from "../_component/dashboard-view";

 export default async function Page({ params }) {
  const industry = (await params).industry;

  const insights = await getIndustryInsights(industry);

  return (
    <DashboardView insights={insights} />
  );
}