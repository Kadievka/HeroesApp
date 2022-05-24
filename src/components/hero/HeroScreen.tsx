import React, { useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import getHeroById from "../../helpers/utils/getHeroById";
import Hero from "../../interfaces/components/Hero";

const heroImages = require.context(`../../../public/assets/images/heroes`);

const HeroScreen = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate(-1);
  };

  const { heroId } = useParams();

  const hero: Hero | undefined = useMemo(() => getHeroById(heroId), [heroId]);

  if (!hero) return <Navigate to="/" />;

  const { id, superhero, publisher, alter_ego, first_appearance, characters } = hero;

  return (
    <div className="row mt-5" data-testid="hero-screen-container">
      <div className="col-4">
        <img
          src={heroImages(`./${id}.jpg`)}
          className="img-thumbnail animate__animated animate__fadeInLeft"
          alt={superhero}
          data-testid="hero-screen-image"
        />
      </div>

      <div className="col-8 animate__animated animate__fadeIn">
        <h3>{superhero}</h3>

        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <b>Alter ego:</b> {alter_ego}
          </li>
          <li className="list-group-item">
            <b>Publisher:</b> {publisher}
          </li>
          <li className="list-group-item">
            <b>First appearance:</b> {first_appearance}
          </li>
        </ul>

        <h5 className="mt-3">Characters</h5>
        <p>{characters}</p>

        <button className="btn btn-outline-info" onClick={handleReturn} data-testid="hero-screen-return-button">
          Return
        </button>
      </div>
    </div>
  );
};

export default HeroScreen;
