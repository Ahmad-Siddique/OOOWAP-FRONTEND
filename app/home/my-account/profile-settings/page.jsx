import { auth } from "@/auth";
import ProfileSettings from "../_components/ProfileSettings";
import { SessionProvider } from "next-auth/react";
export default async function Page() {
  
  const session = await auth();
  return (
    
      <ProfileSettings loginInfo={session} />
    </SessionProvider>
  );
}
