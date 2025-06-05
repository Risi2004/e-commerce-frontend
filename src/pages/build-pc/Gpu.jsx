const gpu = [
    // ✅ For Mid-Tier CPUs (i5-13400F, Ryzen 5 5600X)
    {
        name: "NVIDIA RTX 3060",
        price: 370,
        image: "/images/gpu/NVIDIA RTX 3060.webp",
        recommendedFor: ["Intel Core i5 13400F", "AMD Ryzen 5 5600X"]
    },
    {
        name: "AMD RX 6600 XT",
        price: 320,
        image: "/images/gpu/AMD RX 6600 XT.png",
        recommendedFor: ["Intel Core i5 13400F", "AMD Ryzen 5 5600X"]
    },

    // ✅ For High-Tier CPUs (i7-13700K, Ryzen 7 5800X, i7-14700K)
    {
        name: "NVIDIA RTX 4070",
        price: 580,
        image: "/images/gpu/NVIDIA RTX 4070.png",
        recommendedFor: ["Intel Core i7 13700K", "AMD Ryzen 7 5800X", "Intel Core i7 14700K"]
    },
    {
        name: "AMD RX 6750 XT",
        price: 500,
        image: "/images/gpu/AMD RX 6750 XT.png",
        recommendedFor: ["Intel Core i7 13700K", "AMD Ryzen 7 5800X", "Intel Core i7 14700K"]
    },

    // ✅ For Ultra-High CPUs (i9-13900K, 14900K, Ryzen 9 7900X/7950X3D)
    {
        name: "NVIDIA RTX 4080",
        price: 950,
        image: "/images/gpu/NVIDIA RTX 4080.webp",
        recommendedFor: ["Intel Core i9 13900K", "Intel Core i9 14900K", "AMD Ryzen 9 7900X", "AMD Ryzen 9 7950X3D"]
    },
    {
        name: "AMD RX 7900 XT",
        price: 620,
        image: "/images/gpu/AMD RX 7900 XT.png",
        recommendedFor: ["Intel Core i9 13900K", "Intel Core i9 14900K", "AMD Ryzen 9 7900X", "AMD Ryzen 9 7950X3D"]
    },
    {
        name: "AMD RX 7900 XTX",
        price: 880,
        image: "/images/gpu/AMD RX 7900 XTX.png",
        recommendedFor: ["Intel Core i9 13900K", "Intel Core i9 14900K", "AMD Ryzen 9 7900X", "AMD Ryzen 9 7950X3D"]
    },

    // 🔄 Entry-Level Compatible with Most CPUs
    {
        name: "NVIDIA RTX 3050",
        price: 270,
        image: "/images/gpu/NVIDIA RTX 3050.jpg",
        recommendedFor: [
            "Intel Core i5 13400F", "Intel Core i7 13700K", "AMD Ryzen 5 5600X",
            "Intel Core i7 14700K", "AMD Ryzen 7 5800X", "Intel Core i9 13900K"
        ]
    },

    {
        name: "NVIDIA RTX 4090 D",
        price: 1600,
        image: "/images/gpu/NVIDIA RTX 4090 D.jpg",
        recommendedFor: ["Intel Core i9 14900K", "AMD Ryzen 9 7950X3D"]
    }
];

export default gpu;
