import React, { useState, useEffect } from "react";
import { useCart } from "../../../context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function GpuPage() {
  const { addToCart } = useCart();
  const [gpuData, setGpuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [brand, setBrand] = useState("");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [vram, setVram] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // For price sorting

  useEffect(() => {
    fetch("https://e-commerce-backend-jyg3.onrender.com/api/components?category=GPU")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch GPUs");
        }
        return res.json();
      })
      .then((data) => {
        // Assuming your backend sends { components: [...] }
        if (data && Array.isArray(data.components)) {
          setGpuData(data.components);
        } else {
          setGpuData([]);
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

  const handleAddToCart = (gpu) => {
    addToCart(gpu);
    toast.success(`✅ "${gpu.name}" added to cart`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  if (loading) {
    return <div className="text-center p-10">Loading GPUs...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-600">Error: {error}</div>;
  }

  // Defensive check if gpuData is array
  const filteredGPUs = (Array.isArray(gpuData) ? gpuData : [])
    .filter((gpu) => {
      return (
        (brand === "" || gpu.brand === brand) &&
        (vram === "" || (gpu.vram && gpu.vram.includes(vram))) &&
        gpu.price >= priceRange[0] &&
        gpu.price <= priceRange[1]
      );
    })
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
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 3v2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2V3H9zm0 2h6v2H9V5zM7 7h10v10H7V7zm2 2v2h2V9H9zm4 0v2h2V9h-2zm-4 4v2h2v-2H9zm4 0v2h2v-2h-2z" />
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Graphics Cards
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Discover powerful GPUs for gaming, content creation, and professional workloads
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-blue-100">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm">{filteredGPUs.length} Products Available</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Enhanced Filters Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Filter & Sort</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Brand
              </label>
              <select
                className="w-full p-4 border-2 border-gray-200 rounded-xl shadow-sm hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              >
                <option value="">All Brands</option>
                <option value="NVIDIA">NVIDIA</option>
                <option value="AMD">AMD</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Price Range
              </label>
              <select
                className="w-full p-4 border-2 border-gray-200 rounded-xl shadow-sm hover:border-green-300 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                onChange={handlePriceChange}
              >
                <option value="0-2000">All Prices</option>
                <option value="0-300">Up to $300</option>
                <option value="301-600">$301 - $600</option>
                <option value="601-1000">$601 - $1000</option>
                <option value="1001-2000">$1001 - $2000</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                VRAM Size
              </label>
              <select
                className="w-full p-4 border-2 border-gray-200 rounded-xl shadow-sm hover:border-purple-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                value={vram}
                onChange={(e) => setVram(e.target.value)}
              >
                <option value="">All VRAM Sizes</option>
                <option value="4GB">4GB</option>
                <option value="6GB">6GB</option>
                <option value="8GB">8GB</option>
                <option value="12GB">12GB</option>
                <option value="16GB">16GB</option>
                <option value="24GB">24GB</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                Sort by Price
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

        {/* Enhanced GPU Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGPUs.map((gpu) => (
            <div
              key={gpu._id}
              className="group bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-white/20 hover:border-white/40 transform hover:-translate-y-2"
            >
              {/* GPU Image */}
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-4 mb-6">
                <img
                  // src={gpu.imageUrl || gpu.image} 
                  src="/images/gpu/gpu-test.jpg"
                  alt={gpu.name}
                  className="w-full h-48 object-contain transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${gpu.brand === "NVIDIA"
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "bg-red-100 text-red-700 border border-red-200"
                      }`}
                  >
                    {gpu.brand}
                  </div>
                </div>
              </div>

              {/* GPU Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors duration-200">
                  {gpu.name}
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50/80 rounded-lg p-3 border border-gray-100">
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
                      VRAM
                    </p>
                    <p className="text-sm font-bold text-gray-800">{gpu.specs?.VRAM || "N/A"}</p>
                  </div>
                  <div className="bg-gray-50/80 rounded-lg p-3 border border-gray-100">
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
                      Base Clock
                    </p>
                    <p className="text-sm font-bold text-gray-800">{gpu.specs?.BaseClock || "N/A"}</p>
                  </div>
                  <div className="bg-gray-50/80 rounded-lg p-3 border border-gray-100 col-span-2">
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
                      Boost Clock
                    </p>
                    <p className="text-sm font-bold text-gray-800">{gpu.specs?.BoostClock || "N/A"}</p>
                  </div>
                </div>


                {/* Price and Action */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                      ${gpu.price}
                    </span>
                    <span className="text-xs text-gray-500">Best Price</span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(gpu)}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
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
            </div>
          ))}
        </div>

        {/* Enhanced No Results Message */}
        {filteredGPUs.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467.881-6.077 2.33l-.853-.853A9.967 9.967 0 0112 13c3.536 0 6.192 1.464 8.542 3.736l-.853.853c-.607-.509-1.296-.97-2.061-1.389z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No GPUs Found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              No graphics cards match your current filters. Try adjusting your search criteria to see more results.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default GpuPage;
