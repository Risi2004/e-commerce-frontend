import React, { useEffect, useState } from "react";
import { useCart } from "../../../context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MousePage() {
  const { addToCart } = useCart();

  const [mice, setMice] = useState([]);
  const [brand, setBrand] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/components?category=Mouse")
      .then((res) => res.json())
      .then((data) => {
        setMice(data.components || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch mice:", error);
        setLoading(false);
      });
  }, []);

  const uniqueBrands = [...new Set(mice.map((item) => item.brand))];

  const handleAddToCart = (item) => {
    addToCart({ ...item, type: "Mouse" });
    toast.success(`✅ "${item.name}" added to cart`, { position: "top-right" });
  };

  const filteredMice = mice
    .filter((item) => brand === "" || item.brand === brand)
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading mice...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50">
      <ToastContainer />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-700 via-purple-800 to-indigo-900 text-white py-16 px-6">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2C9.243 2 7 4.243 7 7v10a5 5 0 0010 0V7c0-2.757-2.243-5-5-5zM9 7a3 3 0 016 0v5H9V7z" />
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">
            Computer Mouse
          </h1>
          <p className="text-xl text-indigo-300 max-w-2xl mx-auto">
            Explore a variety of gaming and ergonomic mice for every setup.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-indigo-300">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm">{filteredMice.length} Products Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-4xl mx-auto px-6 py-8 bg-white rounded-2xl shadow-xl border border-white/20 mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Filter & Sort</h2>
        </div>

        <div className="flex items-center justify-center gap-10">
          {/* Brand Filter */}
          <div className="flex flex-col space-y-1 w-48">
            <label className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
              <span className="w-3 h-3 rounded-full bg-indigo-600"></span>Brand
            </label>
            <select
              className="p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-indigo-300 focus:border-indigo-500"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            >
              <option value="">All Brands</option>
              {uniqueBrands.map((b, i) => (
                <option key={i} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Sort by Price */}
          <div className="flex flex-col space-y-1 w-48">
            <label className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
              <span className="w-3 h-3 rounded-full bg-pink-600"></span>Sort by Price
            </label>
            <select
              className="p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-pink-300 focus:border-pink-500"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Default Order</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mouse Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMice.map((item) => (
          <div
            key={item._id}
            className="group bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-white/20 hover:border-white/40 transform hover:-translate-y-2 flex flex-col items-center"
          >
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-4 mb-6 w-full">
              <img
                // src={item.image || item.imageUrl}
                src="/images/accessories/Corsair Ironclaw RGB.webp"
                alt={item.name}
                className="w-full h-48 object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            <h2 className="text-xl font-bold text-gray-800 leading-tight group-hover:text-pink-600 transition-colors duration-200 mb-3 text-center">
              {item.name}
            </h2>

            <p className="text-gray-600 mb-2 text-center">
              <strong>DPI:</strong> {item.specs?.DPI || "N/A"} • <strong>Sensor:</strong> {item.specs?.SensorType || "N/A"}
            </p>

            <div className="flex items-center justify-between w-full mt-auto">
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent">
                ${item.price}
              </span>
              <button
                onClick={() => handleAddToCart(item)}
                className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredMice.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No mice found.</p>
      )}
    </div>
  );
}

export default MousePage;
