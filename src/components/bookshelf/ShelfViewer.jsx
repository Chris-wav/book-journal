import styles from "./css/viewShelf.module.css";
import AddBookForm from "./AddBookForm";
import BooksSearchResult from "./BooksSearchResult";
import Lottie from "lottie-react";
import noBooksAnimation from "../../animations/no-books.json";

const ShelfViewer = ({
  currentStep,
  shelfBooks,
  setShelfBooks,
  setCurrentStep,
  setSearchResults,
  searchResults,
  setViewShelf,
}) => {
  console.log("ShelfViewer rendered with currentStep:", currentStep);

  switch (currentStep) {
    case 1:
      if (shelfBooks.length === 0) {
        return (
          <div className="emptyShelfContainer">
            <div className={styles.emptyShelf}>
              <Lottie
                animationData={noBooksAnimation}
                loop={true}
                className={styles.lottieAnimation}
              />
              <p>No books in this shelf yet.</p>
              <div className={styles.shelfButtons}>
                <button
                  className={styles.noteButton}
                  onClick={() => setCurrentStep(2)}
                >
                  Add Book
                </button>
                <button
                  className={styles.removeButton}
                  onClick={() => setViewShelf(false)}
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        );
      }
      return (
        <>
          {shelfBooks.map((book) => {
            const info = book.volumeInfo;
            return (
              <div key={book.id} className={styles.book}>
                <div className={styles.bookInfo}>
                  <img
                    src={
                      info.imageLinks?.thumbnail ||
                      "https://via.placeholder.com/80x120"
                    }
                    alt={info.title || "Book Cover"}
                    className={styles.bookImage}
                  />
                  <div className={styles.bookDetails}>
                    <h3 className={styles.bookTitle}>
                      {info.title || "No Title"}
                    </h3>
                    <p className={styles.bookAuthor}>
                      by{" "}
                      {info.authors
                        ? info.authors.join(", ")
                        : "Unknown Author"}
                    </p>
                    <p className={styles.bookPages}>
                      {info.pageCount
                        ? `${info.pageCount} pages`
                        : "Page count N/A"}
                    </p>
                  </div>
                </div>
                <div className={styles.bookButtons}>
                  <button className={styles.noteButton}>View Notes</button>
                  <button className={styles.removeButton}>Remove</button>
                </div>
              </div>
            );
          })}
        </>
      );

    case 2:
      return (
        <AddBookForm
          setCurrentStep={setCurrentStep}
          setSearchResults={setSearchResults}
          searchResults={searchResults}
        />
      );

    case 3:
      return (
        <BooksSearchResult
          searchResults={searchResults}
          setViewShelf={setViewShelf}
          setCurrentStep={setCurrentStep}
          setShelfBooks={setShelfBooks}
        />
      );

    default:
      return null;
  }
};

export default ShelfViewer;
