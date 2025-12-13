import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

import { FiBox, FiShoppingCart, FiSave, FiAlertCircle } from 'react-icons/fi';

export default function SalesForm() {
  const [items, setItems] = useState([]);
  const [itemId, setItemId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchItems = async () => {
    try {
      const res = await api.get('/items');
      setItems(res.data);
    } catch (err) {
      console.error('Error loading items:', err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!itemId) {
      setError('Please select an item');
      return;
    }
    if (!quantity || quantity <= 0) {
      setError('Quantity must be greater than 0');
      return;
    }

    try {
      await api.post('/sales', {
        itemId,
        quantity: Number(quantity),
      });

      // alert('Sale recorded successfully!'); // Removed for smoother flow
      navigate('/sales/history');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to record sale';
      setError(msg);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Record New Sale</h1>
        <p>Log a transaction and update inventory instantly.</p>
      </div>

      <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>

          <div className="form-group">
            <label>Select Item</label>
            <div className="input-wrapper">
              <FiBox className="input-icon" />
              <select
                className="form-input"
                value={itemId}
                onChange={(e) => setItemId(e.target.value)}
                style={{ appearance: 'none', cursor: 'pointer' }}
              >
                <option value="" style={{ color: 'black' }}>-- Choose an item --</option>
                {items.map((item) => (
                  <option key={item.itemId} value={item.itemId} style={{ color: 'black' }}>
                    {item.name} (Qty: {item.quantity})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Quantity Sold</label>
            <div className="input-wrapper">
              <FiShoppingCart className="input-icon" />
              <input
                type="number"
                className="form-input"
                placeholder="Enter quantity sold"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="error-message" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FiAlertCircle /> {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', padding: '1rem', justifyContent: 'center' }}
          >
            <FiSave style={{ marginRight: '0.5rem' }} /> Record Sale
          </button>
        </form>
      </div>
    </div>
  );
}
