import React from "react";
import { Link } from "react-router-dom";
import Hero from "../../interfaces/Hero";

const HeroCard = ({ id, superhero, alter_ego, characters }: Hero) => {
  const imagePath = `${process.env.PUBLIC_URL}/assets/images/heroes/${id}.jpg`;

  return (
    <div className="col animate__animated animate__fadeIn">
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
