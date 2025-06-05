const storage = [
    // ⚡ Entry-Level SSDs for boot drives
    {
        name: "256GB NVMe SSD (WD Green)",
        price: 35,
        image: "/images/storage/256GB NVMe SSD (WD Green).png",
        type: "NVMe",
        capacityGB: 256,
        interface: "PCIe",
        form: "SSD"
    },
    {
        name: "512GB NVMe SSD (Kingston A2000)",
        price: 60,
        image: "/images/storage/512GB NVMe SSD (Kingston A2000).jpg",
        type: "NVMe",
        capacityGB: 512,
        interface: "PCIe",
        form: "SSD"
    },

    // 🔥 Recommended for Modern Gaming
    {
        name: "1TB NVMe SSD (Samsung 980 Pro)",
        price: 100,
        image: "/images/storage/1TB NVMe SSD (Samsung 980 Pro).jpg",
        type: "NVMe",
        capacityGB: 1024,
        interface: "PCIe",
        form: "SSD"
    },
    {
        name: "2TB NVMe SSD (Crucial P3 Plus)",
        price: 180,
        image: "/images/storage/2TB NVMe SSD (Crucial P3 Plus).jpg",
        type: "NVMe",
        capacityGB: 2048,
        interface: "PCIe",
        form: "SSD"
    },

    // 🧠 Hybrid Setup for game libraries
    {
        name: "512GB NVMe + 2TB HDD Combo",
        price: 150,
        image: "/images/storage/512GB NVMe + 2TB HDD Combo.png",
        type: "Hybrid",
        capacityGB: 2560,
        interface: "PCIe + SATA",
        form: "Hybrid"
    },

    // 🧩 Larger SATA SSDs for game data
    {
        name: "1TB SATA SSD (Samsung 870 EVO)",
        price: 95,
        image: "/images/storage/1TB SATA SSD (Samsung 870 EVO).jpg",
        type: "SATA SSD",
        capacityGB: 1024,
        interface: "SATA",
        form: "SSD"
    },
    {
        name: "2TB SATA SSD (WD Blue 3D)",
        price: 160,
        image: "/images/storage/2TB SATA SSD (WD Blue 3D).jpg",
        type: "SATA SSD",
        capacityGB: 2048,
        interface: "SATA",
        form: "SSD"
    },

    // 🗃️ High-capacity HDDs for backup/recording
    {
        name: "2TB HDD (Seagate Barracuda)",
        price: 90,
        image: "/images/storage/2TB HDD (Seagate Barracuda).jpg",
        type: "HDD",
        capacityGB: 2048,
        interface: "SATA",
        form: "HDD"
    },
    {
        name: "4TB HDD (Toshiba X300)",
        price: 130,
        image: "/images/storage/4TB HDD (Toshiba X300).png",
        type: "HDD",
        capacityGB: 4096,
        interface: "SATA",
        form: "HDD"
    }
];

export default storage;
