import styles from "./css/DropdownForSearch.module.css";

const DropdownForSearch = ({ searchResults, setNewBook,  }) => {
  const onSelectBookFromDropdown = (book) => {
    const selectedBook = {
      title: book.volumeInfo?.title || "",
      author: (book.volumeInfo?.authors && book.volumeInfo.authors[0]) || "",
    };
    setNewBook(selectedBook);
  };

  return (
    <div className={styles.dropdownContainer}>
      <ul className={styles.dropdownList}>
        {searchResults.map((book, index) => (
          <li
            key={index}
            className={styles.dropdownItem}
            onClick={() => onSelectBookFromDropdown(book)}
          >
            {book.volumeInfo?.title || "No title"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownForSearch;
