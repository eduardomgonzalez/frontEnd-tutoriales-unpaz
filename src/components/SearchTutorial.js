import React from "react";
import "./styles/SearchTutorial.scss";
import { Search } from "@material-ui/icons";

const SearchTutorial = ({ search, handleChangeSearch2 }) => {
  return (
    <div className="search">
      <div className="search-content">
        <Search color="primary" fontSize="large" className="search-icon" />
        <input
          type="text"
          placeholder="Buscar..."
          name="search"
          value={search}
          onChange={handleChangeSearch2}
        />
      </div>
    </div>
  );
};

export default SearchTutorial;
