import React, { useState, useEffect } from "react";
import { useCart } from "../../../context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PcCasePage() {
  const { addToCart } = useCart();
  const [pcCaseData, setPcCaseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    fetch("https://e-commerce-backend-jyg3.onrender.com/api/components?category=PcCase")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch PC Cases");
        }
        return res.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.components)) {
          setPcCaseData(data.components);
        } else {
          setPcCaseData([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (item) => {
    addToCart({ ...item, type: "PC Case" });
    toast.success(`✅ "${item.name}" added to cart`, { position: "top-right" });
  };

  const sortedCases = (Array.isArray(pcCaseData) ? pcCaseData : []).sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  if (loading) {
    return <div className="text-center p-10">Loading PC Cases...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50">
      <ToastContainer />

      {/* Hero */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-700 to-indigo-800 text-white py-16 px-6">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
            <svg
              className="w-10 h-10"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M3 4h18v16H3zM6 7v10h2V7H6zm10 0v10h2V7h-2zM10 7v10h4V7h-4z" />
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
            PC Cases
          </h1>
          <p className="text-xl text-indigo-200 max-w-2xl mx-auto">
            Stylish and functional PC cases for every build.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-indigo-200">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm">{sortedCases.length} Products Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8 mb-12 max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-6 justify-center">
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
            <h2 className="text-2xl font-bold text-gray-800">Sort by Price</h2>
          </div>

          <div className="space-y-2 min-w-[220px] mx-auto">
            <select
              className="w-full p-4 border-2 border-gray-200 rounded-xl shadow-sm hover:border-indigo-400 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-200 transition-all duration-200 bg-white/70 backdrop-blur-sm"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Default Order</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {sortedCases.map((item) => (
            <div
              key={item._id}
              className="group bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-white/20 hover:border-white/40 transform hover:-translate-y-3 flex flex-col items-center"
            >
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 mb-8 w-full">
                <img
                  // src={item.imageUrl || item.image}
                  src="/images/case/Cooler Master MasterBox Q300L.jpeg"
                  alt={item.name}
                  className="w-full h-56 object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <h2 className="text-2xl font-bold text-gray-800 leading-tight group-hover:text-indigo-600 transition-colors duration-200 mb-5 text-center">
                {item.name}
              </h2>

              <p className="text-gray-600 mb-4 text-center">
                <strong>{item.formFactor || "ATX"}</strong> •{" "}
                <strong>{item.brand || "Generic"}</strong>
              </p>

              <div className="flex items-center justify-between w-full mt-auto">
                <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-700 bg-clip-text text-transparent">
                  ${item.price}
                </span>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white py-4 px-8 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {sortedCases.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No PC cases found.</p>
        )}
      </div>
    </div>
  );
}

export default PcCasePage;
