import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import UpdateUser from "./UpdateUser";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  // const accessToken = localStorage.getItem("access_token");
  // console.log(accessToken)

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await axios.get("http://localhost:5000/users");
        const users = response.data;
        setUsers(users);
      } catch (error) {
        console.error(error);
      }
    }

    getUsers();
  }, []);

  //   search for users
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // delete a single user
  const handleUserDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }).then((res) => {
        // console.log(res.data);
        alert(res.data.message);
        const filtereUsers = users.filter((item) => item._id !== id);
        setUsers(filtereUsers);
      });
    } catch (error) {
      console.log(error.response.data.message);
      const errMessage = error.response.data.message;
      alert(errMessage);
    }
  };

  // signout
  const handleSignOut = () => {
    localStorage.removeItem("access_token");
    alert("Sign out successfully!")
  }
 

  return (
    <div className="mt-24">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <button
            className="btn btn-active btn-primary"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            Create A User
          </button>
        </div>

        <div>
          <input
            type="text"
            placeholder="Search user"
            className="input input-bordered w-24 md:w-auto mr-3"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Link to="login"><button className="btn btn-outline btn-primary mr-3">Login</button></Link>
          <button className="btn btn-outline btn-primary" onClick={handleSignOut}>Signout</button>
        </div>
      </div>

      {/* table for users */}
      <div className="overflow-x-auto my-3  w-full">
        <table className="table table-zebra">
          {/* head */}
          <thead className="bg-violet-800 text-white rounded-md">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Job</th>
              <th>Company</th>
              <th>Manage user</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.jobTitle}</td>
                <td>{user.company}</td>
                <td className="space-x-5 text-white flex">
                 <Link to={`update-user/${user._id}`}> <button 
                    className="btn btn-xs btn-warning"
                  >
                    Edit
                  </button></Link>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleUserDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal />
    </div>
  );
};

export default Home;
