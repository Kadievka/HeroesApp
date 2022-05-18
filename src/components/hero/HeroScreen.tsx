import React from "react";
import { Navigate, useParams } from "react-router";
import getHeroById from "../../helpers/utils/getHeroById";
import Hero from "../../interfaces/Hero";

const HeroScreen = () => {
  const { heroId } = useParams();

  const hero: Hero | undefined = getHeroById(heroId);

  return (
    <div>
      <h1>HeroScreen</h1>
      {hero ? (
        <>
          <p>{hero.superhero}</p>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
};

export default HeroScreen;
