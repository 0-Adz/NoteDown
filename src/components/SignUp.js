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
    <section className="">
    <div className="px-4 px-md-5 text-center text-lg-start">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card text-white" style={{backgroundColor: 'rgb(68 23 116)', borderRadius: '1.5rem', width:'55vh', height:'80vh'}}>
          <div className="card-body p-5 text-center">
      <h2 className="fw-bold mb-2 text-uppercase">SignUp</h2>
      <p className="text-white-50 mb-5">Please enter your credentials!</p>
    <form onSubmit={handleSubmit}>
      <div className="mb-3 my-3">
        <input type="text" className="form-control" onChange={onChange} placeholder="User name" value = {credentials.name} name="name" id="name"/>
      </div>
      <div className="mb-3">
        <input type="email" className="form-control" onChange={onChange} placeholder="Email address" value = {credentials.email} name="email" id="email" aria-describedby="emailHelp"/>
      </div>
      <div className="mb-3">
        <input type="password" className="form-control" onChange={onChange} placeholder="Password" name="password" id="password" minLength={5} required/>
      </div>
      <div className="mb-5 my-3">
        <input type="password" className="form-control" onChange={onChange} placeholder="Confirm your Password" name="confirmpassword" id="confirmpassword" minLength={5} required/>
      </div>
      <button className="btn btn-outline-light btn-lg px-5 my-5" type="submit">SignUp</button>
    </form>
    </div>
    </div>
    </div>
    </div>
    </div>
    </section>
  );
};

export default SignUp;
