import React from "react";
import styles from "./header.module.css";

const Header = ({ searchInput, setSearchInput }) => {
  const getInputValue = (e) => {
    setSearchInput(e.target.value);
  };
  return (
    <div className={styles.headerContainer}>
      <h1 className={styles.title}>Book Journal</h1>
      <input
        className={styles.inputBox}
        type="text"
        value={searchInput}
        onChange={getInputValue}
        placeholder="Search a book"
      />
    </div>
  );
};

export default Header;
