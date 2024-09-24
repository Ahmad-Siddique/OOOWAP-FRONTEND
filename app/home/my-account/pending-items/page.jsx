import { auth } from "@/auth";
import PendingItems from "../_components/PendingItems";

export default async function Page() {
  const session = await auth();
  return <PendingItems loginInfo={session} />;
}

