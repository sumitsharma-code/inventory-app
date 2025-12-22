import React, { useEffect, useState } from "react";
import api from "../api/api";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load users
  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Create user
  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await api.post("/users", {
        username,
        password,
        role,
      });

      setSuccess("User created successfully");
      setUsername("");
      setPassword("");
      setRole("staff");

      fetchUsers();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create user"
      );
    }
  };

  return (
    <div className="page-container">
      <h1>User Management</h1>

      <form onSubmit={handleCreateUser} className="card">
        <h3>Create New User</h3>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Create User</button>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>

      <div className="card">
        <h3>All Users</h3>
        <ul>
          {users.map((u) => (
            <li key={u._id}>
              {u.username} — <b>{u.role}</b>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserManagement;
