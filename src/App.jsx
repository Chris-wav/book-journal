import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import "./App.css";
import NavBar from "./components/Navbar.jsx";
import LibraryHome from "./components/LibraryHome.jsx";

function App() {
  const [libraryBooks, setLibraryBooks] = useState(() => {
    try {
      const data = localStorage.getItem("libraryBooks");
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error parsing libraryBooks from localStorage:", error);
      return [];
    }
  });

  const [searchInput, setSearchInput] = useState("");
  const [activeSection, setActiveSection] = useState("library");

  useEffect(() => {
    localStorage.setItem("libraryBooks", JSON.stringify(libraryBooks));
    console.log(libraryBooks);
  }, [libraryBooks]);

  return (
    <div className="appContainer">
      <Header searchInput={searchInput} setSearchInput={setSearchInput} />
      <div className="wrapper">
        <NavBar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <LibraryHome />
      </div>
    </div>
  );
}

export default App;
