import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
function Login() {
    const [credential, setCredential] = useState({ email: "", password: "" })
    const host = "http://localhost:5000"
    const navigate = useNavigate()
    const onChanges = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
        console.log(credential)
    }

    const handleClick = async (element) => {
        element.preventDefault()
        console.log("1")
        console.log(credential)
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        });

        const json = await response.json();
        console.log("json--", json, "---")
        if (json.success){
            //save the token and redirect
            localStorage.setItem("token",json.authToken)
            navigate("/")
        }
        else
            alert("Please enter Correct Credential")
    }

    return (
        <div className="container">
            <form onSubmit={handleClick}>
                <div className="form-group my-2">
                    <label htmlFor="email">Email address:</label>
                    <input name="email" onChange={onChanges} value={credential.email} type="email" className="form-control my-2" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="password">Password:</label>
                    <input name="password" onChange={onChanges} value={credential.password} type="password" className="form-control my-2" id="password" placeholder="Password" />
                </div>

                <button type="submit" className="btn btn-primary my-2">Submit</button>
            </form>
        </div>
    )
}

export default Login