import styles from "./css/bookModal.module.css";

const Modal = ({ title, description, image, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          &times;
        </button>

        {image && <img src={image} alt={title} className={styles.image} />}

        <h2 className={styles.title}>{title}</h2>

        <div className={styles.description}>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
