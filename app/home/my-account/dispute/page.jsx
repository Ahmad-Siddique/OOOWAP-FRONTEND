import { auth } from "@/auth";
import Dispute from "../_components/Dispute";

export default async function Page() {
  const session = await auth();
  return <Dispute loginInfo={session} />;
}
