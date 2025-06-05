import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selections = [], total = 0 } = location.state || {};
  const { clearCart } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "cardNumber") {
      value = value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
    }

    if (name === "expiry") {
      value = value.replace(/^(\d{2})(\d{0,2})$/, (match, p1, p2) => {
        return p2 ? `${p1}/${p2}` : p1;
      });
    }

    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validateFields = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = true;
    if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(formData.cardNumber)) newErrors.cardNumber = true;
    if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) newErrors.expiry = true;
    if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateReference = () => {
    const prefix = "THVN";
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}-${timestamp}-${random}`;
  };

  const formatOrderProducts = () => {
    const items = [];

    Object.entries(selections).forEach(([key, val]) => {
      if (Array.isArray(val)) {
        val.forEach((item) => {
          items.push({
            productId: item._id || item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity || 1,
            category: item.category || key,
            imageUrl: item.image || item.imageUrl,
            brand: item.brand,
            specs: item.specs,
          });
        });
      } else if (val?.name) {
        items.push({
          productId: val._id || val.id,
          name: val.name,
          price: val.price,
          quantity: 1,
          category: val.category || key,
          imageUrl: val.image || val.imageUrl,
          brand: val.brand,
          specs: val.specs,
        });
      }
    });

    return items;
  };

  const detectOrderType = () => {
    const keys = Object.keys(selections);
    return keys.includes("cpu") && keys.includes("gpu") && keys.includes("motherboard")
      ? "pc_build"
      : "single_product";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    const reference = generateReference();
    const products = formatOrderProducts();
    const type = detectOrderType();

    const order = {
      userId: user?.uid || user?.email || "anonymous",
      type,
      products,
      totalAmount: total,
      reference, // ✅ now included
      address: "N/A",
    };

    try {
      await axios.post("http://localhost:5000/api/orders", order);
      clearCart();

      toast.success("Payment successful!", {
        onClose: () =>
          navigate("/confirmation", {
            state: { selections, total, reference },
          }),
        autoClose: 2000,
      });
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to place order. Try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-lg shadow-xl relative">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
        💳 Payment Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Cardholder Name"
          className={`w-full p-3 border rounded ${errors.name ? "border-red-500" : "border-gray-300"}`}
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          className={`w-full p-3 border rounded ${errors.cardNumber ? "border-red-500" : "border-gray-300"}`}
          value={formData.cardNumber}
          onChange={handleChange}
          maxLength={19}
        />

        <div className="flex gap-4">
          <input
            type="text"
            name="expiry"
            placeholder="MM/YY"
            className={`w-1/2 p-3 border rounded ${errors.expiry ? "border-red-500" : "border-gray-300"}`}
            value={formData.expiry}
            onChange={handleChange}
            maxLength={5}
          />

          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            className={`w-1/2 p-3 border rounded ${errors.cvv ? "border-red-500" : "border-gray-300"}`}
            value={formData.cvv}
            onChange={handleChange}
            maxLength={4}
          />
        </div>

        <div className="text-right text-lg font-semibold text-green-700 mt-4">
          Total Amount: ${Number(total).toFixed(2)}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold shadow"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default Payment;
