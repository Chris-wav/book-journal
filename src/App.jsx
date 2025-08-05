import { useState } from "react";
import Header from "./components/Header.jsx";
import "./App.css";
import NavBar from "./components/Navbar.jsx";
import Library from "./components/Library.jsx";

function App() {
  const [libraryBooks, setLibraryBooks] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [activeSection, setActiveSection] = useState("library");

  return (
    <div className="appContainer">
      <Header searchInput={searchInput} setSearchInput={setSearchInput} />
      <div className="wrapper">
        <NavBar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <Library
          activeSection={activeSection}
          libraryBooks={libraryBooks}
          setLibraryBooks={setLibraryBooks}
        />
      </div>
    </div>
  );
}

export default App;
