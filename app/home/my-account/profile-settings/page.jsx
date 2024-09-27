import { auth } from "@/auth";
import ProfileSettings from "../_components/ProfileSettings";

export default async function Page() {
  
  const session = await auth();
  return (
    
      <ProfileSettings loginInfo={session} />
   
  );
}
