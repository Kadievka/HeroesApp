import React, { useState } from "react";
import getHeroesByName from "../../helpers/utils/getHeroesByName";
import { useForm } from "../../hooks/useForm/useForm";
import Hero from "../../interfaces/Hero";
import HeroCard from "../hero/HeroCard";

const SearchScreen = () => {
  const [{ searchText }, handleInputChange, resetForm] = useForm({
    searchText: "",
  });

  const [heroes, setHeroes] = useState<Hero[]>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchText) {
      setHeroes([...getHeroesByName(searchText)]);
    }

    resetForm();
  };

  console.log(heroes);

  return (
    <>
      <h1>Búsquedas</h1>

      <div className="row">
        <div className="col-5">
          <h4>Buscar</h4>
          <hr />

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Buscar un héroe"
              className="form-control"
              name="searchText"
              autoComplete="off"
              onChange={handleInputChange}
              value={searchText}
            />
            <button type="submit" className="btn btn-outline-primary mt-1">
              Buscar...
            </button>
          </form>
        </div>

        <div className="col-7">
          <h4>Encontrados</h4>
          <hr />

          {heroes?.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchScreen;
