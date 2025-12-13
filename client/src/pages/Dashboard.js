import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { FiBox, FiLayers, FiAlertTriangle, FiPlus, FiList, FiClock } from 'react-icons/fi';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const fetchItems = async () => {
    try {
      const res = await api.get('/items');
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching items:', err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const totalItems = items.length;
  const totalStock = items.reduce((sum, item) => sum + item.quantity, 0);
  const lowStockCount = items.filter((item) => item.quantity < item.threshold).length;



  return (
    <div>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Overview of your inventory performance.</p>
      </div>

      <div className="dashboard-grid">
        <div className="glass-card" onClick={() => navigate('/inventory')}>
          <div className="card-icon-wrapper">
            <FiBox />
          </div>
          <div className="stat-label">Total Items</div>
          <p className="stat-value">{totalItems}</p>
        </div>

        <div className="glass-card">
          <div className="card-icon-wrapper" style={{ color: '#8B5CF6', background: 'rgba(139, 92, 246, 0.1)' }}>
            <FiLayers />
          </div>
          <div className="stat-label">Total Stock</div>
          <p className="stat-value">{totalStock}</p>
        </div>

        <div className="glass-card" onClick={() => navigate('/low-stock')}>
          <div className="card-icon-wrapper" style={{ color: '#F59E0B', background: 'rgba(245, 158, 11, 0.1)' }}>
            <FiAlertTriangle />
          </div>
          <div className="stat-label">Low Stock Alerts</div>
          <p className="stat-value">{lowStockCount}</p>
        </div>
      </div>

      <h2 style={{ fontSize: '1.25rem', color: 'white', marginBottom: '1.5rem' }}>Quick Actions</h2>
      <div className="actions-grid">
        <button className="action-btn" onClick={() => navigate('/inventory')}>
          <FiList /> View Inventory
        </button>
        <button className="action-btn" onClick={() => navigate('/sales/new')}>
          <FiPlus /> Record Sale
        </button>
        <button className="action-btn" onClick={() => navigate('/sales/history')}>
          <FiClock /> Sales History
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
