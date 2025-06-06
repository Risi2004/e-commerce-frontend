import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const categorySpecsMap = {
  CPU: ['Cores', 'Threads', 'Base Clock', 'Boost Clock', 'TDP', 'Socket'],
  GPU: ['VRAM', 'Base Clock', 'Boost Clock', 'TDP'],
  RAM: ['Capacity', 'Type', 'Speed', 'Size'],
  Motherboard: ['Socket', 'Chipset', 'Form Factor'],
  Storage: ['Capacity', 'Type', 'Interface'],
  Cooler: ['Type', 'Fan RPM', 'Noise Level'],
  Laptop: ['Processor', 'RAM', 'Storage', 'Display Size', 'GPU'],

  PcCase: ['Form Factor', 'Color', 'Material'],
  Keyboard: ['Type', 'Backlight', 'Connection Type'],
  Mouse: ['DPI', 'Buttons', 'Sensor Type'],
  Monitor: ['Size', 'Resolution', 'Refresh Rate'],
};

function AddProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    brand: '',
    price: '',
    imageUrl: '',
    stock: '',
    specs: {},
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'price' || name === 'stock' ? Number(value) : value;
    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const formatKey = (label) =>
    label
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');

  const handleSpecChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      specs: {
        ...prev.specs,
        [name]: value, // using formatted key directly
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.category || !formData.brand || !formData.price) {
      toast.error('❌ Please fill all required fields');
      return;
    }

    try {
      const response = await fetch('https://e-commerce-backend-jyg3.onrender.com/api/components', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        toast.success('✅ Product added successfully!');
        setFormData({
          name: '',
          category: '',
          brand: '',
          price: '',
          imageUrl: '',
          stock: '',
          specs: {},
        });
      } else {
        toast.error('❌ Failed to add product');
        console.error('Validation Errors:', result.errors || result.message);
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error('❌ Server error');
    }
  };

  const selectedSpecs = categorySpecsMap[formData.category] || [];

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
          className="w-full p-2 border"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-2 border"
        >
          <option value="">Select Category</option>
          {Object.keys(categorySpecsMap).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          placeholder="Brand"
          required
          className="w-full p-2 border"
        />

        <input
          name="price"
          type="number"
          min="0"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="w-full p-2 border"
        />

        <input
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 border"
        />

        <input
          name="stock"
          type="number"
          min="0"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="w-full p-2 border"
        />

        {/* Dynamic Spec Fields */}
        {selectedSpecs.length > 0 && (
          <div className="border p-4 rounded bg-gray-100">
            <h4 className="font-semibold mb-2">Specifications</h4>
            {selectedSpecs.map((spec) => {
              const key = formatKey(spec);
              return (
                <input
                  key={key}
                  name={key}
                  value={formData.specs[key] || ''}
                  onChange={handleSpecChange}
                  placeholder={spec}
                  className="w-full p-2 mb-2 border"
                />
              );
            })}
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddProductPage;
