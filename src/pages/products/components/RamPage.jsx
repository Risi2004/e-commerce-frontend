import React, { useState, useEffect } from "react";
import { useCart } from "../../../context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RamPage() {
  const { addToCart } = useCart();

  const [ramData, setRamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("https://e-commerce-backend-jyg3.onrender.com/api/components?category=RAM")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch RAM modules");
        }
        return res.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.components)) {
          setRamData(data.components);
        } else {
          setRamData([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handlePriceChange = (e) => {
    const [min, max] = e.target.value.split("-").map(Number);
    setPriceRange([min, max]);
  };

  const handleAddToCart = (ram) => {
    addToCart({ ...ram, type: "RAM" });
    toast.success(`✅ "${ram.name}" added to cart`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center p-10">
        Loading RAM modules...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center p-10 text-red-600">
        Error: {error}
      </div>
    );
  }

  const filteredRAMs = ramData
    .filter(
      (ram) =>
        (brand === "" || ram.brand === brand) &&
        (size === "" || ram.size === size) &&
        ram.price >= priceRange[0] &&
        ram.price <= priceRange[1]
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50">
      <ToastContainer />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-700 to-indigo-800 text-white py-16 px-6">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
            {/* RAM chip icon */}
            <svg
              className="w-10 h-10"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M5 3v2H3v2h2v8H3v2h2v2h14v-2h2v-2h-2v-8h2V5h-2V3H5zM7 7h10v10H7V7z" />
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
            RAM Modules
          </h1>
          <p className="text-xl text-indigo-200 max-w-2xl mx-auto">
            Browse and select the perfect RAM for your build with ease and style.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-indigo-200">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm">{filteredRAMs.length} Products Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
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

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Brand filter */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>Brand
              </label>
              <select
                className="w-full p-4 border-2 border-gray-200 rounded-xl shadow-sm hover:border-indigo-400 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-200 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              >
                <option value="">All Brands</option>
                <option value="Corsair">Corsair</option>
                <option value="G.Skill">G.Skill</option>
                <option value="Kingston">Kingston</option>
                <option value="TeamGroup">TeamGroup</option>
                <option value="Patriot">Patriot</option>
                <option value="ADATA">ADATA</option>
                <option value="Crucial">Crucial</option>
              </select>
            </div>

            {/* Size filter */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-600 rounded-full"></span>Size
              </label>
              <select
                className="w-full p-4 border-2 border-gray-200 rounded-xl shadow-sm hover:border-purple-400 focus:border-purple-600 focus:ring-4 focus:ring-purple-200 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                <option value="">All Sizes</option>
                <option value="8GB">8GB</option>
                <option value="16GB">16GB</option>
                <option value="32GB">32GB</option>
              </select>
            </div>

            {/* Price filter */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>Price Range
              </label>
              <select
                className="w-full p-4 border-2 border-gray-200 rounded-xl shadow-sm hover:border-green-400 focus:border-green-600 focus:ring-4 focus:ring-green-200 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                onChange={handlePriceChange}
                defaultValue="0-300"
              >
                <option value="0-300">All Prices</option>
                <option value="0-50">Up to $50</option>
                <option value="51-100">$51 - $100</option>
                <option value="101-200">$101 - $200</option>
              </select>
            </div>

            {/* Price sort */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span className="w-2 h-2 bg-pink-600 rounded-full"></span>Sort by Price
              </label>
              <select
                className="w-full p-4 border-2 border-gray-200 rounded-xl shadow-sm hover:border-pink-400 focus:border-pink-600 focus:ring-4 focus:ring-pink-200 transition-all duration-200 bg-white/70 backdrop-blur-sm"
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

        {/* RAM Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRAMs.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">No RAM matches your filters.</p>
          ) : (
            filteredRAMs.map((ram) => (
              <div
                key={ram._id || ram.id}
                className="group bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-white/20 hover:border-white/40 transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-4 mb-6">
                  <img
                    // src={ram.imageUrl || ram.image}
                    src="/images/ram/16GB DDR4 Corsair Vengeance (3200MHz).png"
                    alt={ram.name}
                    className="w-full h-48 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <h2 className="text-xl font-bold text-gray-800 leading-tight group-hover:text-pink-600 transition-colors duration-200 mb-3">
                  {ram.name}
                </h2>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-6">
                  <div className="bg-gray-50/80 rounded-lg p-3 border border-gray-100">
                    <p className="text-xs uppercase tracking-wide font-semibold mb-1">Brand</p>
                    <p className="font-bold">{ram.brand}</p>
                  </div>
                  <div className="bg-gray-50/80 rounded-lg p-3 border border-gray-100">
                    <p className="text-xs uppercase tracking-wide font-semibold mb-1">Type</p>
                    <p className="font-bold">{ram.specs?.Type || "N/A"}</p>
                  </div>
                  <div className="bg-gray-50/80 rounded-lg p-3 border border-gray-100">
                    <p className="text-xs uppercase tracking-wide font-semibold mb-1">Size</p>
                    <p className="font-bold">{ram.specs?.Size || "N/A"}</p>
                  </div>
                  <div className="bg-gray-50/80 rounded-lg p-3 border border-gray-100">
                    <p className="text-xs uppercase tracking-wide font-semibold mb-1">Speed</p>
                    <p className="font-bold">{ram.specs?.Speed || "N/A"}</p>
                  </div>
                </div>


                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent">
                    ${ram.price}
                  </span>
                  <button
                    onClick={() => handleAddToCart(ram)}
                    className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13h10m0 0v7a1 1 0 01-1 1H8a1 1 0 01-1-1v-7m8 0V9a1 1 0 00-1-1H9a1 1 0 00-1 1v4.01"
                      />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default RamPage;
