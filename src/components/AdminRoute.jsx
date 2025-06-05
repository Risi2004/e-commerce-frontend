import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute({ children }) {
  const { user } = useAuth();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const isLoading = user === undefined;
  const isLoggedIn = !!user;
  const isAdmin = user?.role === "admin";

  
  useEffect(() => {
    if (!isLoading && isLoggedIn && !isAdmin) {
      const timer = setTimeout(() => {
        setShouldRedirect(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, isLoggedIn, isAdmin]);


  if (isLoading) {
    return (
      <div className="text-center text-gray-500 py-10">⏳ Loading...</div>
    );
  }


  if (!isLoggedIn) return <Navigate to="/login" />;


  if (!isAdmin) {
    if (shouldRedirect) return <Navigate to="/" />;

    return (
      <div className="text-center text-red-600 font-bold text-xl py-20">
        ❌ Access Denied: You are not authorized to view this page.
        <p className="text-sm text-gray-500 mt-2">
          Redirecting you back to home...
        </p>
      </div>
    );
  }


  return children;
}

export default AdminRoute;
