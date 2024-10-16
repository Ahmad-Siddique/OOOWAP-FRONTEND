import { auth } from "@/auth";
import Profile from "./_components/Profile";

export default async function Page() {
  const session = await auth();
  return <Profile loginInfo={session} />;
}
