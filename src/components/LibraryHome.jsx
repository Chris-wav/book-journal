import { useEffect, useState } from "react";
import AddNewShelfForm from "./bookshelf/AddNewShelfForm";
import BookShelfManager from "./bookshelf/BookShelfManager";
import styles from "./libraryHome.module.css";
import ShelfViewer from "./bookshelf/ShelfViewer";
import Lottie from "lottie-react";
import emptyShelfAnimation from "../animations/empty-shelf.json";

const LibraryHome = () => {
  const [shelves, setShelves] = useState(() => {
    const shelvesFromLocal = localStorage.getItem("shelves");
    return shelvesFromLocal ? JSON.parse(shelvesFromLocal) : [];
  });
  const [shelfCreationIsOpen, setShelfCreationIsOpen] = useState(false);
  const [viewShelf, setViewShelf] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [shelfBooks, setShelfBooks] = useState(() => {
    const shelfBooksFromLocal = localStorage.getItem("shelfBooks");
    return shelfBooksFromLocal ? JSON.parse(shelfBooksFromLocal) : [];
  });
  const [searchResults, setSearchResults] = useState([]);
  const [isViewingSearchResults, setIsViewingSearchResults] = useState(false);

  useEffect(() => {
    localStorage.setItem("shelves", JSON.stringify(shelves));
  }, [shelves]);

  useEffect(() => {
    localStorage.setItem("shelfBooks", JSON.stringify(shelfBooks));
  }, [shelfBooks]);

  return (
    <>
      {!viewShelf ? (
        <div className={styles.homeWrapper}>
          {shelves.length === 0 ? (
            <div className={styles.emptyShelves}>
              <Lottie
                className={styles.lottieAnimation}
                animationData={emptyShelfAnimation}
                loop={true}
              />
              <p>No shelves yet. Create one to get started!</p>
              <button
                className={styles.createShelfButton}
                onClick={() => setShelfCreationIsOpen(true)}
              >
                Create Shelf
              </button>
            </div>
          ) : (
            <>
              <BookShelfManager
                shelves={shelves}
                setShelves={setShelves}
                setViewShelf={setViewShelf}
                shelfBooks={shelfBooks}
              />
              <button
                className={styles.createShelfButton}
                onClick={() => setShelfCreationIsOpen(true)}
              >
                Create Shelf
              </button>
            </>
          )}
        </div>
      ) : (
        <div className={styles.shelfWrapper}>
          <ShelfViewer
            currentStep={currentStep}
            shelfBooks={shelfBooks}
            setCurrentStep={setCurrentStep}
            setSearchResults={setSearchResults}
            searchResults={searchResults}
            setIsViewingSearchResults={setIsViewingSearchResults}
            setViewShelf={setViewShelf}
            setShelfBooks={setShelfBooks}
            shelves={shelves}
          />

          {currentStep === 1 && !isViewingSearchResults && (
            <div className={styles.buttonsContainer}>
              <button
                className={styles.backBtn}
                onClick={() => {
                  setViewShelf(false);
                  setCurrentStep(1);
                  setIsViewingSearchResults(false);
                }}
              >
                Back
              </button>
              <button
                className={styles.addBtn}
                onClick={() => setCurrentStep(2)}
              >
                Add
              </button>
            </div>
          )}
        </div>
      )}

      {shelfCreationIsOpen && (
        <>
          <div
            className={styles.modalBackdrop}
            onClick={() => setShelfCreationIsOpen(false)}
          />
          <AddNewShelfForm
            isShelfCreationOpen={shelfCreationIsOpen}
            setIsShelfCreationOpen={setShelfCreationIsOpen}
            shelves={shelves}
            setShelves={setShelves}
          />
        </>
      )}
    </>
  );
};

export default LibraryHome;
