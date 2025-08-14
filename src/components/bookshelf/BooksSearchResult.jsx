import { useState, useRef, useEffect } from "react";
import styles from "./css/bookSearchResults.module.css";
import BookModal from "./BookModal";

const BooksSearchResult = ({
  searchResults,
  setViewShelf,
  setCurrentStep,
  setShelfBooks,
}) => {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [ModalSelectedBook, setModalSelectedBook] = useState(null);
  const handleAddBook = (book) => {
    const storedBooks = JSON.parse(localStorage.getItem("shelfBooks")) || [];
    storedBooks.push(book);
    localStorage.setItem("shelfBooks", JSON.stringify(storedBooks));
    setShelfBooks(storedBooks);
  };

  const onClose = () => {
    setIsBookModalOpen(false);
    setModalSelectedBook(null);
  };

  if (!Array.isArray(searchResults)) {
    return <div>No results</div>;
  }

  const handleDetails = (book) => {
    setModalSelectedBook(book);
    setIsBookModalOpen(true);
  };

  return (
    <div className={styles.searchWrapper}>
      {searchResults.map((book, index) => {
        const volumeInfo = book.volumeInfo || {};
        const authors = Array.isArray(volumeInfo.authors)
          ? volumeInfo.authors.join(", ")
          : "Unknown author";
        const image = volumeInfo.imageLinks?.thumbnail || "";
        const title = volumeInfo.title || "No title";
        const publishedDate =
          volumeInfo.publishedDate || "Unknown publish date";

        return (
          <div key={index} className={styles.bookContainer}>
            <div className={styles.imageWrapper}>
              {image ? (
                <img src={image} alt={title} className={styles.bookImage} />
              ) : (
                <div className={styles.noImage}>No Image</div>
              )}
            </div>
            <div className={styles.details}>
              <h2 className={styles.title}>{title}</h2>
              <p className={styles.authors}>By: {authors}</p>
              <p className={styles.publishedDate}>
                Publish year: {publishedDate}
              </p>
              <button onClick={() => handleDetails(book)}>Details</button>
              <button onClick={() => handleAddBook(book)}>Add Book</button>
            </div>
          </div>
        );
      })}
      <button
        className={styles.backBtn}
        onClick={() => {
          setViewShelf(true);
          setCurrentStep(1);
        }}
      >
        Back
      </button>

      {isBookModalOpen && ModalSelectedBook && (
        <BookModal
          title={ModalSelectedBook.volumeInfo?.title || "No title"}
          description={
            ModalSelectedBook.volumeInfo?.description || "No description"
          }
          image={ModalSelectedBook.volumeInfo?.imageLinks?.thumbnail || ""}
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default BooksSearchResult;
