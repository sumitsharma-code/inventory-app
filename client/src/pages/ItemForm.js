import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';

import { FiBox, FiTag, FiDollarSign, FiLayers, FiAlertCircle, FiSave, FiX } from 'react-icons/fi';

export default function ItemForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    itemId: '',
    name: '',
    category: '',
    brand: '',
    price: '',
    quantity: 0,
    threshold: 5,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If editing, fetch item
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    // ... fetch logic remains the same ...
    api.get(`/items/${id}`)
      .then((res) => {
        const data = res.data;
        setForm({
          itemId: data.itemId || '',
          name: data.name || '',
          category: data.category || '',
          brand: data.brand || '',
          price: data.price || '',
          quantity: data.quantity || 0,
          threshold: data.threshold || 5,
        });
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load item'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const validate = () => {
    if (!form.itemId.trim()) return 'SKU (itemId) is required';
    if (!form.name.trim()) return 'Name is required';
    if (!form.category.trim()) return 'Category is required';
    if (form.price === '' || isNaN(Number(form.price)) || Number(form.price) < 0) return 'Valid price is required';
    if (isNaN(Number(form.quantity)) || Number(form.quantity) < 0) return 'Quantity must be >= 0';
    if (isNaN(Number(form.threshold)) || Number(form.threshold) < 0) return 'Threshold must be >= 0';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const v = validate();
    if (v) { setError(v); return; }

    try {
      if (id) {
        await api.put(`/items/${id}`, { ...form, price: Number(form.price), quantity: Number(form.quantity), threshold: Number(form.threshold) });
        // Removed alert for smoother UX
      } else {
        await api.post('/items', { ...form, price: Number(form.price), quantity: Number(form.quantity), threshold: Number(form.threshold) });
      }
      navigate('/inventory');
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>{id ? 'Edit Item' : 'New Item'}</h1>
        <p>{id ? 'Update inventory details.' : 'Add a new product to your inventory.'}</p>
      </div>

      <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        {loading ? (
          <p style={{ color: 'white', textAlign: 'center' }}>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="form-group">
                <label>SKU (ID)</label>
                <div className="input-wrapper">
                  <FiTag className="input-icon" />
                  <input
                    className="form-input"
                    value={form.itemId}
                    onChange={handleChange('itemId')}
                    disabled={!!id}
                    placeholder="e.g., TV-001"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Name</label>
                <div className="input-wrapper">
                  <FiBox className="input-icon" />
                  <input
                    className="form-input"
                    value={form.name}
                    onChange={handleChange('name')}
                    placeholder="Item name"
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="form-group">
                <label>Category</label>
                <div className="input-wrapper">
                  <FiLayers className="input-icon" />
                  <input
                    className="form-input"
                    value={form.category}
                    onChange={handleChange('category')}
                    placeholder="Category"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Brand</label>
                <div className="input-wrapper">
                  <FiTag className="input-icon" />
                  <input
                    className="form-input"
                    value={form.brand}
                    onChange={handleChange('brand')}
                    placeholder="Brand name"
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
              <div className="form-group">
                <label>Price (₹)</label>
                <div className="input-wrapper">
                  <FiDollarSign className="input-icon" />
                  <input
                    type="number"
                    className="form-input"
                    value={form.price}
                    onChange={handleChange('price')}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Quantity</label>
                <div className="input-wrapper">
                  <FiLayers className="input-icon" />
                  <input
                    type="number"
                    className="form-input"
                    value={form.quantity}
                    onChange={handleChange('quantity')}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Low Stock Alert</label>
                <div className="input-wrapper">
                  <FiAlertCircle className="input-icon" />
                  <input
                    type="number"
                    className="form-input"
                    value={form.threshold}
                    onChange={handleChange('threshold')}
                  />
                </div>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate('/inventory')}
                style={{ width: 'auto' }}
              >
                <FiX style={{ marginRight: '0.5rem' }} /> Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
                style={{ width: 'auto', padding: '0.75rem 2rem' }}
              >
                <FiSave style={{ marginRight: '0.5rem' }} /> Save Item
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
