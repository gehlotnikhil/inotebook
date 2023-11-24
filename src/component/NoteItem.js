import React, { useContext ,useEffect} from 'react'
import NoteContext from '../context/notes/NoteContext';

function NoteItem(props) {
    const { notes,updateNote } = props;
    const context = useContext(NoteContext);
    const { deleteNote } = context
   

    return (
        <div className="col-md-3 my-2">
            <div className="card">
                <div className="card-body my-2">
                    <div className="d-flex  align-content-center ">
                        <h5 className="card-title mx-2">{notes.title}</h5>
                        <i style={{ fontSize: "20px", marginTop: "3px" }} onClick={() => { deleteNote(notes._id) }} className="fa fa-trash mx-2" aria-hidden="true"></i>
                        <span onClick={()=>{updateNote(notes)}} className='mx-2' style={{ fontSize: "20px", cursor: "pointer" }}>	 &#x1F589;</span>
                    </div>

                    <p className="card-text">{notes.description} </p>

                </div>
            </div>
        </div>
    )
}

export default NoteItem