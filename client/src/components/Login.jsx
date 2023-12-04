import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    event.preventDefault();
    const form = e.target;
    // console.log(form)
    const email = form.email.value;
    console.log(email);
    // console.log(loggedUser);
    axios
      .post("http://localhost:5000/jwt", { email: email })
      .then( (response) => {
        // console.log(response.data.token);
        localStorage.setItem("access_token", response.data.token);
        alert("Login successfully!");
        navigate("/");
      })
      .catch( (error) => {
        console.log(error);
      });
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {/* form */}
        <div className="card shrink-0 md:w-[480px] max-w-5xl shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
