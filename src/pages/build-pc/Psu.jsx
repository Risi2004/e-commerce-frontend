const psu = [
    // 💸 Entry-Level (for i5/Ryzen 5 + RTX 3050/3060)
    {
        name: "500W Bronze (Cooler Master MWE V2)",
        price: 55,
        image: "/images/psu/500W Bronze (Cooler Master MWE V2).jpg",
        wattage: 500,
        efficiency: "Bronze",
        modular: false
    },
    {
        name: "600W Bronze (Thermaltake Smart)",
        price: 65,
        image: "/images/psu/600W Bronze (Thermaltake Smart).jpg",
        wattage: 600,
        efficiency: "Bronze",
        modular: false
    },

    // ✅ Mid-Range (i7/Ryzen 7 + RTX 3060–4070)
    {
        name: "650W Bronze (EVGA 80+ Bronze)",
        price: 75,
        image: "/images/psu/650W Bronze (EVGA 80+ Bronze).jpg",
        wattage: 650,
        efficiency: "Bronze",
        modular: false
    },
    {
        name: "750W Gold (Corsair RM750x)",
        price: 100,
        image: "/images/psu/750W Gold (Corsair RM750x).jpg",
        wattage: 750,
        efficiency: "Gold",
        modular: true
    },
    {
        name: "750W Gold (Seasonic FOCUS GX)",
        price: 110,
        image: "/images/psu/750W Gold (Seasonic FOCUS GX).webp",
        wattage: 750,
        efficiency: "Gold",
        modular: true
    },

    // 🔥 High-End Gaming (i9/Ryzen 9 + RTX 4080)
    {
        name: "850W Platinum (Cooler Master V850 SFX)",
        price: 130,
        image: "/images/psu/850W Platinum (Cooler Master V850 SFX).jpg",
        wattage: 850,
        efficiency: "Platinum",
        modular: true
    },
    {
        name: "850W Gold (Corsair RM850x)",
        price: 125,
        image: "/images/psu/850W Gold (Corsair RM850x).jpg",
        wattage: 850,
        efficiency: "Gold",
        modular: true
    },

    // 🚀 4090 & AI Build Ready
    {
        name: "1000W Gold (MSI MPG A1000G)",
        price: 160,
        image: "/images/psu/1000W Gold (MSI MPG A1000G).webp",
        wattage: 1000,
        efficiency: "Gold",
        modular: true
    },
    {
        name: "1200W Platinum (ASUS ROG Thor II)",
        price: 240,
        image: "/images/psu/1200W Platinum (ASUS ROG Thor II).jpg",
        wattage: 1200,
        efficiency: "Platinum",
        modular: true
    }
];

export default psu;
