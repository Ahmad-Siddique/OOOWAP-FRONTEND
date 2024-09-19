import dynamic from "next/dynamic";

const LoginPage = dynamic(() => import("./LoginPage"), { ssr: false });

const Page = () => {
  return <LoginPage />;
};

export default Page;
