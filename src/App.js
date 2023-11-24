import './App.css';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Navbar from "./component/Navbar"
import Home from "./component/Home"
import About from "./component/About"
import NoteContext from './context/notes/NoteContext';
import Alert from './component/Alert';
import React, { useState } from "react"
function App() {
  const host = "http://localhost:5000"

  const initialNotes = []

  const [notes, setNotes] = useState(initialNotes)


  //Add Note
  // const addNotes = async(title, description, tag) => {
  //    //API CALL
  //    const response = await fetch(`${host}/api/notes/addnote`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "auth-header": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VycyI6eyJpZCI6IjY1NWUyNWJiMDkzOTM1MzBiYmIxODY0NSJ9LCJpYXQiOjE3MDA2Njg4Nzd9.Visy37itYY9EAed2cbU4RZGelXs00XEoz2Yx7gtsrGc"
  //     },
  //     body: JSON.stringify({title:title,description:description,tag:tag}),
  //   });
  //   const json = await response.json();
  //   console.log("json"+json)
  //   //Logic
  //   const note = {
  //     _id: "605601e0888261702c79c597858109",
  //     user: "655e25bb09393530bbb18645",
  //     title: title,
  //     description: description,
  //     tag: tag,
  //     date: "2023-11-24T03:54:42.702Z",
  //     __v: 0
  //   }
  //   setNotes(notes.concat(note))
  // }

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
    console.log("json"+json)
    setNotes(json)
  }
  //Delete Note
  const deleteNote = async(id) => {
     //API CALL
     const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-header": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VycyI6eyJpZCI6IjY1NWUyNWJiMDkzOTM1MzBiYmIxODY0NSJ9LCJpYXQiOjE3MDA2Njg4Nzd9.Visy37itYY9EAed2cbU4RZGelXs00XEoz2Yx7gtsrGc"
      },
    });
    const json =response.json();
    console.log(json)
    //Logic
    console.log("hi-" + id)
    const newNote = notes.filter((n) => { return id != n._id })
    setNotes(newNote)
  }


  // Editing Note

  const editNote = async (id, title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-header": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VycyI6eyJpZCI6IjY1NWUyNWJiMDkzOTM1MzBiYmIxODY0NSJ9LCJpYXQiOjE3MDA2Njg4Nzd9.Visy37itYY9EAed2cbU4RZGelXs00XEoz2Yx7gtsrGc"
      },
      body: JSON.stringify({title,description,tag}),
    });
    const json =response.json();
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

      <NoteContext.Provider value={{ notes, setNotes, getNote, deleteNote, editNote }}>
        <Router>
          <Navbar />
          <Alert message="This is my Project" />
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
