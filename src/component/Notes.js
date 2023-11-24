import React from 'react'
import { useContext, useRef, useState } from "react"
import NoteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem'
import AddNote from './AddNote'
function Notes() {
   const context = useContext(NoteContext)
   const { notes } = context
   const updateNote = (currentNote) => {
      console.log("clicked")
      ref.current.click()
      setNote(currentNote)
   }
   const [note, setNote] = useState({ title: "1", description: "2", tag: "default" })

   const ref = useRef(null)

   const handleClick = (element) => {
      element.preventDefault()
      

   }
   const onChanges = (e) => {
      setNote({ ...note, [e.target.name]: e.target.value })
      console.log(note)
   }
   return (
      <div>
         <AddNote />
         <div>
            <button type="button" ref={ref} className="d-none btn btn-primary" data-toggle="modal" data-target="#myModal">
               Open Modal
            </button>

            <div className="modal fade" id="myModal">
               <div className="modal-dialog">
                  <div className="modal-content">

                     <div className="modal-header">
                        <h4 className="modal-title">Edit Note</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                     </div>

                     <div className="modal-body">
                        <div className="container my-3">
                           <form>
                              <div className="mb-3">
                                 <label htmlFor="title" className="form-label">Title:</label>
                                 <input type="text" value = {note.title} className="form-control" name="title" id="title" onChange={onChanges} aria-describedby="emailHelp" />
                              </div>
                              <div className="mb-3">
                                 <label htmlFor="exampleInputPassword1" className="form-label">Description:</label>
                                 <input type="text" value={note.description} className="form-control" name="description" onChange={onChanges} id="exampleInputPassword1" />
                              </div>
                              <div className="mb-3">
                                 <label htmlFor="tag" className="form-label">Tag:</label>
                                 <input type="text" value={note.tag} className="form-control" name="tag" onChange={onChanges} id="tag" />
                              </div>
                           </form>
                        </div>
                     </div>

                     <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary" onClick={handleClick}> Update Now</button>

                     </div>

                  </div>
               </div>
            </div>
         </div>
         <div className="row my-3">
            <h2>Your Notes</h2>
            {
               notes.map((n) => {
                  return <NoteItem notes={n} key={n._id} updateNote={updateNote} />
               })
            }
         </div>
      </div>
   )
}

export default Notes