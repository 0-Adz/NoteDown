import React, { useState } from "react";
import { useNavigate } from "react-router-dom"

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({name:"", email:"", password:"", confirmpassword:""})
  let navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    // API Call
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
    });
    // eslint-disable-next-line
    const json = await response.json()
    if(json.success){
        //Save the auth token and Redirect
        localStorage.setItem('token', json.authtoken)
        navigate("/")
        props.showAlert("Account created successfully","success")
    }
    else{
        props.showAlert("Invalid Details","danger")
    }
    
}
const onChange = (e) =>{
  setCredentials({...credentials, [e.target.name]: e.target.value})
}
  return (
    <div className="container">
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label"> User name</label>
        <input type="text" className="form-control" onChange={onChange} value = {credentials.name} name="name" id="name"/>
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label"> Email address</label>
        <input type="email" className="form-control" onChange={onChange} value = {credentials.email} name="email" id="email" aria-describedby="emailHelp"/>
        <div id="emailHelp" className="form-text"> We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label"> Password</label>
        <input type="password" className="form-control" onChange={onChange}  name="password" id="password" minLength={5} required/>
      </div>
      <div className="mb-3">
        <label htmlFor="confirmpassword" className="form-label">Confirm your Password</label>
        <input type="password" className="form-control" onChange={onChange}  name="confirmpassword" id="confirmpassword" minLength={5} required/>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>
  );
};

export default SignUp;
