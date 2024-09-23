import { auth } from "@/auth";
import RefundPage from "./_components/RefundPage";

export default async function Page() {
  const session = await auth();
  return <RefundPage loginInfo={session} />;
}
