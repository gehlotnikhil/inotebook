import React, { useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
import { useContext, useEffect } from "react"

function AddNote() {
  const context = useContext(NoteContext)

  const [note, setNote] = useState({ title: "", description: "", tag: "" })
  const { getNote } = context
  useEffect(() => {

    getNote()
    // eslint-disable-next-line
  }, [])


  const handleClick = (element) => {
    element.preventDefault()
    context.addNotes(note.title, note.description, note.tag)
    console.log(context.notes)
    context.showAlert("Note Added Successfully","success")
    setNote({ title: "", description: "", tag: "" })
  }
  const onChanges = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
    console.log(note)
  }
  return (
    <div>
      <div className="container my-3 ">
        <h2>Add a Notes</h2>
        <div className="container my-3">
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title:</label>
              <input type="text" value={note.title} className="form-control" name="title" id="title" onChange={onChanges} aria-describedby="emailHelp" required />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Description:</label>
              <input type="text" value={note.description} className="form-control" name="description" onChange={onChanges} id="exampleInputPassword1" required />
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">Tag:</label>
              <input type="text" value={note.tag} className="form-control" name="tag" onChange={onChanges} id="tag" />
            </div>
            <button type="submit" disabled={(note.title.length > 5 && note.description.length > 5) ? false : true} className="btn btn-primary" onClick={handleClick}>Add Note</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddNote