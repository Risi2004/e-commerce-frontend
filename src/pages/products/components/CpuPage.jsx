import React, { useState, useEffect } from "react";
import { useCart } from "../../../context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CpuPage() {
  const { addToCart } = useCart();
  const [cpuData, setCpuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [brand, setBrand] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/components?category=CPU")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch CPUs");
        }
        return res.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.components)) {
          setCpuData(data.components);
        } else {
          setCpuData([]);
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

  const handleAddToCart = (cpu) => {
    addToCart(cpu);
    toast.success(`✅ "${cpu.name}" added to cart`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  if (loading) {
    return <div className="text-center p-10">Loading CPUs...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-600">Error: {error}</div>;
  }

  const filteredCPUs = (Array.isArray(cpuData) ? cpuData : [])
    .filter(
      (cpu) =>
        (brand === "" || cpu.brand === brand) &&
        cpu.price >= priceRange[0] &&
        cpu.price <= priceRange[1]
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <ToastContainer />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-16 px-6">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
            {/* CPU icon */}
            <svg
              className="w-10 h-10"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M6 3v2H4a1 1 0 00-1 1v2h2V6h2V4H6zm12 0v2h-2v2h2v2h2V6a1 1 0 00-1-1h-2zM4 15v2a1 1 0 001 1h2v-2H6v-2H4v1zm16 0v1h-2v2h2a1 1 0 001-1v-2h-1zM9 8h6v8H9V8z" />
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            CPUs
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Explore high-performance processors for gaming, workstations, and everyday computing.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-blue-100">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm">{filteredCPUs.length} Products Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
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

          {/* Center filters with gap */}
          <div className="flex flex-wrap justify-center gap-6">
            {/* Brand filter */}
            <div className="space-y-2 min-w-[220px]">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 justify-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>Brand
              </label>
              <select
                className="w-full p-4 border-2 border-gray-200 rounded-xl shadow-sm hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              >
                <option value="">All Brands</option>
                <option value="Intel">Intel</option>
                <option value="AMD">AMD</option>
              </select>
            </div>

            {/* Price range filter */}
            <div className="space-y-2 min-w-[220px]">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 justify-center">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>Price Range
              </label>
              <select
                className="w-full p-4 border-2 border-gray-200 rounded-xl shadow-sm hover:border-green-300 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                onChange={handlePriceChange}
                defaultValue="0-1000"
              >
                <option value="0-1000">All Prices</option>
                <option value="0-200">Up to $200</option>
                <option value="201-400">$201 - $400</option>
                <option value="401-800">$401 - $800</option>
              </select>
            </div>

            {/* Price sort */}
            <div className="space-y-2 min-w-[220px]">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 justify-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>Sort by Price
              </label>
              <select
                className="w-full p-4 border-2 border-gray-200 rounded-xl shadow-sm hover:border-orange-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200 bg-white/70 backdrop-blur-sm"
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

        {/* CPU Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredCPUs.map((cpu) => (
            <div
              key={cpu._id}
              className="group bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-white/20 hover:border-white/40 transform hover:-translate-y-3"
            >
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 mb-8">
                <img
                  // src={cpu.image ? cpu.image : "/images/cpu/cpu-test.jpg"}
                  src="/images/cpu/cpu-test.jpeg"
                  alt={cpu.name}
                  className="w-full h-56 object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>


              <h2 className="text-2xl font-bold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors duration-200 mb-5">
                {cpu.name}
              </h2>

              <div className="grid grid-cols-2 gap-6 text-sm text-gray-700 mb-8">
                <div className="bg-gray-50/80 rounded-lg p-4 border border-gray-100">
                  <p className="text-xs uppercase tracking-wide font-semibold mb-2">Brand</p>
                  <p className="font-bold">{cpu.brand}</p>
                </div>
                <div className="bg-gray-50/80 rounded-lg p-4 border border-gray-100">
                  <p className="text-xs uppercase tracking-wide font-semibold mb-2">Socket</p>
                  <p className="font-bold">{cpu.specs?.Socket || "N/A"}</p>
                </div>
                <div className="bg-gray-50/80 rounded-lg p-4 border border-gray-100">
                  <p className="text-xs uppercase tracking-wide font-semibold mb-2">Cores</p>
                  <p className="font-bold">{cpu.specs?.Cores || "N/A"}</p>
                </div>
                <div className="bg-gray-50/80 rounded-lg p-4 border border-gray-100">
                  <p className="text-xs uppercase tracking-wide font-semibold mb-2">Threads</p>
                  <p className="font-bold">{cpu.specs?.Threads || "N/A"}</p>
                </div>
                <div className="bg-gray-50/80 rounded-lg p-4 border border-gray-100 col-span-2">
                  <p className="text-xs uppercase tracking-wide font-semibold mb-2">Base Clock</p>
                  <p className="font-bold">{cpu.specs?.BaseClock || "N/A"}</p>
                </div>
                <div className="bg-gray-50/80 rounded-lg p-4 border border-gray-100 col-span-2">
                  <p className="text-xs uppercase tracking-wide font-semibold mb-2">Boost Clock</p>
                  <p className="font-bold">{cpu.specs?.BoostClock || "N/A"}</p>
                </div>
              </div>


              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                  ${cpu.price}
                </span>
                <button
                  onClick={() => handleAddToCart(cpu)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 px-8 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3"
                >
                  Add to Cart
                  <svg
                    className="w-5 h-5"
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
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCPUs.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No CPUs match your filters.</p>
        )}
      </div>
    </div>
  );
}

export default CpuPage;
