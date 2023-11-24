import React from 'react'
import {useContext} from "react"
import NoteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem'

function Notes() {
    const context = useContext(NoteContext)
    const {notes,setNotes} = context
  return (
    <div className="row my-3">
        <h2>Your Notes</h2>
    {
      notes.map((n)=>{
        return  <NoteItem notes = {n} key = {n._id} />
      })
      }
  </div>
  )
}

export default Notes