import React from "react";
import "./style.css";
import DescriptionDESC from "./sub/PropertyDes";
import DescriptionOwner from "./sub/Owner";

const Description: React.FC<NewPropertyCreate> = ({
  initProperty,
  setProperty,
}) => {
  return (
    <>
      <DescriptionOwner initProperty={initProperty} setProperty={setProperty} />
      <DescriptionDESC initProperty={initProperty} setProperty={setProperty} />
    </>
  );
};

export default Description;
