import styles from "./css/Shelf.module.css";

const BookShelfManager = ({
  shelves,
  setShelves,
  setViewShelf,
  shelfBooks,
}) => {
  const handleRemovClick = (id) => {
    setShelves((prev) => prev.filter((shelf) => shelf.id !== id));
  };

  function getRandomColor() {
    const r = Math.floor(Math.random() * 127 + 127); // 127-254
    const g = Math.floor(Math.random() * 127 + 127);
    const b = Math.floor(Math.random() * 127 + 127);
    return `rgb(${r}, ${g}, ${b})`;
  }

  return (
    <>
      <h1>Shelves</h1>
      <div className={styles.shelfList}>
        {shelves.map((shelf) => {
          const backgroundColor = getRandomColor();

          return (
            <div
              key={shelf.id}
              className={styles.shelfRow}
              style={{ backgroundColor }}
            >
              <div className={styles.cardHeader}>
                <h3 className={styles.shelfTitle}>{shelf.title}</h3>
                <button
                  className={styles.removeBtn}
                  onClick={() => handleRemovClick(shelf.id)}
                >
                  Remove
                </button>
              </div>

              <p className={styles.shelfGenre}>{shelf.genre}</p>

              <div className={styles.cardContent}>
                <p>Books: {shelfBooks.length || 0}</p>
                <p>Created at: 20-03-2000</p>
                <button
                  className={styles.viewButton}
                  onClick={() => setViewShelf(true)}
                >
                  View Shelf
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BookShelfManager;
