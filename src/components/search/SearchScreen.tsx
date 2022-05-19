import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import getHeroesByName from "../../helpers/utils/getHeroesByName";
import { useForm } from "../../hooks/useForm/useForm";
import Hero from "../../interfaces/Hero";
import HeroCard from "../hero/HeroCard";

const SearchScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { q = "" } = queryString.parse(location.search);
  const [{ searchText }, handleInputChange] = useForm({
    searchText: q,
  });

  const heroes: Hero[] = useMemo(() => getHeroesByName(q as string), [q]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    navigate(`?q=${searchText}`);
  };

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
          <h4>Resultados</h4>

          <hr />

          {q === "" ? (
            <div className="alert alert-info">Buscar un héroe</div>
          ) : (
            !heroes.length && <div className="alert alert-info">No hay coincidencias para &quot;{q}&quot;</div>
          )}

          {heroes?.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchScreen;
