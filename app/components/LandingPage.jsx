import React from "react";

import HERO from "./landingpage/HERO";
import Featured from "./landingpage/Featured";
import Carousal from "./landingpage/Carousal";

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <HERO />

      {/* Featured Pieces Section */}
      <Featured />

      {/* Full-Bleed Carousel Section */}
      <Carousal />
    </div>
  );
};

export default LandingPage;
