import React from "react";

import HERO from "./landingpage/HERO";
import Featured from "./landingpage/Featured";
import Carousal from "./landingpage/Carousal";
import Tiers from "./landingpage/Tiers";

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <HERO />

      {/* Featured Pieces Section */}
      <Featured />

      {/* Full-Bleed Carousel Section */}
      <Carousal />

      <Tiers />
    </div>
  );
};

export default LandingPage;
