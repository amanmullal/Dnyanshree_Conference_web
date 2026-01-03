import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Features } from "../components/Features";
import { About } from "../components/About";
import { Services } from "../components/Services";
import ElectricityNetworkEcosystem from "../components/FuturisticTopicEcosystem";
import { Gallery } from "../components/Gallery";
import { Testimonials } from "../components/Testimonials";
import { Team } from "../components/Team";
import { Contact } from "../components/Contact";
import JsonData from "../data/data.json";
import StatsSection from "../components/stats/StatsSection";

const HomePage = () => {
  const [landingPageData, setLandingPageData] = useState({});

  useEffect(() => {
    setLandingPageData(JsonData);
    // Scroll to top when component mounts (except when navigating with hash)
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
      <About data={landingPageData.About} />
      <Services data={landingPageData.Services} />
      {/* <Gallery data={landingPageData.Gallery} /> */}
      {/* <StatsSection /> */}
      <Team data={landingPageData.Team} />
      <Contact data={landingPageData.Contact} team={landingPageData.Team} />
    </>
  );
};

export default HomePage;
