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
    <div className="page-container">
      <h1>Sales History</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>SKU</th>
              <th>Quantity</th>
              <th>Price at Sale</th>
              <th>Date</th>
              <th>Sold By</th>
            </tr>
          </thead>

          <tbody>
            {sales.length === 0 && (
              <tr>
                <td colSpan="6">No sales recorded yet.</td>
              </tr>
            )}

            {sales.map((s) => (
              <tr key={s._id}>
                <td>{s.item?.name || "—"}</td>
                <td>{s.item?.itemId || "—"}</td>
                <td>{s.quantity}</td>
                <td>₹{s.priceAtSale}</td>
                <td>{new Date(s.date).toLocaleString()}</td>
                <td>{s.soldBy?.displayName || s.soldBy?.username || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}