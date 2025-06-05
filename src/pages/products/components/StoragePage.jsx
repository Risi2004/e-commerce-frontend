import React, { useState, useEffect } from "react";
import { useCart } from "../../../context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function StoragePage() {
  const { addToCart } = useCart();
  const [storageData, setStorageData] = useState([]);
  const [type, setType] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/components?category=Storage&_=${Date.now()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch storage devices");
        return res.json();
      })
      .then((data) => {
        setStorageData(Array.isArray(data.components) ? data.components : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Unknown error");
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (item) => {
    addToCart({ ...item, type: "Storage" });
    toast.success(`✅ "${item.name}" added to cart`, { position: "top-right" });
  };

  const filtered = storageData
    .filter((s) => type === "" || s.specs?.Type === type)
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Loading storage devices...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600 font-semibold">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-cyan-50 to-blue-50">
      <ToastContainer />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-cyan-600 via-blue-700 to-indigo-800 text-white py-16 px-6">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 6h16v12H4zM6 8v8h12V8H6zM8 10h8v4H8z" />
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
            Storage Devices
          </h1>
          <p className="text-xl text-cyan-200 max-w-2xl mx-auto">
            Find the best SSDs and HDDs for your PC with easy filtering.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-cyan-200">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm">{filtered.length} Products Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Filter & Sort</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {/* Type filter */}
            <div className="space-y-2 min-w-[220px]">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 justify-center">
                <span className="w-2 h-2 bg-cyan-600 rounded-full"></span>Type
              </label>
              <select
                className="w-full p-4 border-2 border-gray-200 rounded-xl shadow-sm hover:border-cyan-400 focus:border-cyan-600 focus:ring-4 focus:ring-cyan-200 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                onChange={(e) => setType(e.target.value)}
                value={type}
              >
                <option value="">All Types</option>
                <option value="SSD">SSD</option>
                <option value="HDD">HDD</option>
              </select>
            </div>

            {/* Price sort */}
            <div className="space-y-2 min-w-[220px]">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 justify-center">
                <span className="w-2 h-2 bg-pink-600 rounded-full"></span>Sort by Price
              </label>
              <select
                className="w-full p-4 border-2 border-gray-200 rounded-xl shadow-sm hover:border-pink-400 focus:border-pink-600 focus:ring-4 focus:ring-pink-200 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                onChange={(e) => setSortOrder(e.target.value)}
                value={sortOrder}
              >
                <option value="">Default Order</option>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Storage Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filtered.map((item) => (
            <div
              key={item._id}
              className="group bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-white/20 hover:border-white/40 transform hover:-translate-y-3"
            >
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 mb-8">
                <img
                  // src={item.imageUrl || item.image}
                  src="/images/storage/1TB SATA SSD (Samsung 870 EVO).jpg"
                  alt={item.name}
                  className="w-full h-56 object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <h2 className="text-2xl font-bold text-gray-800 leading-tight group-hover:text-cyan-600 transition-colors duration-200 mb-5 text-center">
                {item.name}
              </h2>

              <p className="text-gray-600 mb-4 text-center">
                <strong>{item.specs?.Capacity || "N/A"}</strong> •{" "}
                <strong>{item.specs?.Interface || "N/A"}</strong> •{" "}
                <strong>{item.specs?.Type || "N/A"}</strong>
              </p>

              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent">
                  ${item.price}
                </span>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white py-4 px-8 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No storage devices match your filters.</p>
        )}
      </div>
    </div>
  );
}

export default StoragePage;
