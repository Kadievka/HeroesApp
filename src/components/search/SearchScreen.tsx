import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import getHeroesByName from "../../helpers/utils/getHeroesByName";
import Hero from "../../interfaces/components/Hero";
import HeroCard from "../hero/HeroCard";
import { useForm } from "../../hooks/useForm";

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
    <div data-testid="search-screen-container">
      <h1>Búsquedas</h1>

      <div className="row">
        <div className="col-5">
          <h4 data-testid="search-screen-title">Buscar</h4>
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
              data-testid="search-screen-input"
            />
            <button type="submit" className="btn btn-outline-primary mt-1" data-testid="search-screen-button">
              Buscar...
            </button>
          </form>
        </div>

        <div className="col-7">
          <h4 data-testid="search-screen-results">Resultados</h4>

          <hr />

          {q === "" ? (
            <div className="alert alert-info" data-testid="search-screen-alert">
              Buscar un héroe
            </div>
          ) : (
            !heroes.length && (
              <div className="alert alert-info" data-testid="search-screen-alert-not-found">
                No hay coincidencias para &quot;{q}&quot;
              </div>
            )
          )}

          {heroes?.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchScreen;
