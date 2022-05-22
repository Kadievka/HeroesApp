import React from "react";
import { PublisherEnum } from "../../enum/PublisherEnum";
import HeroList from "../hero/HeroList";

const DcScreen = () => {
  return (
    <div data-testid="dc-screen-container">
      <h1>DcScreen</h1>

      <HeroList publisher={PublisherEnum.DC_COMICS} />
    </div>
  );
};

export default DcScreen;
