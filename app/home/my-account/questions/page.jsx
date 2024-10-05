import { auth } from "@/auth";
import AcceptedTrades from "../_components/Questions";

export default async function Page() {
  const session = await auth();
  return <AcceptedTrades loginInfo={session} />;
}
