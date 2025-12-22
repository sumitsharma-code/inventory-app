import React, { useEffect, useState } from 'react';
import api from '../api/api';

import { FiAlertTriangle } from 'react-icons/fi';

export default function LowStock() {
  const [items, setItems] = useState([]);

  const fetchLowStock = async () => {
    try {
      const res = await api.get('/reports/low-stock');
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching low stock items:', err);
    }
  };

  useEffect(() => {
    fetchLowStock();
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>Low Stock Alerts</h1>
        <p>Items that have fallen below their minimum threshold.</p>
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="inventory-table" style={{ minWidth: '500px' }}>
            <thead>
              <tr>
                <th>Item ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Qty vs Threshold</th>
              </tr>
            </thead>

            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: '#10B981' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                    No items are below threshold!
                  </td>
                </tr>
              )}

              {items.map((item) => (
                <tr key={item._id} className="low-stock-row">
                  <td style={{ color: 'white' }}>{item.itemId}</td>
                  <td style={{ color: 'white', fontWeight: '500' }}>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.brand}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ color: '#F87171', fontWeight: 'bold' }}>{item.quantity}</span>
                      <span style={{ color: '#6B7280', fontSize: '0.8rem' }}>/ {item.threshold}</span>
                      <FiAlertTriangle style={{ color: '#F87171' }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
