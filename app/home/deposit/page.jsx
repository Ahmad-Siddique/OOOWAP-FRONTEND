import { auth } from "@/auth";
import DepositPage from "./_components/DepositPage";

export default async function Page() {
  const session = await auth();
  return <DepositPage loginInfo={session} />;
}
