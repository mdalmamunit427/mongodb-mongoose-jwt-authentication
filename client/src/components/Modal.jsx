import axios from "axios";
import React, { useState } from "react";

const Modal = () => {

    const handleSubmit =(e) => {
        event.preventDefault();
        const form = e.target;
        // console.log(form)
        const name = form.name.value;
        const email = form.email.value;
        const jobTitle = form.jobTitle.value;
        const company = form.company.value;
        const role = "User";
        const newUser = {
            name, email, jobTitle, company, role
        }
        // console.log(newUser);
        axios.post('http://localhost:5000/users', newUser)
          .then(function (response) {
            // console.log(response);
            alert("New user created successfully!")
          })
          .catch(function (error) {
            console.log(error);
        });
    }

    const handleCloseBtn = () => {
        document.getElementById('my_modal_3').close();
    }
  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog" onSubmit={handleSubmit}>
            <h3 className="font-bold text-lg">Update A User!</h3>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="name"
                name="name"
                placeholder="name"
                className="input input-bordered"
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
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <input type="submit" className="btn btn-primary" value="Update" />
            </div>
            {/* if there is a button in form, it will close the modal */}
            <div className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-center" onClick={handleCloseBtn}>
              ✕
            </div>
          </form>

          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
