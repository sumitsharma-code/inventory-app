import React, { useEffect, useState, useContext } from 'react';
import api from '../api/api';
import { AuthContext } from '../contexts/AuthContext';
import { FiUser, FiLock, FiShield, FiPlus, FiTrash2 } from 'react-icons/fi';
import './UserManagement.css';

export default function UserManagement() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: '', password: '', role: 'staff', displayName: '' });
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
      await api.post('/users', {
        username: form.username,
        password: form.password,
        role: form.role,
        displayName: form.displayName
      });
      setForm({ username: '', password: '', role: 'staff', displayName: '' });
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
    <div>
      <div className="page-header">
        <h1>User Management</h1>
        <p>Administer access and roles for the application.</p>
      </div>

      <div className="glass-card user-management-container">
        <h3 className="section-title">Create New User</h3>
        <form onSubmit={handleCreate} className="user-form">
          <div className="form-row">
            <div className="form-group">
              <label>Username</label>
              <div className="input-wrapper">
                <FiUser className="input-icon" />
                <input
                  className="form-input"
                  placeholder="Username"
                  value={form.username}
                  onChange={e => setForm({ ...form, username: e.target.value })}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Display Name</label>
              <div className="input-wrapper">
                <FiUser className="input-icon" />
                <input
                  className="form-input"
                  placeholder="Full Name"
                  value={form.displayName}
                  onChange={e => setForm({ ...form, displayName: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <FiLock className="input-icon" />
                <input
                  className="form-input"
                  placeholder="Password"
                  type="password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Role</label>
              <div className="input-wrapper">
                <FiShield className="input-icon" />
                <select
                  className="form-input"
                  value={form.role}
                  onChange={e => setForm({ ...form, role: e.target.value })}
                  style={{ appearance: 'none' }}
                >
                  <option value="staff" style={{ color: 'black' }}>Staff</option>
                  <option value="admin" style={{ color: 'black' }}>Admin</option>
                </select>
              </div>
            </div>
          </div>

          <button type="submit" className="btn-primary">
            <FiPlus style={{ marginRight: '0.5rem' }} /> Create User
          </button>
        </form>
        {error && <div className="error-message">{error}</div>}
      </div>

      <div className="glass-card existing-users-card">
        <h3 className="existing-users-header">Existing Users</h3>
        {loading ? <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading users...</p> : (
          <div className="table-responsive">
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
                      <span className={`role-badge ${u.role}`}>
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
      </div>
    </div>
  );
}
