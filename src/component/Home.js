import React,{useEffect} from 'react'
import { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'
function Home() {
  const a = useContext(NoteContext)
  useEffect(() => {
    console.log(a.state)
    a.update()
    // eslint-disable-next-line
}, [])
  

  return (
    <div>{a.state.name} Home</div>
  )
}

export default Home