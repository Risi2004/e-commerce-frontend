import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    imageUrl: "",
    brand: "",
    specs: {},
    stock: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/components/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProduct(data.component);
          setLoading(false);
        } else {
          alert("Product not found");
          navigate("/admin/products");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error loading product");
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/api/components/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Product updated successfully");
        navigate("/admin/products");
      } else {
        alert(`❌ Failed to update product: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error updating product");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-4">✏️ Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" required />
        <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded" required />
        <input type="text" name="category" value={product.category} onChange={handleChange} placeholder="Category" className="w-full p-2 border rounded" required />
        <input type="text" name="brand" value={product.brand} onChange={handleChange} placeholder="Brand" className="w-full p-2 border rounded" />
        <input type="text" name="imageUrl" value={product.imageUrl} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded" />
        <input type="number" name="stock" value={product.stock} onChange={handleChange} placeholder="Stock Quantity" className="w-full p-2 border rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
