import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

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
    <div className="page-container">
      <h1>Dashboard</h1>

      <div className="dashboard-cards">
        <div className="card" onClick={() => navigate('/inventory')}>
          <h2>Total Items</h2>
          <p>{totalItems}</p>
        </div>

        <div className="card">
          <h2>Total Stock</h2>
          <p>{totalStock}</p>
        </div>

        <div className="card low" onClick={() => navigate('/low-stock')}>
          <h2>Low Stock Items</h2>
          <p>{lowStockCount}</p>
        </div>
      </div>

      <div className="dashboard-actions">
        <button onClick={() => navigate('/inventory')}>View Inventory</button>
        <button onClick={() => navigate('/sales/new')}>Record Sale</button>
        <button onClick={() => navigate('/sales/history')}>Sales History</button>
      </div>
    </div>
  );
};

export default Dashboard;
