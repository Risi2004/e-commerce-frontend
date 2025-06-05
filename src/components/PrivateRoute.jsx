import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  // Still loading or not logged in
  if (!user) return <Navigate to="/login" />;

  const isAdmin = user.role === "admin"; //  role-based check

  if (!user.emailVerified && !isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center text-red-600 font-medium">
        <p className="text-lg">⚠️ Please verify your email to access this page.</p>
        <p className="text-sm text-gray-600 mt-2">
          Check your inbox and refresh the page after verifying.
        </p>
      </div>
    );
  }

  return children;
};

export default PrivateRoute;
