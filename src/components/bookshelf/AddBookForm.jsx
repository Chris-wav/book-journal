import { useState, useEffect, useRef } from "react";
import { searchBook } from "../javaScript/api";
import styles from "./css/addBookToShelf.module.css";
import DropdownForSearch from "./DropdownForSearch";

const AddBookForm = ({ setCurrentStep, setSearchResults, searchResults }) => {
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
  });
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!newBook.title && !newBook.author) {
      setSearchResults([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      async function fetchData() {
        const data = await searchBook(newBook);
        const items = data.items || [];
        console.log("API returned items:", items);
        setSearchResults(items);
      }
      fetchData();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [newBook]);

  const setAuthorSearch = (e) => {
    setNewBook((prev) => ({ ...prev, author: e.target.value.trim() }));
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setSearchResults([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.addBookModal}>
        <div className={styles.modalHeader}>
          <h2>Add a New Book</h2>
        </div>

        <div className={styles.modalBody}>
          <label>
            Title:
            <input
              type="text"
              placeholder="Enter book title"
              value={newBook.title}
              ref={inputRef}
              onChange={(e) =>
                setNewBook((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </label>
          {searchResults.length > 0 && (
            <DropdownForSearch
              ref={dropdownRef}
              searchResults={searchResults}
              setNewBook={setNewBook}
            />
          )}
          <label>
            Author:
            <input
              type="text"
              placeholder="Enter author name"
              value={newBook.author}
              onChange={setAuthorSearch}
            />
          </label>
        </div>

        <div className={styles.modalFooter}>
          <button
            className={styles.backButton}
            onClick={() => setCurrentStep((prev) => prev - 1)}
          >
            Back
          </button>
          <button
            className={styles.saveButton}
            onClick={() =>
              setCurrentStep((prevCurrentStep) => prevCurrentStep + 1)
            }
          >
            Show results
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBookForm;
