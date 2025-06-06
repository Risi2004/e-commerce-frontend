const laptopsData = [
  {
    id: 1,
    name: "Asus ROG Strix G17",
    brand: "Asus",
    price: 2966,
    ram: "8GB LPDDR5",
    cpu: "AMD Ryzen 9 7945HX",
    image: "/images/laptops/asus-rog-strix-g17.jpg",
    gpu: "Intel Iris Xe",
    storage: "1TB NVMe SSD",
    screen: "14 inch OLED",
  },
  {
    id: 2,
    name: "Asus ROG Strix G17",
    brand: "Asus",
    price: 1986,
    ram: "16GB DDR5",
    cpu: "Apple M2",
    image: "/images/laptops/asus-rog-strix-g17.jpg",
    gpu: "AMD Radeon 780M",
    storage: "2TB NVMe SSD",
    screen: "13.6 inch Liquid Retina",
  },
  {
    id: 3,
    name: "MSI Stealth 15M",
    brand: "MSI",
    price: 2828,
    ram: "32GB DDR5",
    cpu: "Intel Core i5-13400H",
    image: "/images/laptops/msi-stealth-15m.jpg",
    gpu: "Apple 10-core GPU",
    storage: "512GB NVMe SSD",
    screen: "13.6 inch Liquid Retina",
  },
  {
    id: 4,
    name: "Lenovo Legion 5 Pro",
    brand: "Lenovo",
    price: 1347,
    ram: "32GB DDR5",
    cpu: "Intel Core i9-13980HX",
    image: "/images/laptops/lenovo-legion-5-pro.jpg",
    gpu: "Intel Iris Xe",
    storage: "2TB NVMe SSD",
    screen: "16 inch QHD+ 240Hz",
  },
  {
    id: 5,
    name: "Apple MacBook Pro M2",
    brand: "Apple",
    price: 1686,
    ram: "32GB DDR5",
    cpu: "Intel Core i7-13700H",
    image: "/images/laptops/apple-macbook-pro-m2.jpg",
    gpu: "NVIDIA GeForce RTX 4060",
    storage: "1TB NVMe SSD",
    screen: "13.6 inch Liquid Retina",
  },
  {
    id: 6,
    name: "Apple MacBook Pro M2",
    brand: "Apple",
    price: 1294,
    ram: "16GB DDR5",
    cpu: "AMD Ryzen 7 7840HS",
    image: "/images/laptops/apple-macbook-pro-m2.jpg",
    gpu: "Apple 10-core GPU",
    storage: "512GB NVMe SSD",
    screen: "14 inch OLED",
  },
  {
    id: 7,
    name: "Microsoft Surface Laptop 5",
    brand: "Microsoft",
    price: 1684,
    ram: "16GB DDR5",
    cpu: "Intel Core i7-13700H",
    image: "/images/laptops/microsoft-surface-laptop-5.jpg",
    gpu: "NVIDIA GeForce RTX 4050",
    storage: "2TB NVMe SSD",
    screen: "14 inch OLED",
  },
  {
    id: 8,
    name: "Apple MacBook Pro M2",
    brand: "Apple",
    price: 2593,
    ram: "32GB DDR5",
    cpu: "Intel Core i5-13400H",
    image: "/images/laptops/apple-macbook-pro-m2.jpg",
    gpu: "AMD Radeon 780M",
    storage: "1TB NVMe SSD",
    screen: "15.6 inch FHD 144Hz",
  },
  {
    id: 9,
    name: "Microsoft Surface Laptop 5",
    brand: "Microsoft",
    price: 1440,
    ram: "32GB DDR5",
    cpu: "Apple M3",
    image: "/images/laptops/microsoft-surface-laptop-5.jpg",
    gpu: "NVIDIA GeForce RTX 4050",
    storage: "512GB NVMe SSD",
    screen: "16 inch QHD+ 240Hz",
  },
  {
    id: 10,
    name: "Samsung Galaxy Book3 Pro",
    brand: "Samsung",
    price: 1459,
    ram: "8GB LPDDR5",
    cpu: "AMD Ryzen 9 7945HX",
    image: "/images/laptops/samsung-galaxy-book3-pro.jpg",
    gpu: "NVIDIA GeForce RTX 4080",
    storage: "512GB NVMe SSD",
    screen: "15.6 inch FHD 144Hz",
  },
  {
    id: 11,
    name: "Dell XPS 15",
    brand: "Dell",
    price: 2107,
    ram: "16GB DDR5",
    cpu: "Apple M3",
    image: "/images/laptops/dell-xps-15.jpg",
    gpu: "NVIDIA GeForce RTX 4070",
    storage: "1TB NVMe SSD",
    screen: "13.6 inch Liquid Retina",
  },
  {
    id: 12,
    name: "Samsung Galaxy Book3 Pro",
    brand: "Samsung",
    price: 1000,
    ram: "16GB DDR5",
    cpu: "Intel Core i9-13980HX",
    image: "/images/laptops/samsung-galaxy-book3-pro.jpg",
    gpu: "AMD Radeon 780M",
    storage: "1TB NVMe SSD",
    screen: "15.6 inch FHD 144Hz",
  },
  {
    id: 13,
    name: "MSI Stealth 15M",
    brand: "MSI",
    price: 2360,
    ram: "8GB LPDDR5",
    cpu: "AMD Ryzen 5 7640HS",
    image: "/images/laptops/msi-stealth-15m.jpg",
    gpu: "NVIDIA GeForce RTX 4080",
    storage: "2TB NVMe SSD",
    screen: "14 inch OLED",
  },
  {
    id: 14,
    name: "HP Spectre x360",
    brand: "HP",
    price: 2666,
    ram: "32GB DDR5",
    cpu: "AMD Ryzen 9 7945HX",
    image: "/images/laptops/hp-spectre-x360.jpg",
    gpu: "NVIDIA GeForce RTX 4070",
    storage: "2TB NVMe SSD",
    screen: "14 inch OLED",
  },
  {
    id: 15,
    name: "Acer Predator Helios 300",
    brand: "Acer",
    price: 2741,
    ram: "32GB DDR5",
    cpu: "Intel Core i7-13700H",
    image: "/images/laptops/acer-predator-helios-300.jpg",
    gpu: "Apple 10-core GPU",
    storage: "1TB NVMe SSD",
    screen: "17.3 inch UHD 120Hz",
  },
  {
    id: 16,
    name: "HP Spectre x360",
    brand: "HP",
    price: 1194,
    ram: "32GB DDR5",
    cpu: "AMD Ryzen 7 7840HS",
    image: "/images/laptops/hp-spectre-x360.jpg",
    gpu: "NVIDIA GeForce RTX 4080",
    storage: "2TB NVMe SSD",
    screen: "14 inch OLED",
  },
  {
    id: 17,
    name: "Samsung Galaxy Book3 Pro",
    brand: "Samsung",
    price: 2975,
    ram: "16GB DDR5",
    cpu: "Apple M2",
    image: "/images/laptops/samsung-galaxy-book3-pro.jpg",
    gpu: "Intel Iris Xe",
    storage: "2TB NVMe SSD",
    screen: "15.6 inch FHD 144Hz",
  },
  {
    id: 18,
    name: "Asus ROG Strix G17",
    brand: "Asus",
    price: 2517,
    ram: "8GB LPDDR5",
    cpu: "Apple M2",
    image: "/images/laptops/asus-rog-strix-g17.jpg",
    gpu: "NVIDIA GeForce RTX 4080",
    storage: "1TB NVMe SSD",
    screen: "15.6 inch FHD 144Hz",
  },
  {
    id: 19,
    name: "Dell XPS 15",
    brand: "Dell",
    price: 1184,
    ram: "32GB DDR5",
    cpu: "AMD Ryzen 7 7840HS",
    image: "/images/laptops/dell-xps-15.jpg",
    gpu: "NVIDIA GeForce RTX 4050",
    storage: "512GB NVMe SSD",
    screen: "15.6 inch FHD 144Hz",
  },
  {
    id: 20,
    name: "Acer Predator Helios 300",
    brand: "Acer",
    price: 2312,
    ram: "32GB DDR5",
    cpu: "AMD Ryzen 9 7945HX",
    image: "/images/laptops/acer-predator-helios-300.jpg",
    gpu: "NVIDIA GeForce RTX 4070",
    storage: "512GB NVMe SSD",
    screen: "15.6 inch FHD 144Hz",
  },
  {
    id: 21,
    name: "MSI Stealth 15M",
    brand: "MSI",
    price: 1870,
    ram: "8GB LPDDR5",
    cpu: "AMD Ryzen 9 7945HX",
    image: "/images/laptops/msi-stealth-15m.jpg",
    gpu: "Intel Iris Xe",
    storage: "2TB NVMe SSD",
    screen: "16 inch QHD+ 240Hz",
  },
  {
    id: 22,
    name: "Acer Predator Helios 300",
    brand: "Acer",
    price: 1572,
    ram: "32GB DDR5",
    cpu: "Intel Core i7-13700H",
    image: "/images/laptops/acer-predator-helios-300.jpg",
    gpu: "NVIDIA GeForce RTX 4050",
    storage: "2TB NVMe SSD",
    screen: "15.6 inch FHD 144Hz",
  },
  {
    id: 23,
    name: "Samsung Galaxy Book3 Pro",
    brand: "Samsung",
    price: 1803,
    ram: "16GB DDR5",
    cpu: "Intel Core i5-13400H",
    image: "/images/laptops/samsung-galaxy-book3-pro.jpg",
    gpu: "Apple 10-core GPU",
    storage: "2TB NVMe SSD",
    screen: "14 inch OLED",
  },
  {
    id: 24,
    name: "Asus ROG Strix G17",
    brand: "Asus",
    price: 2004,
    ram: "16GB DDR5",
    cpu: "Apple M3",
    image: "/images/laptops/asus-rog-strix-g17.jpg",
    gpu: "Intel Iris Xe",
    storage: "1TB NVMe SSD",
    screen: "17.3 inch UHD 120Hz",
  },
  {
    id: 25,
    name: "Samsung Galaxy Book3 Pro",
    brand: "Samsung",
    price: 2152,
    ram: "32GB DDR5",
    cpu: "AMD Ryzen 5 7640HS",
    image: "/images/laptops/samsung-galaxy-book3-pro.jpg",
    gpu: "Apple 10-core GPU",
    storage: "1TB NVMe SSD",
    screen: "15.6 inch FHD 144Hz",
  },
  {
    id: 26,
    name: "Microsoft Surface Laptop 5",
    brand: "Microsoft",
    price: 2246,
    ram: "32GB DDR5",
    cpu: "Apple M2",
    image: "/images/laptops/microsoft-surface-laptop-5.jpg",
    gpu: "NVIDIA GeForce RTX 4060",
    storage: "1TB NVMe SSD",
    screen: "16 inch QHD+ 240Hz",
  },
  {
    id: 27,
    name: "Asus ROG Strix G17",
    brand: "Asus",
    price: 1361,
    ram: "32GB DDR5",
    cpu: "AMD Ryzen 9 7945HX",
    image: "/images/laptops/asus-rog-strix-g17.jpg",
    gpu: "NVIDIA GeForce RTX 4080",
    storage: "512GB NVMe SSD",
    screen: "13.6 inch Liquid Retina",
  },
  {
    id: 28,
    name: "Asus ROG Strix G17",
    brand: "Asus",
    price: 2620,
    ram: "16GB DDR5",
    cpu: "Apple M2",
    image: "/images/laptops/asus-rog-strix-g17.jpg",
    gpu: "NVIDIA GeForce RTX 4080",
    storage: "1TB NVMe SSD",
    screen: "16 inch QHD+ 240Hz",
  },
  {
    id: 29,
    name: "MSI Stealth 15M",
    brand: "MSI",
    price: 1159,
    ram: "8GB LPDDR5",
    cpu: "AMD Ryzen 9 7945HX",
    image: "/images/laptops/msi-stealth-15m.jpg",
    gpu: "AMD Radeon 780M",
    storage: "512GB NVMe SSD",
    screen: "16 inch QHD+ 240Hz",
  },
  {
    id: 30,
    name: "Samsung Galaxy Book3 Pro",
    brand: "Samsung",
    price: 2633,
    ram: "16GB DDR5",
    cpu: "AMD Ryzen 7 7840HS",
    image: "/images/laptops/samsung-galaxy-book3-pro.jpg",
    gpu: "NVIDIA GeForce RTX 4070",
    storage: "2TB NVMe SSD",
    screen: "16 inch QHD+ 240Hz",
  },
  {
    id: 31,
    name: "HP Spectre x360",
    brand: "HP",
    price: 1527,
    ram: "32GB DDR5",
    cpu: "AMD Ryzen 9 7945HX",
    image: "/images/laptops/hp-spectre-x360.jpg",
    gpu: "Apple 10-core GPU",
    storage: "2TB NVMe SSD",
    screen: "17.3 inch UHD 120Hz",
  },
  {
    id: 32,
    name: "Dell XPS 15",
    brand: "Dell",
    price: 1137,
    ram: "16GB DDR5",
    cpu: "Intel Core i7-13700H",
    image: "/images/laptops/dell-xps-15.jpg",
    gpu: "AMD Radeon 780M",
    storage: "1TB NVMe SSD",
    screen: "15.6 inch FHD 144Hz",
  },
  {
    id: 33,
    name: "MSI Stealth 15M",
    brand: "MSI",
    price: 2098,
    ram: "8GB LPDDR5",
    cpu: "Intel Core i5-13400H",
    image: "/images/laptops/msi-stealth-15m.jpg",
    gpu: "NVIDIA GeForce RTX 4070",
    storage: "512GB NVMe SSD",
    screen: "17.3 inch UHD 120Hz",
  },
  {
    id: 34,
    name: "Acer Predator Helios 300",
    brand: "Acer",
    price: 1859,
    ram: "16GB DDR5",
    cpu: "Apple M3",
    image: "/images/laptops/acer-predator-helios-300.jpg",
    gpu: "NVIDIA GeForce RTX 4050",
    storage: "2TB NVMe SSD",
    screen: "13.6 inch Liquid Retina",
  },
  {
    id: 35,
    name: "Samsung Galaxy Book3 Pro",
    brand: "Samsung",
    price: 2736,
    ram: "32GB DDR5",
    cpu: "AMD Ryzen 5 7640HS",
    image: "/images/laptops/samsung-galaxy-book3-pro.jpg",
    gpu: "NVIDIA GeForce RTX 4080",
    storage: "512GB NVMe SSD",
    screen: "15.6 inch FHD 144Hz",
  },
  {
    id: 36,
    name: "Dell XPS 15",
    brand: "Dell",
    price: 1000,
    ram: "32GB DDR5",
    cpu: "AMD Ryzen 5 7640HS",
    image: "/images/laptops/dell-xps-15.jpg",
    gpu: "Apple 10-core GPU",
    storage: "2TB NVMe SSD",
    screen: "16 inch QHD+ 240Hz",
  },
  {
    id: 37,
    name: "Apple MacBook Pro M2",
    brand: "Apple",
    price: 2922,
    ram: "8GB LPDDR5",
    cpu: "Apple M2",
    image: "/images/laptops/apple-macbook-pro-m2.jpg",
    gpu: "Intel Iris Xe",
    storage: "512GB NVMe SSD",
    screen: "14 inch OLED",
  },
  {
    id: 38,
    name: "Asus ROG Strix G17",
    brand: "Asus",
    price: 2465,
    ram: "8GB LPDDR5",
    cpu: "AMD Ryzen 9 7945HX",
    image: "/images/laptops/asus-rog-strix-g17.jpg",
    gpu: "NVIDIA GeForce RTX 4060",
    storage: "2TB NVMe SSD",
    screen: "13.6 inch Liquid Retina",
  },
  {
    id: 39,
    name: "Microsoft Surface Laptop 5",
    brand: "Microsoft",
    price: 2468,
    ram: "32GB DDR5",
    cpu: "AMD Ryzen 9 7945HX",
    image: "/images/laptops/microsoft-surface-laptop-5.jpg",
    gpu: "AMD Radeon 780M",
    storage: "512GB NVMe SSD",
    screen: "17.3 inch UHD 120Hz",
  },
  {
    id: 40,
    name: "MSI Stealth 15M",
    brand: "MSI",
    price: 1410,
    ram: "8GB LPDDR5",
    cpu: "Intel Core i5-13400H",
    image: "/images/laptops/msi-stealth-15m.jpg",
    gpu: "NVIDIA GeForce RTX 4070",
    storage: "2TB NVMe SSD",
    screen: "16 inch QHD+ 240Hz",
  },
  {
    id: 41,
    name: "Asus ROG Strix G17",
    brand: "Asus",
    price: 2899,
    ram: "8GB LPDDR5",
    cpu: "Intel Core i7-13700H",
    image: "/images/laptops/asus-rog-strix-g17.jpg",
    gpu: "NVIDIA GeForce RTX 4060",
    storage: "1TB NVMe SSD",
    screen: "15.6 inch FHD 144Hz",
  },
  {
    id: 42,
    name: "MSI Stealth 15M",
    brand: "MSI",
    price: 2566,
    ram: "16GB DDR5",
    cpu: "Apple M2",
    image: "/images/laptops/msi-stealth-15m.jpg",
    gpu: "NVIDIA GeForce RTX 4050",
    storage: "512GB NVMe SSD",
    screen: "16 inch QHD+ 240Hz",
  },
  {
    id: 43,
    name: "MSI Stealth 15M",
    brand: "MSI",
    price: 2973,
    ram: "8GB LPDDR5",
    cpu: "Intel Core i7-13700H",
    image: "/images/laptops/msi-stealth-15m.jpg",
    gpu: "Apple 10-core GPU",
    storage: "1TB NVMe SSD",
    screen: "17.3 inch UHD 120Hz",
  },
  {
    id: 44,
    name: "Dell XPS 15",
    brand: "Dell",
    price: 1892,
    ram: "16GB DDR5",
    cpu: "AMD Ryzen 9 7945HX",
    image: "/images/laptops/dell-xps-15.jpg",
    gpu: "NVIDIA GeForce RTX 4080",
    storage: "512GB NVMe SSD",
    screen: "16 inch QHD+ 240Hz",
  },
  {
    id: 45,
    name: "Samsung Galaxy Book3 Pro",
    brand: "Samsung",
    price: 2806,
    ram: "8GB LPDDR5",
    cpu: "Intel Core i9-13980HX",
    image: "/images/laptops/samsung-galaxy-book3-pro.jpg",
    gpu: "NVIDIA GeForce RTX 4080",
    storage: "512GB NVMe SSD",
    screen: "15.6 inch FHD 144Hz",
  },
  {
    id: 46,
    name: "Asus ROG Strix G17",
    brand: "Asus",
    price: 1394,
    ram: "8GB LPDDR5",
    cpu: "Intel Core i7-13700H",
    image: "/images/laptops/asus-rog-strix-g17.jpg",
    gpu: "AMD Radeon 780M",
    storage: "1TB NVMe SSD",
    screen: "15.6 inch FHD 144Hz",
  },
  {
    id: 47,
    name: "Lenovo Legion 5 Pro",
    brand: "Lenovo",
    price: 2344,
    ram: "8GB LPDDR5",
    cpu: "Apple M2",
    image: "/images/laptops/lenovo-legion-5-pro.jpg",
    gpu: "Intel Iris Xe",
    storage: "1TB NVMe SSD",
    screen: "17.3 inch UHD 120Hz",
  },
  {
    id: 48,
    name: "Razer Blade 15",
    brand: "Razer",
    price: 1031,
    ram: "16GB DDR5",
    cpu: "Intel Core i9-13980HX",
    image: "/images/laptops/razer-blade-15.jpg",
    gpu: "NVIDIA GeForce RTX 4080",
    storage: "1TB NVMe SSD",
    screen: "15.6 inch FHD 144Hz",
  },
  {
    id: 49,
    name: "HP Spectre x360",
    brand: "HP",
    price: 1554,
    ram: "8GB LPDDR5",
    cpu: "Intel Core i5-13400H",
    image: "/images/laptops/hp-spectre-x360.jpg",
    gpu: "NVIDIA GeForce RTX 4070",
    storage: "512GB NVMe SSD",
    screen: "15.6 inch FHD 144Hz",
  },
  {
    id: 50,
    name: "Samsung Galaxy Book3 Pro",
    brand: "Samsung",
    price: 1504,
    ram: "8GB LPDDR5",
    cpu: "Intel Core i7-13700H",
    image: "/images/laptops/samsung-galaxy-book3-pro.jpg",
    gpu: "NVIDIA GeForce RTX 4050",
    storage: "2TB NVMe SSD",
    screen: "14 inch OLED",
  },
    {
    id: 51,
    name: "Samsung Galaxy Book3 Pro",
    brand: "Samsung",
    price: 1504,
    ram: "8GB LPDDR5",
    cpu: "Intel Core i7-13700H",
    image: "/images/laptops/samsung-galaxy-book3-pro.jpg",
    gpu: "NVIDIA GeForce RTX 4050",
    storage: "2TB NVMe SSD",
    screen: "14 inch OLED",
  },
];

export default laptopsData