import React, { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Fetched orders:", data);
        setOrders(data.orders || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch orders", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading orders...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-yellow-400">My Past Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-400">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order, idx) => {
            const products = order.products || [];
            const total = order.totalAmount ?? 0;

            return (
              <div key={idx} className="border rounded p-4 shadow-sm bg-white">
                <p><strong>Order ID:</strong> {order._id || "N/A"}</p>
                <p><strong>Date:</strong> {order.createdAt ? new Date(order.createdAt).toLocaleString() : "N/A"}</p>
                <p><strong>Total:</strong> ${parseFloat(total).toFixed(2)}</p>

                {Array.isArray(products) && products.length > 0 ? (
                  <ul className="list-disc pl-5 mt-2">
                    {products.map((item, i) => (
                      <li key={i}>
                        {item.name || "Unnamed"} × {item.quantity || 1}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400 mt-2">No items in this order.</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Orders;
