import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';

export default function ItemForm() {
  const { id } = useParams(); // edit mode if id exists
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
    api
      .get(`/items/${id}`)
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
      .catch((err) =>
        setError(err.response?.data?.message || 'Failed to load item')
      )
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const validate = () => {
    if (!form.itemId.trim()) return 'SKU (itemId) is required';
    if (!form.name.trim()) return 'Name is required';
    if (!form.category.trim()) return 'Category is required';
    if (
      form.price === '' ||
      isNaN(Number(form.price)) ||
      Number(form.price) < 0
    )
      return 'Valid price is required';
    if (isNaN(Number(form.quantity)) || Number(form.quantity) < 0)
      return 'Quantity must be >= 0';
    if (isNaN(Number(form.threshold)) || Number(form.threshold) < 0)
      return 'Threshold must be >= 0';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    try {
      if (id) {
        // Edit (Admin only at backend)
        await api.put(`/items/${id}`, {
          name: form.name,
          category: form.category,
          brand: form.brand,
          price: Number(form.price),
          quantity: Number(form.quantity),
          threshold: Number(form.threshold),
        });
        alert('Item updated');
      } else {
        // Create (creator or admin)
        await api.post('/items', {
          itemId: form.itemId,
          name: form.name,
          category: form.category,
          brand: form.brand,
          price: Number(form.price),
          quantity: Number(form.quantity),
          threshold: Number(form.threshold),
        });
        alert('Item created');
      }
      navigate('/inventory');
    } catch (err) {
      const msg = err.response?.data?.message || 'Operation failed';
      setError(msg);
    }
  };

  return (
    <div className="page-container">
      <h1>{id ? 'Edit Item' : 'Add New Item'}</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <form className="item-form" onSubmit={handleSubmit}>
          <label>SKU (itemId)</label>
          <input
            value={form.itemId}
            onChange={handleChange('itemId')}
            disabled={!!id} // don't allow changing SKU on edit
            placeholder="e.g., TV-001"
          />

          <label>Name</label>
          <input
            value={form.name}
            onChange={handleChange('name')}
            placeholder="Item name"
          />

          <label>Category</label>
          <input
            value={form.category}
            onChange={handleChange('category')}
            placeholder="TV, Fridge, AC..."
          />

          <label>Brand</label>
          <input
            value={form.brand}
            onChange={handleChange('brand')}
            placeholder="Brand name"
          />

          <label>Price</label>
          <input
            type="number"
            value={form.price}
            onChange={handleChange('price')}
            placeholder="Price in ₹"
          />

          <label>Quantity</label>
          <input
            type="number"
            value={form.quantity}
            onChange={handleChange('quantity')}
          />

          <label>Threshold</label>
          <input
            type="number"
            value={form.threshold}
            onChange={handleChange('threshold')}
          />

          {error && <p className="error">{error}</p>}

          <div style={{ marginTop: 12 }}>
            <button type="submit">{id ? 'Update Item' : 'Create Item'}</button>
            <button
              type="button"
              onClick={() => navigate('/inventory')}
              style={{ marginLeft: 8 }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
