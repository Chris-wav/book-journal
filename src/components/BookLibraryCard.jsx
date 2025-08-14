import { useState } from "react";
import styles from "./bookLibraryCard.module.css";
import NotesModal from "./notesModal";

const BookLibraryCard = ({ libraryBooks, setLibraryBooks }) => {
  const [activeNoteBook, setActiveNoteBook] = useState(null);
  const [notesAreOpen, setNotesAreOpen] = useState(false);

  const handleRemoveClick = (index) => {
    setLibraryBooks((prevBooks) => prevBooks.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.libraryContainer}>
      {libraryBooks.map((book, index) => (
        <div key={index} className={styles.bookCard}>
          <img
            src={book.volumeInfo.imageLinks?.thumbnail}
            alt={book.volumeInfo.title}
            className={styles.bookCover}
          />
          <div className={styles.bookInfo}>
            <h3 className={styles.bookTitle}>{book.volumeInfo.title}</h3>
            <p className={styles.bookAuthor}>
              {book.volumeInfo.authors?.join(", ")}
            </p>
            <p className={styles.bookDescription}>
              {book.volumeInfo.description}
            </p>

            <div className={styles.buttonContainer}>
              <button
                className={styles.removeBtn}
                onClick={() => handleRemoveClick(index)}
              >
                Remove
              </button>

              <button
                className={styles.notesBtn}
                onClick={() => {
                  setActiveNoteBook(book);
                  setNotesAreOpen(true);
                }}
              >
                Add Notes
              </button>
            </div>
          </div>
        </div>
      ))}

      {activeNoteBook && notesAreOpen && (
        <NotesModal
          selectedBook={activeNoteBook}
          onClose={() => {
            setNotesAreOpen(false);
            setActiveNoteBook(null);
          }}
        />
      )}
    </div>
  );
};

export default BookLibraryCard;
