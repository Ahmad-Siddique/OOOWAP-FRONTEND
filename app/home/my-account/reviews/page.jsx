import { auth } from "@/auth";
import Reviews from "../_components/Reviews";

export default async function Page() {
  const session = await auth();
  return <Reviews loginInfo={session} />;
}
