import { auth } from "@/auth";
import TradeHistory from "../_components/TradeHistory";

export default async function Page() {
  const session = await auth();
  return <TradeHistory loginInfo={session} />;
}
