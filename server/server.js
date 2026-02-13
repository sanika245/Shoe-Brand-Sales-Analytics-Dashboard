console.log("THIS IS THE RUNNING SERVER FILE");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/dashboard")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const SalesSchema = new mongoose.Schema({
  shoeName: String,
  sales: Number,
  advertisingCost: Number,
  impressions: Number,
  clicks: Number,
  date: Date
});

const Sales = mongoose.model("Sales", SalesSchema);

// TEST ROUTE
app.get("/hello", (req, res) => {
  res.send("Hello works");
});

// SUMMARY
app.get("/api/summary", async (req, res) => {
  const { start, end } = req.query;

  const data = await Sales.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(start),
          $lte: new Date(end + "T23:59:59.999Z")
        }
      }
    },
    {
      $group: {
        _id: null,
        totalSales: { $sum: "$sales" },
        totalAdCost: { $sum: "$advertisingCost" },
        totalImpressions: { $sum: "$impressions" },
        totalClicks: { $sum: "$clicks" }
      }
    }
  ]);

  res.json(data[0] || {});
});

// TABLE
app.get("/api/table", async (req, res) => {
  const { start, end } = req.query;

  const data = await Sales.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(start),
          $lte: new Date(end + "T23:59:59.999Z")
        }
      }
    },
    {
      $group: {
        _id: "$shoeName",
        sales: { $sum: "$sales" },
        advertisingCost: { $sum: "$advertisingCost" },
        impressions: { $sum: "$impressions" },
        clicks: { $sum: "$clicks" }
      }
    }
  ]);

  res.json(data);
});

// CHART
app.get("/api/chart", async (req, res) => {
  const { shoe, start, end } = req.query;

  const data = await Sales.find({
    shoeName: shoe,
    date: {
      $gte: new Date(start),
      $lte: new Date(end + "T23:59:59.999Z")
    }
  }).sort({ date: 1 });

  res.json(data);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
