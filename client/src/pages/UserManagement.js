import React, { useEffect, useState } from "react";
import api from "../api/api";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "staff",
  });

  // Fetch all users (admin only)
  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      setError("Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/users", {
        username: form.username,
        password: form.password,
        role: form.role,
      });

      setForm({
        username: "",
        password: "",
        role: "staff",
      });

      fetchUsers();
      alert("User created successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h1>User Management</h1>

      {/* CREATE USER FORM */}
      <form onSubmit={handleSubmit} className="card">
        <h3>Create New User</h3>

        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

<<<<<<< HEAD
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create User"}
        </button>

        {error && <p className="error">{error}</p>}
      </form>

      {/* USERS LIST */}
      <div className="card">
        <h3>Existing Users</h3>

        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.username}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
=======
      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <h3 style={{ padding: '1.5rem', margin: 0, color: 'white', background: 'rgba(255,255,255,0.02)' }}>Existing Users</h3>
        {loading ? <p style={{ padding: '2rem', textAlign: 'center' }}>Loading users...</p> : (
          <div style={{ overflowX: 'auto' }}>
            <table className="inventory-table" style={{ minWidth: '600px' }}>
              <thead>
                <tr><th>Username</th><th>Display Name</th><th>Role</th><th style={{ textAlign: 'right' }}>Actions</th></tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id}>
                    <td style={{ color: 'white', fontWeight: '500' }}>{u.username}</td>
                    <td>{u.displayName || '—'}</td>
                    <td>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.85rem',
                        background: u.role === 'admin' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                        color: u.role === 'admin' ? '#C4B5FD' : '#93C5FD'
                      }}>
                        {u.role}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        onClick={() => handleDelete(u._id)}
                        disabled={u._id === user.id}
                        className="icon-btn-edit"
                        style={{ color: '#EF4444' }}
                        title="Delete User"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
>>>>>>> f8f8382dd96b35fc4692d727671a8f76fda6713e
      </div>
    </div>
  );
};

export default UserManagement;
