import { useContext } from "react"
import React from 'react'
import NoteContext from "../context/notes/NoteContext"
const About = (props)=> {
  const a = useContext(NoteContext)
  return (

    <div>Hello {a.state.name} </div>
  )
}

export default About