import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

import { FiPlus, FiSearch, FiFilter, FiEdit, FiTrash2 } from 'react-icons/fi';

const InventoryList = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get('/items', {
          params: { search, category, brand },
        });
        setItems(res.data);
      } catch (err) {
        console.error('Error loading items:', err);
      }
    };

    fetchItems();
  }, [search, category, brand]);

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Inventory</h1>
          <p>Manage your products and stock levels.</p>
        </div>
        <button className="btn-primary" onClick={() => navigate('/inventory/new')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FiPlus /> Add Item
        </button>
      </div>

      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div className="input-wrapper">
            <FiSearch className="input-icon" />
            <input
              type="text"
              className="form-input"
              placeholder="Search items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <FiFilter className="input-icon" />
            <input
              type="text"
              className="form-input"
              placeholder="Filter by Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <FiFilter className="input-icon" />
            <input
              type="text"
              className="form-input"
              placeholder="Filter by Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="inventory-table" style={{ minWidth: '800px' }}>
            <thead>
              <tr>
                <th>SKU</th>
                <th>Name</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Stock</th>
                <th>Price</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr
                  key={item._id}
                  className={item.quantity < item.threshold ? 'low-stock-row' : ''}
                >
                  <td>{item.itemId}</td>
                  <td style={{ fontWeight: '500', color: 'white' }}>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.brand}</td>
                  <td>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '1rem',
                      fontSize: '0.85rem',
                      background: item.quantity < item.threshold ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                      color: item.quantity < item.threshold ? '#FCA5A5' : '#6EE7B7'
                    }}>
                      {item.quantity}
                    </span>
                  </td>
                  <td>₹{item.price}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => navigate(`/inventory/edit/${item._id}`)}
                      className="icon-btn-edit"
                      title="Edit Item"
                    >
                      <FiEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {items.length === 0 && (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#9CA3AF' }}>
            No items found.
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryList;
