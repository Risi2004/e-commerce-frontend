import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Edit3, PlusCircle } from "lucide-react";
import AdminSidebar from "../../components/AdminSidebar";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  const fetchProducts = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/components") // ✅ corrected endpoint
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.components || []); // ✅ access 'components' from backend
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/components/${id}`, {
        method: "DELETE", 
      });

      if (res.ok) {
        alert("✅ Product deleted successfully");
        fetchProducts();
      } else {
        alert("❌ Failed to delete product");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">📦 Manage Products</h1>
          <button
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
            onClick={() => navigate("/admin/add-product")}
          >
            <PlusCircle className="w-5 h-5" />
            Add Product
          </button>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full table-auto text-left">
              <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
                <tr>
                  <th className="p-4">#</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {products.map((product, index) => (
                  <tr key={product._id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">{product.name}</td>
                    <td className="p-4">${product.price}</td>
                    <td className="p-4">{product.category}</td>
                    <td className="p-4 flex gap-3">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                      >
                        <Edit3 />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(product._id)}
                      >
                        <Trash2 />
                      </button>
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

export default ManageProducts;
