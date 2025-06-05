import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

// Auth Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

// Common Pages
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";

// Route Guards
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import AdminRoute from "./components/AdminRoute";

// Layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // ✅ Added footer import

// User Features
import BuildPC from "./pages/BuildPC";
import Payment from "./pages/Payment";
import Confirm from "./pages/Confirm";
import CheckStatus from "./pages/CheckStatus";
import CartPage from "./pages/CartPage";
import Orders from "./pages/Orders";

// Product Pages
import LaptopsPage from "./pages/products/LaptopsPage";
import CpuPage from "./pages/products/components/CpuPage";
import GpuPage from "./pages/products/components/GpuPage";
import CoolerPage from "./pages/products/components/CoolerPage";
import MotherboardPage from "./pages/products/components/MotherboardPage";
import PsuPage from "./pages/products/components/PsuPage";
import RamPage from "./pages/products/components/RamPage";
import StoragePage from "./pages/products/components/StoragePage";
import PcCasePage from "./pages/products/components/PcCasePage";
import KeyboardPage from "./pages/products/accessories/KeyboardPage";
import MousePage from "./pages/products/accessories/MousePage";
import MonitorPage from "./pages/products/accessories/MonitorPage";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageProducts from "./pages/admin/ManageProducts";
import ManageUsers from "./pages/admin/ManageUsers";
import AddProductPage from "./pages/admin/AddProductPage";
import EditProduct from "./pages/admin/EditProduct";
import AdminOrdersPage from "./pages/admin/pages/AdminOrdersPage";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
                <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
                <Route path="/forgot-password" element={<PublicRoute><ForgotPasswordPage /></PublicRoute>} />

                {/* Private Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/contact" element={<PrivateRoute><ContactPage /></PrivateRoute>} />
                <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
                <Route path="/dashboard" element={<PrivateRoute><div className="text-center py-20">User Dashboard</div></PrivateRoute>} />
                <Route path="/build-pc" element={<PrivateRoute><BuildPC /></PrivateRoute>} />
                <Route path="/payment" element={<PrivateRoute><Payment /></PrivateRoute>} />
                <Route path="/confirmation" element={<PrivateRoute><Confirm /></PrivateRoute>} />
                <Route path="/check-status" element={<PrivateRoute><CheckStatus /></PrivateRoute>} />
                <Route path="/cart" element={<PrivateRoute><CartPage /></PrivateRoute>} />

                {/* Product Routes */}
                <Route path="/products/laptops" element={<PrivateRoute><LaptopsPage /></PrivateRoute>} />
                <Route path="/products/components/cpu" element={<PrivateRoute><CpuPage /></PrivateRoute>} />
                <Route path="/products/components/gpu" element={<PrivateRoute><GpuPage /></PrivateRoute>} />
                <Route path="/products/components/cooler" element={<PrivateRoute><CoolerPage /></PrivateRoute>} />
                <Route path="/products/components/motherboard" element={<PrivateRoute><MotherboardPage /></PrivateRoute>} />
                <Route path="/products/components/psu" element={<PrivateRoute><PsuPage /></PrivateRoute>} />
                <Route path="/products/components/ram" element={<PrivateRoute><RamPage /></PrivateRoute>} />
                <Route path="/products/components/storage" element={<PrivateRoute><StoragePage /></PrivateRoute>} />
                <Route path="/products/components/pc-case" element={<PrivateRoute><PcCasePage /></PrivateRoute>} />
                <Route path="/products/accessories/keyboard" element={<PrivateRoute><KeyboardPage /></PrivateRoute>} />
                <Route path="/products/accessories/mouse" element={<PrivateRoute><MousePage /></PrivateRoute>} />
                <Route path="/products/accessories/monitor" element={<PrivateRoute><MonitorPage /></PrivateRoute>} />

                {/* Admin Routes */}
                <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                <Route path="/admin/products" element={<AdminRoute><ManageProducts /></AdminRoute>} />
                <Route path="/admin/add-product" element={<AdminRoute><AddProductPage /></AdminRoute>} />
                <Route path="/admin/users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
                <Route path="/admin/orders" element={<AdminRoute><AdminOrdersPage /></AdminRoute>} />
                <Route path="/admin/products/edit/:id" element={<AdminRoute><EditProduct /></AdminRoute>} />
              </Routes>
            </main>

            {/* ✅ Add Footer below main content */}
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
