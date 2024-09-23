import { auth } from "@/auth";
import Carousal from "../../components/landing-page/Carousal";
import Featured from "../../components/landing-page/Featured";
import HERO from "../../components/landing-page/HERO";
import Tiers from "../../components/landing-page/Tiers";

export default async function Home() {
  const session = await auth();
  return (
    <>
      <HERO />
      <Featured loginInfo={session} />
      <Carousal />
      <Tiers />
    </>
  );
}
