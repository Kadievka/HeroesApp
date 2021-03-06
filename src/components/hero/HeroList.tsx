import React, { useMemo } from "react";
import getHeroesByPublisher from "../../helpers/utils/getHeroesByPublisher";
import Hero from "../../interfaces/components/Hero";
import HeroListPropsInterface from "../../interfaces/components/HeroListPropsInterface";
import HeroCard from "./HeroCard";

const HeroList = ({ publisher }: HeroListPropsInterface) => {
  const heroes: Hero[] = useMemo(() => getHeroesByPublisher(publisher), [publisher]);

  return (
    <div className="card-columns animate__animated animate__fadeIn" data-testid="hero-list-container">
      {heroes.map((hero) => (
        <HeroCard key={hero.id} {...hero} />
      ))}
    </div>
  );
};

export default HeroList;
