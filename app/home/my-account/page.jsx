import { auth } from "@/auth";
import UserProfile from "./_components/UserProfile";

export default async function Page() {
  const session = await auth();
  return <UserProfile loginInfo={session} />;
}
