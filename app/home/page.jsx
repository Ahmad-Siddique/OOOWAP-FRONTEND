import { auth } from "@/auth";
import Carousal from "@/components/landing-page/Carousal";
import Featured from "@/components/landing-page/Featured";
import Hero from "@/components/landing-page/Hero";
import Tiers from "@/components/landing-page/Tiers";

export default async function Home() {
  const session = await auth();
  return (
    <>
      <Hero />
      <Featured loginInfo={session} />
      <Carousal />
      <Tiers />
    </>
  );
}
