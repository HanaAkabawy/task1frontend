import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Added
import "./UsersTable.css"; // Import CSS

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ Added

  // Fetch all users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/users")
      .then((res) => {
        if (res.data.success) {
          setUsers(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      })
      .finally(() => setLoading(false));
  };

  // Delete a user
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://127.0.0.1:8000/api/users/${id}`)
        .then(() => {
          alert("User deleted successfully");
          fetchUsers();
        })
        .catch((err) => {
          console.error("Error deleting user:", err);
        });
    }
  };

  // Edit a user → navigate to edit page with ID
  const handleEdit = (id) => {
    navigate(`/edit-user/${id}`); // ✅ Sends ID in URL
  };

  return (
    <div className="users-container">
      <h2 className="users-title">Users List</h2>

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : users.length === 0 ? (
        <p className="loading-text">No users found</p>
      ) : (
        <div className="table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(user.id)}
                      className="btn btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="btn btn-delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
