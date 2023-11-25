import './App.css';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Navbar from "./component/Navbar"
import Home from "./component/Home"
import About from "./component/About"
import NoteContext from './context/notes/NoteContext';
import Alert from './component/Alert';
import React, { useState } from "react"
import Login from './component/Login';
import Signup from './component/Signup';
function App() {
  const host = "http://localhost:5000"

  const initialNotes = []

  const [notes, setNotes] = useState(initialNotes)
  const [alert, setAlert] = useState(null);  

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }
  //Add Note
  const addNotes = async(title, description, tag) => {
     //API CALL
     const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-header": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VycyI6eyJpZCI6IjY1NWUyNWJiMDkzOTM1MzBiYmIxODY0NSJ9LCJpYXQiOjE3MDA2Njg4Nzd9.Visy37itYY9EAed2cbU4RZGelXs00XEoz2Yx7gtsrGc"
      },
      body: JSON.stringify({title:title,description:description,tag:tag}),
    });
    const json = await response.json();
    console.log("json--"+typeof json +"---")
    
    setNotes(notes.concat(json))
  }

  //Get Note
  const getNote = async() => {
     //API CALL
     const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-header": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VycyI6eyJpZCI6IjY1NWUyNWJiMDkzOTM1MzBiYmIxODY0NSJ9LCJpYXQiOjE3MDA2Njg4Nzd9.Visy37itYY9EAed2cbU4RZGelXs00XEoz2Yx7gtsrGc"
      },
    });
    const json = await response.json();
    console.log(typeof json,"json-",json)
    setNotes(json)
  }
  //Delete Note
  const deleteNote = async(id) => {
     //API CALL
     const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-header": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VycyI6eyJpZCI6IjY1NWUyNWJiMDkzOTM1MzBiYmIxODY0NSJ9LCJpYXQiOjE3MDA2Njg4Nzd9.Visy37itYY9EAed2cbU4RZGelXs00XEoz2Yx7gtsrGc"
      },
    });
    const json =await response.json();
    console.log("delete json - ",json)
    //Logic
    console.log("hi-" + id)
    const newNote = notes.filter((n) => { return id !== n._id })
    setNotes(newNote)
  }


  // Editing Note

  const editNote = async (id, title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-header": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VycyI6eyJpZCI6IjY1NWUyNWJiMDkzOTM1MzBiYmIxODY0NSJ9LCJpYXQiOjE3MDA2Njg4Nzd9.Visy37itYY9EAed2cbU4RZGelXs00XEoz2Yx7gtsrGc"
      },
      body: JSON.stringify({title,description,tag}),
    });
    const json = await response.json();
    console.log(json)

    //Logic
    console.log("Editing - ", id)
    let n = notes.filter((note) => {
      if (id === note._id) {
        note.title = title
        note.description = description
        note.tag = tag
      }
      return note
    })
    setNotes(n)
    console.log(n)
  }

  return (
    <>

      <NoteContext.Provider value={{ showAlert,notes, setNotes, getNote,addNotes, deleteNote, editNote }}>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <Routes>
            <Route  exact path="/" element={<Home />} />
            <Route  exact path="/about" element={<About />} />
            <Route  exact path="/login" element={<Login />} />
            <Route  exact path="/signup" element={<Signup />} />

          </Routes>

        </Router>
      </NoteContext.Provider>
    </>
  );

}
export default App;
