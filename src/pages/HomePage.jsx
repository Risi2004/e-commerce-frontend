import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";

function HomePage() {
  const { user } = useAuth();

  const backgrounds = [
    "/images/slideshow/bg1.png",
    "/images/slideshow/bg2.png",
    "/images/slideshow/bg3.png",
    "/images/slideshow/bg4.png",
    "/images/slideshow/bg5.png",
  ];

  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section - Build Your PC */}
      <div className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">

        {/* ✅ Background Image - visible and centered */}
        {backgrounds.map((bg, i) => (
          <div
            key={i}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${i === bgIndex ? "opacity-100 z-10" : "opacity-0"
              }`}
            style={{
              backgroundImage: `url(${bg})`,
            }}
          />
        ))}

        {/* ✅ Overlay (lighter!) */}
        <div className="absolute inset-0 bg-black/30 z-20 backdrop-brightness-100"></div>

        {/* ✅ Decorative Orbs (above overlay) */}
        <div className="absolute top-[-60px] left-[-40px] w-96 h-96 bg-purple-500 opacity-20 blur-3xl rounded-full animate-blob z-30"></div>
        <div className="absolute bottom-[-80px] right-[-60px] w-80 h-80 bg-blue-400 opacity-30 blur-2xl rounded-full animate-blob z-30"></div>

        {/* ✅ Main Content */}
        <div className="relative z-40 p-10 max-w-2xl w-full text-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 drop-shadow-md">
            Build Your Dream PC
          </h1>
          <p className="text-blue-100 text-lg sm:text-xl font-medium mb-8 leading-relaxed">
            Select top-tier components. Customize every part.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="/build-pc"
              className="inline-block bg-yellow-400 text-black text-lg font-bold px-8 py-3 rounded-full shadow-lg hover:bg-yellow-300 hover:scale-105 transition transform duration-300 animate-bounce"
            >
              🚀 Start Building
            </a>

          </div>

        </div>
      </div>


      {/* Product Categories */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Explore Categories
        </h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[
            { name: "Laptops", img: "/images/laptops/cheapgaminglaptops-2048px-7981.jpg", link:"/products/laptops"},
            { name: "Keyboards", img: "/images/Accessories/Akko 3068B Plus Mechanical RGB.jpg",link:"/products/accessories/keyboard" },
            { name: "GPUs", img: "/images/gpu/AMD RX 6600 XT.png", link:"/products/components/gpu" },
            { name: "Mouse", img: "/images/Accessories/ASUS ROG Gladius III Wireless.jpg", link:"products/accessories/mouse"},
            { name: "Build Your PC", img: "/images/case/Corsair iCUE 4000X RGB.webp", link: "/build-pc" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={item.img}
                alt={item.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-700">{item.name}</h3>
                <a
                  href={item.link || `/products?category=${item.name.toLowerCase()}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  View {item.name === "Build Your PC" ? "Builder" : "Products"}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>

  );
}

export default HomePage;
