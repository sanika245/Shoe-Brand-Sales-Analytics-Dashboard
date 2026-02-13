const mongoose = require("mongoose");
require("dotenv").config();
const Sales = require("./models/SalesModel");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log("Connected for Seeding");

  await Sales.deleteMany({});

  await Sales.insertMany([
    {
      shoeName: "Nike Air Max",
      date: new Date("2026-01-01"),
      sales: 120,
      advertisingCost: 60,
      impressions: 1500,
      clicks: 70
    },
    {
      shoeName: "Nike Air Max",
      date: new Date("2026-01-05"),
      sales: 200,
      advertisingCost: 80,
      impressions: 2200,
      clicks: 120
    },
    {
      shoeName: "Adidas Runner",
      date: new Date("2026-01-03"),
      sales: 150,
      advertisingCost: 55,
      impressions: 1800,
      clicks: 90
    },
    {
      shoeName: "Adidas Runner",
      date: new Date("2026-01-10"),
      sales: 300,
      advertisingCost: 100,
      impressions: 3000,
      clicks: 160
    },
    {
      shoeName: "Puma Sport",
      date: new Date("2026-01-08"),
      sales: 180,
      advertisingCost: 70,
      impressions: 2100,
      clicks: 110
    }
  ]);

  console.log("Sample Data Inserted");
  process.exit();
});

