import { useState } from "react";
import AddBookModal from "./AddBookModal ";
import styles from "./library.module.css";
const Library = ({ activeSection, libraryBooks, setLibraryBooks }) => {
  const [isAddButtonPressed, setIsAddButtonPressed] = useState(false);
  const renderModularForm = () => {
    return isAddButtonPressed ? (
      <AddBookModal
        libraryBooks={libraryBooks}
        setLibraryBooks={setLibraryBooks}
        setIsAddButtonPressed={setIsAddButtonPressed}
      />
    ) : null;
  };
  return (
    <div className={styles.libraryWrapper}>
      <h3 className={styles.title}>Library</h3>
      <button
        onClick={() => {
          setIsAddButtonPressed(!isAddButtonPressed);
        }}
        className={styles.addBtn}
      >
        Add a book
      </button>
      {renderModularForm()}
      <div className="booksToRender"></div>
    </div>
  );
};

export default Library;
