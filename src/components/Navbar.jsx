import styles from "./navbar.module.css";
import { useEffect } from "react";
const NavBar = ({ activeSection, setActiveSection }) => {
  const handleChangeSection = (section) => {
    setActiveSection(section);
  };

  useEffect(() => {
    console.log(activeSection);
  }, [activeSection]);
  return (
    <div className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.listItem}>
          <a
            href=""
            className={styles.linkItem}
            onClick={(e) => {
              handleChangeSection("library");
              e.preventDefault();
            }}
          >
            Library
          </a>
        </li>
        <li className={styles.listItem}>
          <a
            href=""
            className={styles.linkItem}
            onClick={(e) => {
              e.preventDefault();
              handleChangeSection("wishlist");
            }}
          >
            Wishlist
          </a>
        </li>
        <li className={styles.listItem}>
          <a
            href=""
            className={styles.linkItem}
            onClick={(e) => {
              e.preventDefault();
              handleChangeSection("complete");
            }}
          >
            Complete
          </a>
        </li>
        <li className={styles.listItem}>
          <a
            href=""
            className={styles.linkItem}
            onClick={(e) => {
              e.preventDefault();
              handleChangeSection("reading");
            }}
          >
            Reading
          </a>
        </li>
      </ul>
    </div>
  );
};
export default NavBar;
