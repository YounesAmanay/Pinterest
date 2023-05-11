import React, { useState, useEffect } from "react";
import "./signIn.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission (e.g., send login request to Laravel backend)
    // ...

    // Reset form fields
    setEmail("");
    setPassword("");
  };

  return (
    <div className="guest">
      <div class="login-container">
        <h2>Sign In</h2>
        <form>
          <div class="form-group">
            <input type="email" placeholder="Email" />
          </div>
          <div class="form-group">
            <input type="password" placeholder="Password" />
          </div>
          <button type="submit">Sign In</button>
        </form>
        <a href="#" class="subscribe-link">
          Don't have an account? Subscribe here.
        </a>
      </div>
    </div>
  );
}

export default SignIn;
