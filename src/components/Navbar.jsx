import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, UserCircle2 } from "lucide-react";

function Navbar() {
  const { user } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [componentsOpen, setComponentsOpen] = useState(false);
  const [accessoriesOpen, setAccessoriesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [productsTimeout, setProductsTimeout] = useState(null);
  const [componentsTimeout, setComponentsTimeout] = useState(null);
  const [accessoriesTimeout, setAccessoriesTimeout] = useState(null);
  const profileRef = useRef();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const getUsername = () => {
    if (!user) return "";
    return user.displayName || user.email.split("@")[0];
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuOpen(false);
    setProductsOpen(false);
    setComponentsOpen(false);
    setAccessoriesOpen(false);
    setProfileOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50 relative">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold text-yellow-400 hover:text-yellow-300 transition duration-200">
          TechHaven
        </Link>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Desktop Nav */}
        <div className="hidden sm:flex sm:items-center sm:space-x-8">
          {user && (
            <>
              <Link to="/" className="hover:text-yellow-400 text-lg font-medium">Home</Link>

              <div
                className="relative"
                onMouseEnter={() => {
                  clearTimeout(productsTimeout);
                  setProductsOpen(true);
                }}
                onMouseLeave={() => {
                  const timeout = setTimeout(() => {
                    setProductsOpen(false);
                    setComponentsOpen(false);
                    setAccessoriesOpen(false);
                  }, 200);
                  setProductsTimeout(timeout);
                }}
              >
                <button className="hover:text-yellow-400 text-lg font-medium flex items-center">
                  Products
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {productsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-gray-800 rounded-md shadow-xl z-50">
                    <Link to="/products/laptops" className="block px-4 py-2 text-white hover:bg-gray-700">Laptops</Link>

                    <div
                      className="relative"
                      onMouseEnter={() => {
                        clearTimeout(componentsTimeout);
                        setComponentsOpen(true);
                      }}
                      onMouseLeave={() => {
                        const timeout = setTimeout(() => setComponentsOpen(false), 200);
                        setComponentsTimeout(timeout);
                      }}
                    >
                      <span className="block px-4 py-2 text-white hover:bg-gray-700 cursor-pointer">Components ▸</span>
                      {componentsOpen && (
                        <div className="absolute top-0 left-full ml-1 w-56 bg-gray-800 rounded-md shadow-lg z-50">
                          <Link to="/products/components/cpu" className="block px-4 py-2 hover:bg-gray-700">CPU</Link>
                          <Link to="/products/components/gpu" className="block px-4 py-2 hover:bg-gray-700">GPU</Link>
                          <Link to="/products/components/ram" className="block px-4 py-2 hover:bg-gray-700">RAM</Link>
                          <Link to="/products/components/motherboard" className="block px-4 py-2 hover:bg-gray-700">Motherboard</Link>
                          <Link to="/products/components/psu" className="block px-4 py-2 hover:bg-gray-700">PSU</Link>
                          <Link to="/products/components/storage" className="block px-4 py-2 hover:bg-gray-700">Storage</Link>
                          <Link to="/products/components/pc-case" className="block px-4 py-2 hover:bg-gray-700">PC Case</Link>
                          <Link to="/products/components/cooler" className="block px-4 py-2 hover:bg-gray-700">Cooler</Link>
                        </div>
                      )}
                    </div>

                    <div
                      className="relative"
                      onMouseEnter={() => {
                        clearTimeout(accessoriesTimeout);
                        setAccessoriesOpen(true);
                      }}
                      onMouseLeave={() => {
                        const timeout = setTimeout(() => setAccessoriesOpen(false), 200);
                        setAccessoriesTimeout(timeout);
                      }}
                    >
                      <span className="block px-4 py-2 text-white hover:bg-gray-700 cursor-pointer">Accessories ▸</span>
                      {accessoriesOpen && (
                        <div className="absolute top-0 left-full ml-1 w-56 bg-gray-800 rounded-md shadow-lg z-50">
                          <Link to="/products/accessories/keyboard" className="block px-4 py-2 hover:bg-gray-700">Keyboard</Link>
                          <Link to="/products/accessories/mouse" className="block px-4 py-2 hover:bg-gray-700">Mouse</Link>
                          <Link to="/products/accessories/monitor" className="block px-4 py-2 hover:bg-gray-700">Monitor</Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <Link to="/contact" className="hover:text-yellow-400 text-lg font-medium">Contact</Link>
            </>
          )}

          {user && (
            <Link
              to="/cart"
              className="relative px-5 py-2 rounded-full bg-yellow-400 text-gray-900 font-semibold text-sm ml-5 hover:bg-yellow-300 transition"
            >
              🛒 Cart
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>
          )}

          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-1 hover:text-yellow-400"
              >
                <UserCircle2 className="w-7 h-7" />
                <ChevronDown className="w-4 h-4" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-50 animate-fadeIn">
                  <div className="px-4 py-2 text-gray-300">
                    Hi, <span className="text-yellow-400">{getUsername()}</span>
                  </div>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-sm hover:bg-gray-700 text-white"
                  >
                    Past Orders
                  </Link>
                  {user.role === "admin" && (
                    <Link
                      to="/admin/dashboard"
                      className="block px-4 py-2 text-sm text-green-400 hover:bg-gray-700"
                    >
                      Admin Page
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium">
                Login
              </Link>
              <Link
                to="/register"
                className="border border-white px-4 py-2 rounded-md text-sm font-medium hover:bg-white hover:text-gray-900 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Slide Menu */}
      <div className="sm:hidden">
        <div
          className={`fixed top-16 left-0 w-64 h-full bg-gray-900 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col p-4 space-y-4">
            {user && (
              <>
                <Link to="/" className="text-white hover:text-yellow-400 text-lg font-medium">Home</Link>

                <span className="text-white font-medium">Products</span>
                <Link to="/products/laptops" className="text-sm pl-4 text-gray-300 hover:text-yellow-400">Laptops</Link>

                <span className="text-sm pl-4 text-gray-300">Components</span>
                <div className="pl-6 flex flex-col space-y-1">
                  <Link to="/products/components/cpu" className="text-gray-300 hover:text-yellow-400">CPU</Link>
                  <Link to="/products/components/gpu" className="text-gray-300 hover:text-yellow-400">GPU</Link>
                  <Link to="/products/components/ram" className="text-gray-300 hover:text-yellow-400">RAM</Link>
                  <Link to="/products/components/motherboard" className="text-gray-300 hover:text-yellow-400">Motherboard</Link>
                  <Link to="/products/components/psu" className="text-gray-300 hover:text-yellow-400">PSU</Link>
                  <Link to="/products/components/storage" className="text-gray-300 hover:text-yellow-400">Storage</Link>
                  <Link to="/products/components/pc-case" className="text-gray-300 hover:text-yellow-400">PC Case</Link>
                  <Link to="/products/components/cooler" className="text-gray-300 hover:text-yellow-400">Cooler</Link>
                </div>

                <span className="text-sm pl-4 text-gray-300">Accessories</span>
                <div className="pl-6 flex flex-col space-y-1">
                  <Link to="/products/accessories/keyboard" className="text-gray-300 hover:text-yellow-400">Keyboard</Link>
                  <Link to="/products/accessories/mouse" className="text-gray-300 hover:text-yellow-400">Mouse</Link>
                  <Link to="/products/accessories/monitor" className="text-gray-300 hover:text-yellow-400">Monitor</Link>
                </div>

                <Link to="/contact" className="text-white hover:text-yellow-400 text-lg font-medium">Contact</Link>
                <Link to="/orders" className="text-white hover:text-yellow-400 text-lg font-medium">Past Orders</Link>

                {user.role === "admin" && (
                  <Link to="/admin/dashboard" className="text-green-500 hover:text-green-400 text-lg font-medium">Admin Page</Link>
                )}
                <button onClick={handleLogout} className="text-red-400 hover:text-red-300 text-left">Logout</button>
              </>
            )}

            {!user && (
              <>
                <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="border border-white px-4 py-2 rounded-md text-sm font-medium hover:bg-white hover:text-gray-900 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
