import { auth } from "@/auth";
import ShopDetailPage from "./_components/ShopDetailsPage";

export default async function Page({ params }) {
  const session = await auth();
  return <ShopDetailPage loginInfo={session} params={params} />;
}
