import React from "react";
import { PublisherEnum } from "../../enum/PublisherEnum";
import HeroList from "../hero/HeroList";

const MarvelScreen = () => {
  return (
    <div data-testid="marvel-screen-container">
      <h1 data-testid="marvel-screen-title">MarvelScreen</h1>

      <HeroList publisher={PublisherEnum.MARVEL_COMICS} />
    </div>
  );
};

export default MarvelScreen;
