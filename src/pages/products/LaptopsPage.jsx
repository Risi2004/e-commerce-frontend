// src/pages/LaptopsPage.jsx
import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LaptopsPage() {
  const { addToCart } = useCart();
  const [laptopsData, setLaptopsData] = useState([]);
  const [brand, setBrand] = useState("");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [ram, setRam] = useState("");
  const [cpu, setCpu] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/components?category=Laptop")
      .then((res) => res.json())
      .then((data) => setLaptopsData(data.components || []))
      .catch((err) => {
        console.error("❌ Failed to fetch laptops:", err);
        toast.error("Failed to load laptops from server.");
      });
  }, []);

  const handlePriceChange = (e) => {
    const [min, max] = e.target.value.split("-").map(Number);
    setPriceRange([min || 0, max || 5000]);
  };

  const handleAddToCart = (laptop) => {
    addToCart(laptop);
    toast.success(`✅ "${laptop.name}" added to cart`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const filteredLaptops = laptopsData.filter((laptop) => {
    const specs = laptop.specs || {};
    return (
      (brand === "" || laptop.brand === brand) &&
      (ram === "" || (specs.RAM || "").includes(ram)) &&
      (cpu === "" || (specs.Processor || "").includes(cpu)) &&
      laptop.price >= priceRange[0] &&
      laptop.price <= priceRange[1]
    );
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer />
      <h1 className="text-5xl font-bold mb-6 text-center text-gray-800">Laptops</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        <select
          className="p-3 border rounded shadow-sm"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        >
          <option value="">All Brands</option>
          <option value="Dell">Dell</option>
          <option value="Apple">Apple</option>
          <option value="Asus">Asus</option>
          <option value="Lenovo">Lenovo</option>
          <option value="MSI">MSI</option>
          <option value="HP">HP</option>
          <option value="Acer">Acer</option>
          <option value="Samsung">Samsung</option>
          <option value="Microsoft">Microsoft</option>
        </select>

        <select className="p-3 border rounded shadow-sm" onChange={handlePriceChange}>
          <option value="0-5000">All Prices</option>
          <option value="0-1200">Up to $1200</option>
          <option value="1201-1600">$1201 - $1600</option>
          <option value="1601-2000">$1601 - $2000</option>
          <option value="2001-3000">$2001 - $3000</option>
        </select>

        <select
          className="p-3 border rounded shadow-sm"
          value={ram}
          onChange={(e) => setRam(e.target.value)}
        >
          <option value="">All RAM Sizes</option>
          <option value="8GB">8GB</option>
          <option value="16GB">16GB</option>
          <option value="32GB">32GB</option>
        </select>

        <select
          className="p-3 border rounded shadow-sm"
          value={cpu}
          onChange={(e) => setCpu(e.target.value)}
        >
          <option value="">All CPUs</option>
          <option value="Intel Core i5">Intel Core i5</option>
          <option value="Intel Core i7">Intel Core i7</option>
          <option value="Intel Core i9">Intel Core i9</option>
          <option value="AMD Ryzen 5">AMD Ryzen 5</option>
          <option value="AMD Ryzen 7">AMD Ryzen 7</option>
          <option value="AMD Ryzen 9">AMD Ryzen 9</option>
          <option value="Apple M2">Apple M2</option>
          <option value="Apple M3">Apple M3</option>
        </select>
      </div>

      {/* Laptop Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredLaptops.map((laptop) => {
          const specs = laptop.specs || {};
          return (
            <div
              key={laptop._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden border hover:shadow-2xl transition duration-300"
            >
              <img
                src={laptop.image}
                alt={laptop.name}
                className="w-full h-44 object-contain bg-gray-50"
              />
              <div className="p-5">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                  {laptop.name}
                </h2>

                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-4">
                  <p><strong>Brand:</strong> {laptop.brand}</p>
                  <p><strong>CPU:</strong> {specs.CPU || "N/A"}</p>
                  <p><strong>GPU:</strong> {specs.GPU || "N/A"}</p>
                  <p><strong>RAM:</strong> {specs.RAM || "N/A"}</p>
                  <p><strong>Storage:</strong> {specs.Storage || "N/A"}</p>
                  <p><strong>Display:</strong> {specs.Screen || "N/A"}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-green-700">
                    ${laptop.price}
                  </span>
                  <button
                    onClick={() => handleAddToCart(laptop)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredLaptops.length === 0 && (
        <p className="text-center text-gray-500 mt-12 text-lg">
          No laptops match your selected filters.
        </p>
      )}
    </div>
  );
}

export default LaptopsPage;
