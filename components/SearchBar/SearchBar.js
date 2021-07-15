import { useState } from "react";
import styles from "./searchbar.module.css";

const SearchBar = (props) => {
  const [searchQuery, setSearchQuery] = useState("");

  const changeHandler = (e) => {
    setSearchQuery(e.target.value);
    props.addSearchQuery(e.target.value);
  };

  return (
    <div className={styles.searchBar}>
      <label htmlFor="searchbar">
        <h2>Search blog you want to read</h2>
        <div className="search_button">
          <input
            type="search"
            id="searchbar"
            placeholder="search by title"
            onChange={changeHandler}
          />
          <button type="submit" onSubmit={changeHandler} className={styles.btn}>
            Search
          </button>
        </div>
      </label>
    </div>
  );
};

export default SearchBar;
