const router = require("express").Router();
const Sales = require("../models/SalesModel");

// SUMMARY
router.get("/summary", async (req, res) => {
  const { start, end } = req.query;

  const data = await Sales.aggregate([
    { $match: { date: { $gte: new Date(start), $lte: new Date(end) } } },
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

  res.json(data[0]);
});

// TABLE
router.get("/table", async (req, res) => {
  const { start, end } = req.query;

  const data = await Sales.aggregate([
    { $match: { date: { $gte: new Date(start), $lte: new Date(end) } } },
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
router.get("/chart", async (req, res) => {
  const { shoe, start, end } = req.query;

  const data = await Sales.find({
    shoeName: shoe,
    date: { $gte: new Date(start), $lte: new Date(end) }
  }).sort({ date: 1 });

  res.json(data);
});

module.exports = router;