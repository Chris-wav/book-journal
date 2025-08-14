import { useState, useEffect } from "react";
import styles from "./notesModal.module.css";

const NotesModal = ({ selectedBook, onClose }) => {
  const [noteInput, setNoteInput] = useState("");
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleSaveClick = () => {
    if (noteInput.trim() === "") return;
    setNotes((prevNotes) => [...prevNotes, noteInput.trim()]);
    setNoteInput("");
  };

  return (
    <div className={styles.notesModalOverlay} onClick={onClose}>
      <div
        className={styles.notesModal}
        onClick={(e) => e.stopPropagation()} // για να μην κλείνει αν κλικάρεις μέσα
      >
        <button className={styles.notesModalCloseButton} onClick={onClose}>
          ×
        </button>

        <div className={styles.notesModalContent}>
          <img
            src={selectedBook.volumeInfo.imageLinks?.thumbnail}
            alt="Book cover"
            className={styles.notesModalCover}
          />

          <h2 className={styles.notesModalTitle}>
            {selectedBook.volumeInfo.title}
          </h2>
          <p className={styles.notesModalAuthor}>
            {selectedBook.volumeInfo.authors?.join(", ")}
          </p>

          <textarea
            className={styles.notesModalTextarea}
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            placeholder="Write your notes here..."
          />

          <button
            className={styles.notesModalSaveButton}
            onClick={handleSaveClick}
          >
            Save
          </button>

          <ul className={styles.listContainer}>
            {notes.map((note, index) => (
              <li className={styles.listEl} key={index}>
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotesModal;
