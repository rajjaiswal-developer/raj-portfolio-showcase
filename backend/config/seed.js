const User = require("../models/User");
const { Project } = require("../models/index");
const Product = require("../models/Product");

const seedAdmin = async () => {
  try {
    // ── ADMIN USER ───────────────────────────────────────────
    const adminExists = await User.findOne({ role: "admin" });
    if (!adminExists) {
      if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
        console.error(
          "❌ ADMIN_EMAIL / ADMIN_PASSWORD not set — skipping admin seed.",
        );
      } else {
        await User.create({
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
          role: "admin",
        });
        console.log("✅ Admin seeded");
      }
    }
    // const adminExists = await User.findOne({ role: 'admin' });
    // if (!adminExists) {
    //   await User.create({
    //     email: process.env.ADMIN_EMAIL || 'admin@rajjaiswal.dev',
    //     password: process.env.ADMIN_PASSWORD || 'Admin@1234',
    //     role: 'admin'
    //   });
    //   console.log('✅ Admin seeded');
    // }

    // ── PROJECTS (from real GitHub repos) ───────────────────
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany([
        {
          title: "Customer Personality Analysis",
          description:
            "Data cleaning and preprocessing pipeline on a marketing dataset — selecting relevant features, handling missing/invalid values, and formatting data for ML pipelines.",
          techStack: ["Python", "Pandas", "NumPy", "Matplotlib", "Jupyter"],
          githubUrl:
            "https://github.com/rajjaiswal-developer/Data_Analyst-Task-1",
          category: "data",
          isFeatured: true,
          order: 1,
        },
        {
          title: "Superstore Sales Dashboard",
          description:
            "Interactive Power BI dashboard analyzing Superstore sales data — charts for sales trends, regional profit, top products, and discount impact with dynamic filters.",
          techStack: ["Power BI", "DAX", "Excel", "Data Visualization"],
          githubUrl:
            "https://github.com/rajjaiswal-developer/Data_Analyst-Task-2",
          category: "data",
          isFeatured: true,
          order: 2,
        },
        {
          title: "eCommerce SQL Database",
          description:
            "Complete eCommerce database with Oracle SQL featuring data insertion, joins, aggregate functions, and analytical queries for business insights.",
          techStack: ["Oracle SQL", "PL/SQL", "Database Design"],
          githubUrl:
            "https://github.com/rajjaiswal-developer/Data_Analyst-Task-3",
          category: "data",
          isFeatured: false,
          order: 3,
        },
        {
          title: "Titanic Survival EDA",
          description:
            "Exploratory Data Analysis on the Titanic dataset uncovering survival patterns using statistical analysis and rich data visualizations.",
          techStack: ["Python", "Pandas", "Seaborn", "Matplotlib", "Jupyter"],
          githubUrl:
            "https://github.com/rajjaiswal-developer/Data_Analyst-Task-5",
          category: "data",
          isFeatured: false,
          order: 4,
        },
        {
          title: "Donation Connect Platform",
          description:
            "A full web platform connecting blood/organ donors with receivers, featuring real-time listings, search by blood group, and donor registration system.",
          techStack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
          category: "web",
          isFeatured: true,
          order: 5,
        },
        {
          title: "Unity 2D/3D Game Projects",
          description:
            "Collection of 2D and 3D game prototypes developed during internship at Work & Work Studios — includes player controllers, weapon systems, NPC AI, and physics interactions.",
          techStack: [
            "Unity Engine",
            "C#",
            "Gameplay Logic",
            "Animation",
            "Physics",
          ],
          category: "other",
          isFeatured: true,
          order: 6,
        },
      ]);
      console.log("✅ Projects seeded");
    }

    // ── PRODUCTS ─────────────────────────────────────────────
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      await Product.insertMany([
        {
          name: "Logitech MX Master 3S",
          description:
            "The MX Master 3S is the ultimate productivity mouse with ultra-fast MagSpeed scrolling, 8K DPI precision, and near-silent clicking experience. Perfect for developers and designers.",
          shortDescription: "Ultra-precise wireless productivity mouse",
          price: 7995,
          comparePrice: 9999,
          category: "mouse",
          productType: "affiliate",
          affiliateLink: "https://www.amazon.in/dp/B09HM94VDS",
          affiliatePlatform: "Amazon",
          tags: ["wireless", "productivity", "ergonomic"],
          isFeatured: true,
          isActive: true,
          specifications: [
            { key: "Sensor", value: "Darkfield 8000 DPI" },
            { key: "Battery", value: "Rechargeable, 70 days" },
            { key: "Connectivity", value: "Bluetooth, 2.4GHz" },
          ],
        },
        {
          name: "Keychron K2 Mechanical Keyboard",
          description:
            "Compact TKL wireless mechanical keyboard with multiple backlight options, Bluetooth 5.1, and compatibility with Mac and Windows. A favourite among developers.",
          shortDescription: "Compact wireless mechanical keyboard",
          price: 6499,
          comparePrice: 7500,
          category: "keyboard",
          productType: "affiliate",
          affiliateLink: "https://www.amazon.in/dp/B09B5N1Z2J",
          affiliatePlatform: "Amazon",
          tags: ["mechanical", "wireless", "compact"],
          isFeatured: true,
          isActive: true,
          specifications: [
            { key: "Switch", value: "Gateron G Pro Red" },
            { key: "Connectivity", value: "Bluetooth 5.1, USB-C" },
            { key: "Battery", value: "4000mAh" },
          ],
        },
        {
          name: "Sony WH-1000XM5 Headphones",
          description:
            "Industry-leading noise canceling headphones with exceptional sound quality, crystal clear hands-free calling, and 30-hour battery life.",
          shortDescription: "Premium noise-canceling wireless headphones",
          price: 26990,
          comparePrice: 34990,
          category: "headphones",
          productType: "affiliate",
          affiliateLink: "https://www.amazon.in/dp/B0BXN8JGYB",
          affiliatePlatform: "Amazon",
          tags: ["noise-canceling", "wireless", "premium"],
          isFeatured: true,
          isActive: true,
          specifications: [
            { key: "Battery", value: "30 hours" },
            { key: "ANC", value: "Industry-leading" },
            { key: "Driver", value: "30mm" },
          ],
        },
        {
          name: "NodeMCU ESP8266 IoT Starter Kit",
          description:
            "Complete IoT development starter kit with ESP8266 WiFi module, sensors (DHT11, PIR), breadboard, LEDs, and jumper wires — perfect for smart home and automation projects.",
          shortDescription: "Complete ESP8266 IoT development kit",
          price: 799,
          comparePrice: 1299,
          category: "iot",
          productType: "self",
          stock: 25,
          sku: "IOT-ESP8266-KIT",
          tags: ["iot", "esp8266", "starter kit", "arduino"],
          isFeatured: true,
          isActive: true,
          specifications: [
            { key: "MCU", value: "ESP8266 NodeMCU" },
            { key: "Includes", value: "DHT11, PIR, LEDs, Breadboard" },
            { key: "WiFi", value: "802.11 b/g/n" },
          ],
        },
        {
          name: "Raspberry Pi 4 (4GB) Starter Pack",
          description:
            "Raspberry Pi 4 Model B 4GB kit with case, power supply, 32GB SD card with Raspberry Pi OS, and HDMI cable. Build servers, media centers, or IoT projects.",
          shortDescription: "Raspberry Pi 4 complete starter bundle",
          price: 6499,
          comparePrice: 7999,
          category: "iot",
          productType: "affiliate",
          affiliateLink: "https://www.amazon.in/dp/B09TTNF8BT",
          affiliatePlatform: "Amazon",
          tags: ["raspberry pi", "linux", "iot", "server"],
          isFeatured: false,
          isActive: true,
          specifications: [
            { key: "RAM", value: "4GB LPDDR4" },
            { key: "Processor", value: "Quad-core Cortex-A72" },
            {
              key: "Connectivity",
              value: "WiFi, BT, USB 3.0, Gigabit Ethernet",
            },
          ],
        },
        {
          name: "USB Type-C Hub 7-in-1",
          description:
            "Multi-port USB-C hub with 4K HDMI, 3x USB 3.0, SD/TF card reader, and 100W PD charging — compatible with MacBook, Windows, and Android devices.",
          shortDescription: "7-in-1 USB-C hub with 4K HDMI",
          price: 1299,
          comparePrice: 2499,
          category: "accessories",
          productType: "affiliate",
          affiliateLink: "https://www.amazon.in/dp/B09XLP6H5R",
          affiliatePlatform: "Amazon",
          tags: ["usb-c", "hub", "hdmi", "accessories"],
          isFeatured: false,
          isActive: true,
          specifications: [
            { key: "Ports", value: "3x USB 3.0, HDMI, SD, TF, PD" },
            { key: "HDMI", value: "4K@30Hz" },
            { key: "PD Charging", value: "100W pass-through" },
          ],
        },
      ]);
      console.log("✅ Products seeded");
    }
  } catch (err) {
    console.error("Seed error:", err.message);
  }
};

module.exports = { seedAdmin };
