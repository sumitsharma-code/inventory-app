import React, { useEffect, useState } from 'react';
import api from '../api/api';

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
    <div className="page-container">
      <h1>Low Stock Items</h1>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Qty</th>
            <th>Threshold</th>
          </tr>
        </thead>

        <tbody>
          {items.length === 0 && (
            <tr>
              <td colSpan="6">No items are below threshold 🎉</td>
            </tr>
          )}

          {items.map((item) => (
            <tr key={item._id} className="low-stock">
              <td>{item.itemId}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.brand}</td>
              <td>{item.quantity}</td>
              <td>{item.threshold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
