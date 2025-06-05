import React, { useState, useEffect } from "react";
import { useCart } from "../../../context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CoolerPage() {
  const { addToCart } = useCart();
  const [coolerData, setCoolerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/components?category=Cooler")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch coolers");
        return res.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.components)) {
          setCoolerData(data.components);
        } else {
          setCoolerData([]);
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

  const handleAddToCart = (cooler) => {
    addToCart({ ...cooler, type: "Cooler" });
    toast.success(`✅ "${cooler.name}" added to cart`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  if (loading) return <div className="text-center p-10">Loading coolers...</div>;
  if (error) return <div className="text-center p-10 text-red-600">Error: {error}</div>;

  const filteredCoolers = coolerData
    .filter(
      (item) =>
        (brand === "" || item.brand === brand) &&
        (type === "" || item.specs?.Type === type) &&
        (size === "" || item.specs?.Size === size) &&
        item.price >= priceRange[0] &&
        item.price <= priceRange[1]
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50">
      <ToastContainer />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-800 text-white py-16 px-6">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6h13M6 6v13h13" />
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
            Coolers
          </h1>
          <p className="text-xl text-cyan-200 max-w-2xl mx-auto">
            Find the perfect cooler to keep your PC build chill.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-cyan-200">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm">{filteredCoolers.length} Products Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Filter & Sort</h2>
          </div>

          <div className="flex flex-wrap justify-start gap-6">
            {/* Brand */}
            <div className="flex flex-col space-y-1 w-48">
              <label className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
                <span className="w-3 h-3 rounded-full bg-blue-600"></span>Brand
              </label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-blue-300 focus:border-blue-500"
              >
                <option value="">All Brands</option>
                <option value="Cooler Master">Cooler Master</option>
                <option value="Corsair">Corsair</option>
                <option value="NZXT">NZXT</option>
                <option value="Noctua">Noctua</option>
              </select>
            </div>

            {/* Type */}
            <div className="flex flex-col space-y-1 w-48">
              <label className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
                <span className="w-3 h-3 rounded-full bg-cyan-600"></span>Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-cyan-300 focus:border-cyan-500"
              >
                <option value="">All Types</option>
                <option value="Air Cooler">Air Cooler</option>
                <option value="Liquid Cooler">Liquid Cooler</option>
              </select>
            </div>

            {/* Size */}
            <div className="flex flex-col space-y-1 w-48">
              <label className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
                <span className="w-3 h-3 rounded-full bg-green-600"></span>Size
              </label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-green-300 focus:border-green-500"
              >
                <option value="">All Sizes</option>
                <option value="120mm">120mm</option>
                <option value="240mm">240mm</option>
                <option value="360mm">360mm</option>
              </select>
            </div>

            {/* Price */}
            <div className="flex flex-col space-y-1 w-48">
              <label className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>Price Range
              </label>
              <select
                onChange={handlePriceChange}
                defaultValue="0-500"
                className="p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-yellow-300 focus:border-yellow-500"
              >
                <option value="0-500">All Prices</option>
                <option value="0-50">Under $50</option>
                <option value="51-100">$51 - $100</option>
                <option value="101-200">$101 - $200</option>
              </select>
            </div>

            {/* Sort */}
            <div className="flex flex-col space-y-1 w-48">
              <label className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
                <span className="w-3 h-3 rounded-full bg-purple-600"></span>Sort by Price
              </label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-purple-300 focus:border-purple-500"
              >
                <option value="">Default Order</option>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cooler Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCoolers.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">No coolers match your filters.</p>
          ) : (
            filteredCoolers.map((cooler) => (
              <div key={cooler._id} className="group bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-white/20 hover:border-white/40 transform hover:-translate-y-2">
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-4 mb-6">
                  <img
                    // src={cooler.image || cooler.imageUrl}
                    src="/images/cooler/Universal Liquid Cooler X.jpg"
                    alt={cooler.name}
                    className="w-full h-48 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h2 className="text-xl font-bold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors duration-200 mb-3">
                  {cooler.name}
                </h2>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-6">
                  <div className="bg-gray-50/80 rounded-lg p-3 border border-gray-100">
                    <p className="text-xs uppercase tracking-wide font-semibold mb-1">Brand</p>
                    <p className="font-bold">{cooler.brand}</p>
                  </div>
                  <div className="bg-gray-50/80 rounded-lg p-3 border border-gray-100">
                    <p className="text-xs uppercase tracking-wide font-semibold mb-1">Type</p>
                    <p className="font-bold">{cooler.specs?.Type}</p>
                  </div>
                  <div className="bg-gray-50/80 rounded-lg p-3 border border-gray-100">
                    <p className="text-xs uppercase tracking-wide font-semibold mb-1">Size</p>
                    <p className="font-bold">{cooler.specs?.Size}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                    ${cooler.price}
                  </span>
                  <button
                    onClick={() => handleAddToCart(cooler)}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
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

export default CoolerPage;
