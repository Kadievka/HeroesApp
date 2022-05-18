import React from "react";
import { useForm } from "../../hooks/useForm/useForm";

const SearchScreen = () => {
  const initialState = {
    searchText: "",
  };

  const [{ searchText }, handleInputChange, resetFormValues] = useForm(initialState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchText) {
      console.log("buscando...", searchText);
    }

    resetFormValues();
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
      </div>
    </>
  );
};

export default SearchScreen;
