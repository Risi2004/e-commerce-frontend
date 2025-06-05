import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill out all fields.");
      return;
    }

    // Here you would send data to the backend
    toast.success("✅ Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <ToastContainer />

      <h2 className="text-3xl font-bold text-center text-yellow-500 mb-10">Contact Us</h2>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Left Column: Info + Map */}
        <div>
          <h3 className="text-xl font-semibold mb-4">📍 Visit Us</h3>
          <p className="text-gray-600 mb-2">TechHaven HQ</p>
          <p className="text-gray-600 mb-2">123 Innovation Avenue, Colombo, Sri Lanka</p>
          <p className="text-gray-600 mb-4">Email: support@techhaven.com</p>
          <p className="text-gray-600 mb-6">Phone: +94 71 123 4567</p>

          <iframe
            className="rounded-lg shadow-md w-full h-64"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.20735307918!2d79.79920984999999!3d6.9218384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2596dcd2e01b5%3A0x10fc33fa47e97c86!2sColombo!5e0!3m2!1sen!2slk!4v1717378655854!5m2!1sen!2slk"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="TechHaven Map"
          ></iframe>
        </div>

        {/* Right Column: Form */}
        <div>
          <h3 className="text-xl font-semibold mb-4">✉️ Send a Message</h3>

          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Write your message..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
