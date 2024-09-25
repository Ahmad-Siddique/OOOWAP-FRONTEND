import { auth } from "@/auth";
import UserProfile from "./_components/UserProfile";
import Tabs from "./_components/Tabs";

export default async function MyAccLayout({ children }) {
  const session = await auth();

  
  return (
    <div className="flex flex-col">
      <UserProfile loginInfo={session} />
      <div className="w-full bg-[#F8F8F8]">
        {/* Tabs */}
        <div className="px-5 border-b-4 border-primary bg-white flex items-center justify-center">
          <Tabs />
        </div>
        {/* Tab Content */}
        <div className="mt-4 md:mt-2 w-full pt-4">{children}</div>
      </div>
    </div>
  );
}
