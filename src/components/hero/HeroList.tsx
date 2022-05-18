import React from "react";
import getHeroesByPublisher from "../../helpers/utils/getHeroesByPublisher";
import Heroe from "../../interfaces/Heroe";
import HeroListPropsInterface from "../../interfaces/HeroListPropsInterface";
import HeroCard from "./HeroCard";

const HeroList = ({ publisher }: HeroListPropsInterface) => {
  const heroes: Heroe[] = getHeroesByPublisher(publisher);

  return (
    <div className="card-columns">
      {heroes.map((hero) => (
        <HeroCard key={hero.id} {...hero} />
      ))}
    </div>
  );
};

export default HeroList;
