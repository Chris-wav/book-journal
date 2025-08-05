import { useEffect, useState } from "react";
import { searchBook } from "./javaScript/api";
import styles from "./addBookModal.module.css";

const AddBookModal = ({
  libraryBooks,
  setLibraryBooks,
  setIsAddButtonPressed,
}) => {
  const [showNotFound, setShowNotFound] = useState(false);
  const [searchAddBookInput, setSearchAddBookInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const renderNotFound = () => {
    setTimeout(() => {
      return <p>No books Found</p>;
    }, 600);
  };
  const handleAddClick = () => {
    setLibraryBooks((prevLibraryBooks) => [
      ...prevLibraryBooks,
      searchAddBookInput,
    ]);
  };

  const getSearchAddBookInput = (e) => {
    setSearchAddBookInput(e.target.value);
  };

  useEffect(() => {
    if (!searchAddBookInput.trim()) {
      setSearchResults([]);
      setShowNotFound(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const data = await searchBook(searchAddBookInput);
        setSearchResults(data.items || []);
        setShowNotFound(!data.items || data.items.length === 0);
      } catch {
        setSearchResults([]);
        setShowNotFound(true);
      }
    }, 600);

    return () => clearTimeout(timeoutId);
  }, [searchAddBookInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchAddBookInput.trim()) return;
    setLibraryBooks((prevLibraryBooks) => [
      ...prevLibraryBooks,
      searchAddBookInput,
    ]);
    setSearchAddBookInput("");
  };
  useEffect(() => {
    console.log(libraryBooks);
  });

  const handleCancelBtn = () => {
    setIsAddButtonPressed(false);
    setSearchAddBookInput("");
    setSearchResults([]);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.title}>Add a book</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Emter the title"
            value={searchAddBookInput}
            onChange={getSearchAddBookInput}
            className={styles.input}
          />
          {searchAddBookInput.trim() && (
            <>
              {searchResults.length > 0 ? (
                <ul className={styles.dropdownList}>
                  {searchResults.map((book) => (
                    <li key={book.id} className={styles.dropdownItem}>
                      {book.volumeInfo.title}
                    </li>
                  ))}
                </ul>
              ) : (
                showNotFound && <p>No books found</p>
              )}
            </>
          )}

          <div className="buttons">
            <button
              onClick={handleAddClick}
              type="button"
              className={styles.saveΒtn}
            >
              Add
            </button>
            <button
              type="button"
              className={styles.cancelΒtn}
              onClick={handleCancelBtn}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;
