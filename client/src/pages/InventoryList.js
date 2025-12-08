import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

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
    <div className="page-container">
      <h1>Inventory</h1>

      <button className="btn-primary" onClick={() => navigate('/inventory/new')}>
        + Add New Item
      </button>

      <div className="filters">
        <input
          type="text"
          placeholder="Search name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
      </div>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr
              key={item._id}
              className={item.quantity < item.threshold ? 'low-stock' : ''}
            >
              <td>{item.itemId}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.brand}</td>
              <td>{item.quantity}</td>
              <td>₹{item.price}</td>
              <td>
                <button onClick={() => navigate(`/inventory/edit/${item._id}`)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryList;
