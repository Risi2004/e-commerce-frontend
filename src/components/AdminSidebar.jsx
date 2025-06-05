import React from "react";
import { Link, useLocation } from "react-router-dom";

function AdminSidebar() {
  const location = useLocation();

  const linkClasses = (path) =>
    `block px-4 py-3 rounded hover:bg-gray-700 ${
      location.pathname === path ? "bg-gray-800 text-white" : "text-gray-300"
    }`;

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-5">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
      <nav className="space-y-2">
        <Link to="/admin/dashboard" className={linkClasses("/admin")}>
          🏠 Dashboard
        </Link>
        <Link to="/admin/products" className={linkClasses("/admin/products")}>
          📦 Products
        </Link>
      </nav>
    </div>
  );
}

export default AdminSidebar;
