import React, {useState} from "react";
import { Link,useNavigate } from "react-router-dom"
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
    <section className="">
    <div className="px-5 px-md-5 text-center text-lg-start">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card text-white" style={{backgroundColor: 'rgb(68 23 116)', borderRadius: '1.5rem', width:'55vh', height:'80vh'}}>
          <div className="card-body p-5 text-center">
      <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
      <p className="text-white-50 mb-5">Please enter your email and password!</p>
      <form onSubmit={handleSubmit}>
      <div className="form-outline form-white mb-4">
          <input type="email" className="form-control form-label-lg" onChange={onChange} placeholder="Email address" value = {credentials.email} name="email" id="email"/>
      </div>
        <div className="mb-3">
          <input type="password" className="form-control" onChange={onChange} placeholder="Password" value = {credentials.password} name="password" id="password"/>
        </div>
        <button className="btn btn-outline-light btn-lg px-5 my-5" type="submit">Login</button>
        <div>
              <p className="mb-5">Don't have an account? <Link to="/signup" className="text-white-50 fw-bold">Sign Up</Link></p>
        </div>
      </form>
    </div>
    </div>
    </div>
    </div>
    </div>
    </section>
  );
};

export default Login;
