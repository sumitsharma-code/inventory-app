import React, { useEffect, useState, useContext } from 'react';
import api from '../api/api';
import { AuthContext } from '../contexts/AuthContext';

export default function UserManagement() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: '', password: '', role: 'creator', displayName: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') fetchUsers();
    // eslint-disable-next-line
  }, [user]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.username || !form.password) {
      setError('Username and password required');
      return;
    }
    try {
      await api.post('/auth/register', {
        username: form.username,
        password: form.password,
        role: form.role,
        displayName: form.displayName
      });
      setForm({ username: '', password: '', role: 'creator', displayName: '' });
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create user');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete');
    }
  };

  if (user?.role !== 'admin') {
    return <div style={{ padding: 20 }}>Forbidden — admin only.</div>;
  }

  return (
    <div className="page-container">
      <h1>User Management</h1>

      <div className="user-create">
        <h3>Create User</h3>
        <form onSubmit={handleCreate} className="item-form">
          <input placeholder="Username" value={form.username} onChange={e=>setForm({...form, username:e.target.value})} />
          <input placeholder="Display name" value={form.displayName} onChange={e=>setForm({...form, displayName:e.target.value})} />
          <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
          <select value={form.role} onChange={e=>setForm({...form, role:e.target.value})}>
            <option value="creator">Creator</option>
            <option value="admin">Admin</option>
          </select>
          <div style={{ marginTop: 8 }}>
            <button type="submit">Create</button>
          </div>
        </form>
        {error && <p className="error">{error}</p>}
      </div>

      <hr style={{ margin: '20px 0' }} />

      <h3>Existing Users</h3>
      {loading ? <p>Loading users...</p> : (
        <table className="inventory-table">
          <thead>
            <tr><th>Username</th><th>Display</th><th>Role</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td>{u.username}</td>
                <td>{u.displayName || '—'}</td>
                <td>{u.role}</td>
                <td>
                  <button onClick={() => handleDelete(u._id)} disabled={u._id === user.id}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
