import './App.css';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Navbar from "./component/Navbar"
import Home from "./component/Home"
import About from "./component/About"
import NoteContext from './context/notes/NoteContext';
import React, { useState } from "react"
function App() {


return (
  <>
    <NoteContext.Provider value={{ state: "state", update: "update" }}>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />

        </Routes>

      </Router>
    </NoteContext.Provider>
  </>
);

}
export default App;
