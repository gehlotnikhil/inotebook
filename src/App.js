import './App.css';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Navbar from "./component/Navbar"
import Home from "./component/Home"
import About from "./component/About"
import NoteContext from './context/notes/NoteContext';
import Alert from './component/Alert';
import React, { useState } from "react"
function App() {

  const initialNotes = [
    {
      _id: "655ec860fb2d0c5bb0215548778",
    user: "655e25bb09393530bbb18645",
    title: "MySQL",
    description: "This is my MySql Note",
    tag: "Web",
    date: "2023-11-23T03:25:03.023Z",
    __v: 0
},
    {
      _id: "655ec682cb2d0c5bb02155487869",
    user: "655e25bb09393530bbb18645",
    title: "MySQL",
    description: "This is my MySql Note",
    tag: "Web",
    date: "2023-11-23T03:25:32.152Z",
    __v: 0
},
    {
    _id: "65601e8261702c789c597858108",
    user: "655e25bb09393530bbb18645",
    title: "MongoDB",
    description: "This is my MongoDB Note",
    tag: "Web",
    date: "2023-11-24T03:54:42.702Z",
    __v: 0

},
    {
    _id: "658601e8261702c79c59765858108",
    user: "655e25bb09393530bbb18645",
    title: "MongoDB",
    description: "This is my MongoDB Note",
    tag: "Web",
    date: "2023-11-24T03:54:42.702Z",
    __v: 0

},
    {
    _id: "658601e8261702c79c597858108",
    user: "655e25bb09393530bbb18645",
    title: "MongoDB",
    description: "This is my MongoDB Note",
    tag: "Web",
    date: "2023-11-24T03:54:42.702Z",
    __v: 0

},
    {
    _id: "65601e88261702c079c597858108",
    user: "655e25bb09393530bbb18645",
    title: "MongoDB",
    description: "This is my MongoDB Note",
    tag: "Web",
    date: "2023-11-24T03:54:42.702Z",
    __v: 0
},
    {
    _id: "605601e88261702c79c597858108",
    user: "655e25bb09393530bbb18645",
    title: "MongoDB",
    description: "This is my MongoDB Note",
    tag: "Web",
    date: "2023-11-24T03:54:42.702Z",
    __v: 0
},
    {
    _id: "65601e088261702c79c597858108",
    user: "655e25bb09393530bbb18645",
    title: "MongoDB",
    description: "This is my MongoDB Note",
    tag: "Web",
    date: "2023-11-24T03:54:42.702Z",
    __v: 0
},
    {
    _id: "605601e088261702c79c597858108",
    user: "655e25bb09393530bbb18645",
    title: "MongoDB",
    description: "This is my MongoDB Note",
    tag: "Web",
    date: "2023-11-24T03:54:42.702Z",
    __v: 0
}
    ]

    const  [notes, setNotes] = useState(initialNotes)
   //Add Note
    const addNotes = (_title,_description,_tag)=>{
      const note = {
        _id: "605601e088261702c79c597858109",
        user: "655e25bb09393530bbb18645",
        title: _title,
        description: _description,
        tag: _tag,
        date: "2023-11-24T03:54:42.702Z",
        __v: 0
    }
    setNotes(notes.concat(note))
    }
    //Delete Note
    const deleteNote = (id)=>{
      console.log("hi-"+id)
      const newNote = notes.filter((n)=>{return id != n._id})
      setNotes(newNote)
    }

  return (
    <>
      
      <NoteContext.Provider value={{notes,setNotes,addNotes,deleteNote}}>
        <Router>
          <Navbar />
          <Alert message="This is my Project"/>
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
