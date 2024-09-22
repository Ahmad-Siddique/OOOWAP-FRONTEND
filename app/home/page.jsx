import Carousal from "../../components/landing-page/Carousal";
import Featured from "../../components/landing-page/Featured";
import HERO from "../../components/landing-page/HERO";
import Tiers from "../../components/landing-page/Tiers";

export default function Home() {
  return (
    <>
      <HERO />
      <Featured />
      <Carousal />
      <Tiers />
    </>
  );
}
