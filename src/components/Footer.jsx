import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-12">
          {/* Brand */}
          <div className="space-y-3">
            <h2 className="text-2xl font-extrabold text-yellow-400">TechHaven</h2>
            <p className="text-sm text-gray-400">
              Your ultimate destination for top-tier PC components and custom builds.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-yellow-300">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
              <li><Link to="/products/laptops" className="hover:text-yellow-400">Laptops</Link></li>
              <li><Link to="/build-pc" className="hover:text-yellow-400">Build Your PC</Link></li>
              <li><Link to="/orders" className="hover:text-yellow-400">My Orders</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-yellow-300">Follow Us</h3>
            <div className="flex space-x-4 text-gray-300">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-yellow-400">
                <FaFacebookF size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-yellow-400">
                <FaInstagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-yellow-400">
                <FaLinkedinIn size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-yellow-400">
                <FaGithub size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} TechHaven. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
