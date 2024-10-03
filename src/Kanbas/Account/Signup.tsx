import React from "react";
import { Link } from "react-router-dom";
export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h1>Sign up</h1>
      <input placeholder="username" className="form-control mb-2"/>
      <input placeholder="password" type="password" className="form-control mb-1"/>
      <input placeholder="verify password" type="password" className="form-control mb-2"/>
      <Link to="/Kanbas/Account/Profile" className="btn btn-primary w-100 mb-1"> Sign up </Link>
      <Link to="/Kanbas/Account/Signin" className="btn btn-secondary w-100">Sign in</Link>
    </div>
);}
