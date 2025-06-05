import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import AdminSidebar from '../../../components/AdminSidebar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);


  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/orders');
      setOrders(res.data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}/status`, {
        status: newStatus,
      });
      toast.success(`Order ${id} status updated to ${newStatus}`);
      fetchOrders(); // Refresh list
    } catch (error) {
      console.error(error);
      toast.error('Status update failed');
    }
  };

  const filteredOrders = filter === 'all'
    ? orders
    : orders.filter((o) => o.type === filter);

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">🧾 Manage Orders</h1>

        {/* Filter */}
        <div className="mb-4">
          <label className="font-medium mr-2">Filter:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border px-3 py-1 rounded"
          >
            <option value="all">All</option>
            <option value="pc_build">PC Builds</option>
            <option value="single_product">Product Orders</option>
          </select>
        </div>

        {/* Orders Table */}
        {loading ? (
          <div className="text-center py-10">
            <Loader2 className="animate-spin mx-auto" size={32} />
            <p className="mt-2">Loading orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border">Order ID</th>
                  <th className="p-3 border">Reference</th>
                  <th className="p-3 border">User</th>
                  <th className="p-3 border">Type</th>
                  <th className="p-3 border">Amount</th>
                  <th className="p-3 border">Status</th>
                  <th className="p-3 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="text-center">
                    <td className="p-2 border">{order._id}</td>
                    <td className="p-2 border text-blue-700 font-medium">{order.reference || 'N/A'}</td>
                    <td className="p-2 border">{order.userId}</td>
                    <td className="p-2 border capitalize">{order.type.replace('_', ' ')}</td>
                    <td className="p-2 border">${order.totalAmount}</td>
                    <td className="p-2 border">{order.status}</td>
                    <td className="p-2 border space-x-2">
                      {order.status !== 'Confirmed' && (
                        <button
                          onClick={() => handleStatusChange(order._id, 'Confirmed')}
                          className="px-2 py-1 bg-green-500 text-white rounded"
                        >
                          Confirm
                        </button>
                      )}
                      {order.status !== 'Cancelled' && (
                        <button
                          onClick={() => handleStatusChange(order._id, 'Cancelled')}
                          className="px-2 py-1 bg-red-500 text-white rounded"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
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

export default AdminOrdersPage;
