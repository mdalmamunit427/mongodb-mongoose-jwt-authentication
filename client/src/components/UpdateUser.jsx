import React from "react";
import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";

const UpdateUser = () => {

  const user = useLoaderData();
  // console.log(user)

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    event.preventDefault();
    const form = e.target;
    // console.log(form)
    const name = form.name.value;
    const email = form.email.value;
    const jobTitle = form.jobTitle.value;
    const company = form.company.value;
    const role = "User";
    const UpdatedUser = {
      name,
      email,
      jobTitle,
      company,
      role,
    };

    // console.log(UpdatedUser)
    axios.put(`http://localhost:5000/users/${user._id}`, UpdatedUser, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then( (response) =>{
      // console.log(response);
      alert("User updated successfully!")
      navigate('/')
    })
    .catch((error) =>{
      console.log(error.response.data.message);
      const errMessage = error.response.data.message;
      alert(errMessage);
  });
  };

  return (
    <div className="card px-4">
      <form method="dialog" onSubmit={handleSubmit}>
        <h3 className="font-bold text-lg">Create A New User!</h3>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="name"
            name="name"
            placeholder="name"
            className="input input-bordered"
            defaultValue={user.name}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            name="email"
            defaultValue={user.email}
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Job Title</span>
          </label>
          <input
            type="text"
            name="jobTitle"
            placeholder="Web Developer"
            className="input input-bordered"
            defaultValue={user.jobTitle}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Company</span>
          </label>
          <input
            type="text"
            placeholder="Ex: Mircrosoft"
            name="company"
            defaultValue={user.company}
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control mt-6">
          <input type="submit" className="btn btn-primary" value="Update" />
        </div>
      </form>

      <p className="py-4">Press ESC key or click on ✕ button to close</p>
    </div>
  );
};

export default UpdateUser;
