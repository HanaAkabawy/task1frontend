import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditUserPage.css";

export default function EditUserPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/users/${id}`)
      .then((res) => {
        setName(res.data.name || "");
        setEmail(res.data.email || "");
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleSave = () => {
    if (!name || !name.trim() || !email || !email.trim()) {
      alert("Please fill in both name and email fields.");
      return;
    }

    axios
      .put(`http://127.0.0.1:8000/api/users/${id}`, { name, email })
      .then(() => {
        alert("User updated successfully!");
        navigate("/users");
      })
      .catch((err) => console.error(err));
  };

  const handleCancel = () => {
    navigate("/users");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="edit-user-container">
      <div className="edit-card">
        <h2>Edit Profile</h2>
        <label className="label-right">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="label-right">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="buttons">
          <button onClick={handleSave} className="save-btn">
            Save
          </button>
          <button onClick={handleCancel} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
