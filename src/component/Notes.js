import React from 'react'
import {useContext} from "react"
import NoteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem'
import AddNote from './AddNote'
function Notes() {
    const context = useContext(NoteContext)
    const {notes} = context
  return (
  <div>
    <AddNote/>
    <div className="row my-3">
        <h2>Your Notes</h2>
    {
      notes.map((n)=>{
        return  <NoteItem notes = {n} key = {n._id} />
      })
      }
  </div>
  </div>
  )
}

export default Notes