import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import "./signIn.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/auth/login",
        {
          "email": email,
          "password": password,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response)
        localStorage.setItem('token', response.data.token);
        setEmail("");
        setPassword("");
        navigate('/', { state: { from: location } });

      })
      .catch((response) => {
        let newErrors = { ...errors };
        if (response.response.data.errors.email) {
          newErrors.email = response.response.data.errors.email;
        }
        if (response.response.data.errors.password) {
          newErrors.password = response.response.data.errors.password;
        }
        if(response.response.data.errors.message){
          newErrors.password = response.response.data.errors.message;
        }
        setErrors(newErrors);
      });
  };

  return (
    <div className="guest">
      <div className="login-container">
        <h2>Sign In</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group">
            <input type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
             placeholder="Email" />
          </div>
          {errors.email && <span className="error">{errors.email}</span>}
          <div className="form-group">
            <input type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Password" />
          </div>
          {errors.password && <span className="error">{errors.password}</span>}
          <button type="submit">Sign In</button>
        </form>
        <Link to="/sign-up" className="subscribe-link">
          Don't have an account? Subscribe here.
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
