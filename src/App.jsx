import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Home from "./Pages/Home.jsx";
import About from "./Pages/About.jsx";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    if (currentPage === "home") {
      return <Home onShowAbout={() => setCurrentPage("about")} />;
    }
    if (currentPage === "about") {
      return <About onGoHome={() => setCurrentPage("home")} />;
    }
  };

  return (
    <div className="app">
      <header className="header">
        <span className="brand" onClick={() => setCurrentPage("home")}>
          <img src="/logo.svg" alt="POMODORO" />
        </span>
        <nav className="nav">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <span className="nav-link" onClick={() => setCurrentPage("home")}>
              Home
            </span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <span className="nav-link" onClick={() => setCurrentPage("about")}>
              About
            </span>
          </motion.div>
        </nav>
      </header>
      <main className="main">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="route-wrapper"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
