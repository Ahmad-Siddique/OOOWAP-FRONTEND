import dynamic from "next/dynamic";
import { auth } from "@/auth";
const LoginPage = dynamic(() => import("./LoginPage"), { ssr: false });

const Page = async () => {
  const session = await auth();
  return <LoginPage loginInfo={session} />;
};

export default Page;
