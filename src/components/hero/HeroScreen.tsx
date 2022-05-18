import React, { useMemo } from "react";
import { Navigate, useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import getHeroById from "../../helpers/utils/getHeroById";
import Hero from "../../interfaces/Hero";

const HeroScreen = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate(-1);
  };

  const { heroId } = useParams();

  const hero: Hero | undefined = useMemo(() => getHeroById(heroId), [heroId]);

  if (!hero) return <Navigate to="/" />;

  const { id, superhero, publisher, alter_ego, first_appearance, characters } = hero;

  const imagePath = `${process.env.PUBLIC_URL}/assets/images/heroes/${id}.jpg`;

  return (
    <div className="row mt-5">
      <div className="col-4">
        <img src={imagePath} className="img-thumbnail" alt={superhero} />
      </div>

      <div className="col-8">
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

        <button className="btn btn-outline-info" onClick={handleReturn}>
          Return
        </button>
      </div>
    </div>
  );
};

export default HeroScreen;
