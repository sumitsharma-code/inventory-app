import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function SalesHistory() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSales = async () => {
    try {
      setLoading(true);
      const res = await api.get("/sales");
      setSales(res.data);
    } catch (err) {
      console.error("Error fetching sales:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>Sales History</h1>
        <p>Track past transactions and revenue.</p>
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <p style={{ padding: '2rem', textAlign: 'center', color: '#9CA3AF' }}>Loading...</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="inventory-table" style={{ minWidth: '600px' }}>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>SKU</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Date</th>
                  <th>Sold By</th>
                </tr>
              </thead>

              <tbody>
                {sales.length === 0 && (
                  <tr>
                    <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: '#9CA3AF' }}>No sales recorded yet.</td>
                  </tr>
                )}

                {sales.map((s) => (
                  <tr key={s._id}>
                    <td style={{ fontWeight: '500', color: 'white' }}>{s.item?.name || "—"}</td>
                    <td>{s.item?.itemId || "—"}</td>
                    <td>{s.quantity}</td>
                    <td style={{ color: '#10B981' }}>₹{s.priceAtSale}</td>
                    <td style={{ color: '#9CA3AF' }}>{new Date(s.date).toLocaleString()}</td>
                    <td>{s.soldBy?.displayName || s.soldBy?.username || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}