import React, { useState, useEffect } from "react";
import { useCart } from "../../../context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MotherboardPage() {
  const { addToCart } = useCart();
  const [motherboardData, setMotherboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [brand, setBrand] = useState("");
  const [socket, setSocket] = useState("");
  const [formFactor, setFormFactor] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    fetch("https://e-commerce-backend-jyg3.onrender.com/api/components?category=Motherboard")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch motherboards");
        }
        return res.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.components)) {
          setMotherboardData(data.components);
        } else {
          setMotherboardData([]);
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

  const handleAddToCart = (board) => {
    addToCart({ ...board, type: "Motherboard" });
    toast.success(`✅ "${board.name}" added to cart`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  if (loading) {
    return <div className="text-center p-10">Loading motherboards...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-600">Error: {error}</div>;
  }

  const filteredBoards = motherboardData
    .filter(
      (board) =>
        (brand === "" || board.brand === brand) &&
        (socket === "" || board.socket === socket) &&
        (formFactor === "" || board.formFactor === formFactor) &&
        board.price >= priceRange[0] &&
        board.price <= priceRange[1]
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
            {/* Motherboard icon */}
            <svg
              className="w-10 h-10"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M4 4h16v16H4V4zM7 7v10h2V7H7zm8 0v10h2V7h-2zM11 7v10h2V7h-2z" />
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
            Motherboards
          </h1>
          <p className="text-xl text-indigo-200 max-w-2xl mx-auto">
            Find the perfect motherboard to power your PC build.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-indigo-200">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm">{filteredBoards.length} Products Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
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

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
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
                <option value="ASUS">ASUS</option>
                <option value="MSI">MSI</option>
                <option value="Gigabyte">Gigabyte</option>
                <option value="ASRock">ASRock</option>
                <option value="Biostar">Biostar</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-600 rounded-full"></span>Socket
              </label>
              <select
                className="w-full p-4 border-2 border-gray-200 rounded-xl shadow-sm hover:border-purple-400 focus:border-purple-600 focus:ring-4 focus:ring-purple-200 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                value={socket}
                onChange={(e) => setSocket(e.target.value)}
              >
                <option value="">All Sockets</option>
                <option value="AM4">AM4</option>
                <option value="AM5">AM5</option>
                <option value="LGA1200">LGA1200</option>
                <option value="LGA1700">LGA1700</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>Form Factor
              </label>
              <select
                className="w-full p-4 border-2 border-gray-200 rounded-xl shadow-sm hover:border-green-400 focus:border-green-600 focus:ring-4 focus:ring-green-200 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                value={formFactor}
                onChange={(e) => setFormFactor(e.target.value)}
              >
                <option value="">All Form Factors</option>
                <option value="ATX">ATX</option>
                <option value="Micro-ATX">Micro-ATX</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span className="w-2 h-2 bg-pink-600 rounded-full"></span>Price Range
              </label>
              <select
                className="w-full p-4 border-2 border-gray-200 rounded-xl shadow-sm hover:border-pink-400 focus:border-pink-600 focus:ring-4 focus:ring-pink-200 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                onChange={handlePriceChange}
                defaultValue="0-500"
              >
                <option value="0-500">All Prices</option>
                <option value="0-100">Up to $100</option>
                <option value="101-200">$101 - $200</option>
                <option value="201-400">$201 - $400</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-600 rounded-full"></span>Sort by Price
              </label>
              <select
                className="w-full p-4 border-2 border-gray-200 rounded-xl shadow-sm hover:border-orange-400 focus:border-orange-600 focus:ring-4 focus:ring-orange-200 transition-all duration-200 bg-white/70 backdrop-blur-sm"
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

        {/* Motherboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBoards.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">No motherboards match your filters.</p>
          ) : (
            filteredBoards.map((board) => (
              <div
                key={board._id}
                className="group bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-white/20 hover:border-white/40 transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-4 mb-6">
                  <img
                    // src={board.imageUrl || board.image}
                    src="/images/motherboard/ASRock B550 Steel Legend.png"
                    alt={board.name}
                    className="w-full h-48 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <h2 className="text-xl font-bold text-gray-800 leading-tight group-hover:text-indigo-600 transition-colors duration-200 mb-3">
                  {board.name}
                </h2>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-6">
                  <div className="bg-gray-50/80 rounded-lg p-3 border border-gray-100">
                    <p className="text-xs uppercase tracking-wide font-semibold mb-1">Brand</p>
                    <p className="font-bold">{board.brand}</p>
                  </div>
                  <div className="bg-gray-50/80 rounded-lg p-3 border border-gray-100">
                    <p className="text-xs uppercase tracking-wide font-semibold mb-1">Socket</p>
                    <p className="font-bold">{board.specs?.Socket || "N/A"}</p>
                  </div>
                  <div className="bg-gray-50/80 rounded-lg p-3 border border-gray-100">
                    <p className="text-xs uppercase tracking-wide font-semibold mb-1">Chipset</p>
                    <p className="font-bold">{board.specs?.Chipset || "N/A"}</p>
                  </div>
                  <div className="bg-gray-50/80 rounded-lg p-3 border border-gray-100">
                    <p className="text-xs uppercase tracking-wide font-semibold mb-1">Form Factor</p>
                    <p className="font-bold">{board.specs?.FormFactor || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-700 bg-clip-text text-transparent">
                    ${board.price}
                  </span>
                  <button
                    onClick={() => handleAddToCart(board)}
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

export default MotherboardPage;
