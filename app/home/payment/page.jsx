import PaymentStatusPage from "./_components/PaymentStatus";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  return <PaymentStatusPage loginInfo={session} />;
}
