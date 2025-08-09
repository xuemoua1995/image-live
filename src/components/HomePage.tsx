import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import FlightSearch from "./FlightSearch";

const HomePage = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <Hero />
      <FlightSearch />
    </div>
  );
};

export default HomePage;
