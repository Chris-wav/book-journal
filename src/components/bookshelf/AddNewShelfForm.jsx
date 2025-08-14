import { useState, useEffect } from "react";
import styles from "./css/shelfCreate.module.css";

const AddNewShelfForm = ({
  isShelfCreationOpen,
  setIsShelfCreationOpen,
  shelves,
  setShelves,
}) => {
  const bookGenres = [
    "Fiction",
    "Fantasy",
    "Science Fiction",
    "Mystery / Thriller",
    "Romance",
    "Historical Fiction",
    "Non-Fiction",
    "Biography / Memoir",
    "Self-Help",
    "History",
    "Science",
    "Philosophy",
    "Children's Books",
    "Picture Books",
    "Young Adult",
    "Poetry",
    "Comics / Graphic Novels",
    "Classics",
    "Travel",
    "Cooking",
  ];
  if (!isShelfCreationOpen) return null;

  const [titleInput, setTitleInput] = useState("");
  const [genre, setGenre] = useState("");

  useEffect(() => {
    console.log(shelves);
  }, [shelves]);

  const handleInputChange = (e) => {
    setTitleInput(e.target.value);
  };

  const handleOptionSelect = (e) => {
    setGenre(e.target.value);
  };

  const handleAddClick = () => {
    if (!titleInput || !genre) return;
    const newShelf = {
      title: titleInput,
      genre: genre,
    };
    const storedShelves = JSON.parse(localStorage.getItem("shelves")) || [];
    storedShelves.push(newShelf);
    localStorage.setItem("shelves", JSON.stringify(storedShelves));
    setShelves(storedShelves);

    setTitleInput("");
    setGenre("");
  };

  return (
    <div className={styles.shelfContainer}>
      <label htmlFor="title" className={styles.shelfLabel}>
        Title
      </label>
      <input
        type="text"
        name="title"
        placeholder="title"
        className={styles.shelfInput}
        value={titleInput}
        onChange={handleInputChange}
      />

      <label htmlFor="genre" className={styles.shelfLabel}>
        Select genre for your shelf
      </label>
      <select
        id="genre"
        name="genre"
        className={styles.shelfSelect}
        value={genre}
        onChange={handleOptionSelect}
      >
        <option value="">Select a genre</option>
        {bookGenres.map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      <div className={styles.buttonWrapper}>
        <button className={styles.shelfButton} onClick={handleAddClick}>
          Create
        </button>
        <button
          className={styles.shelfButton}
          onClick={() => setIsShelfCreationOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddNewShelfForm;
