import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

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

      alert('Sale recorded successfully!');
      navigate('/sales/history');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to record sale';
      setError(msg);
    }
  };

  return (
    <div className="page-container">
      <h1>Record New Sale</h1>

      <form className="item-form" onSubmit={handleSubmit}>

        <label>Select Item</label>
        <select value={itemId} onChange={(e) => setItemId(e.target.value)}>
          <option value="">-- Choose an item --</option>
          {items.map((item) => (
            <option key={item.itemId} value={item.itemId}>
              {item.itemId} — {item.name} (Qty: {item.quantity})
            </option>
          ))}
        </select>

        <label>Quantity Sold</label>
        <input
          type="number"
          placeholder="Enter quantity sold"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Record Sale</button>
      </form>
    </div>
  );
}
