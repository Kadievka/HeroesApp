import React from "react";
import getHeroesByPublisher from "../../helpers/utils/getHeroesByPublisher";
import Heroe from "../../interfaces/Heroe";
import HeroListPropsInterface from "../../interfaces/HeroListPropsInterface";

const HeroList = ({ publisher }: HeroListPropsInterface) => {
  const heroes: Heroe[] = getHeroesByPublisher(publisher);

  return (
    <>
      <h1>HeroList - {publisher}</h1>

      <ul>
        {heroes.map((hero) => (
          <li key={hero.id}>{hero.superhero}</li>
        ))}
      </ul>
    </>
  );
};

export default HeroList;
