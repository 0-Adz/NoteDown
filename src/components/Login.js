import React, {useState} from "react";
import { useNavigate } from "react-router-dom"
const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"", password:""})
    let navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        // API Call
        const response = await fetch("http://localhost:5000/api/auth/login", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyMTVjNjQwODM0ODE1Yzg4YmRjN2M1In0sImlhdCI6MTY3OTkxMjI1Nn0.HSDfULkdYjYhWctHbUlAUjaIM4v_rgeilbmCqWH17cM"
        },
        body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        // eslint-disable-next-line
        const json = await response.json()
        if(json.success){
            //Save the auth token and Redirect
            localStorage.setItem('token', json.authtoken)
            props.showAlert("Logged In successfully","success")
            navigate("/")
        }
        else{
            props.showAlert("Invalid credentials","danger")
        }
        
    }
    const onChange = (e) =>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div className="container">
      <h2>Login to continue to NoteDown! </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 my-3">
          <label htmlFor="email" className="form-label"> Email address</label>
          <input type="email" className="form-control" onChange={onChange} value = {credentials.email} name="email" id="email" aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text"> We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label"> Password</label>
          <input type="password" className="form-control" onChange={onChange} value = {credentials.password} name="password" id="password"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Login;
