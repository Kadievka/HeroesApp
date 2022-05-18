import React from "react";
import { Link } from "react-router-dom";
import Hero from "../../interfaces/Heroe";

const HeroCard = ({ id, superhero, publisher, alter_ego, first_appearance, characters }: Hero) => {
  const imagePath = `${process.env.PUBLIC_URL}/assets/images/heroes/${id}.jpg`;

  return (
    <div className="col">
      <div className="card">
        <div className="row no-gutters">
          <div className="col-4">
            <img src={imagePath} className="card-img" alt={superhero} />
          </div>
          <div className="col-8">
            <div className="card-body">
              <h5 className="card-title">{superhero}</h5>
              <p className="card-text">{alter_ego}</p>

              {alter_ego !== characters && <p className="text-muted">{characters}</p>}

              <Link to={`/hero/${id}`}>Más...</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;