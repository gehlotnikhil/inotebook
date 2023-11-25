import React,{useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import NoteContext from '../context/notes/NoteContext'
function Signup() {
  const [credential, setCredential] = useState({name:"", email: "", password: "",cpassword:"" })
  const host = "http://localhost:5000"
  const context = useContext(NoteContext)
  const {showAlert} = context
  const navigate = useNavigate()
  const onChanges = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value })
    console.log(credential)
  }

  const handleClick = async (element) => {
    element.preventDefault()
    console.log("1")
    console.log(credential)
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name:credential.name, email: credential.email, password: credential.password })
    });

    const json = await response.json();
    console.log("hello",json)
    if (json.success) {
      //save the token and redirect
      localStorage.setItem("token", json.authToken)
      navigate("/")
      showAlert("Account Created Successfully","success")
    }
    else
    showAlert("Failed to Created Account","danger")
  }


  return (
    <div className='container'>
      <form onSubmit={handleClick}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input onChange={onChanges} name="name" type="text" className="form-control" id="name" aria-describedby="emailHelp" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input onChange={onChanges} name="email" type="email" className="form-control" id="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input onChange={onChanges} name="password" type="password" className="form-control" id="password" />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password:</label>
          <input onChange={onChanges} name="cpassword" type="password" className="form-control" id="cpassword" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    </div>
  )
}

export default Signup