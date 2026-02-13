const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
  shoeName: String,
  date: Date,
  sales: Number,
  advertisingCost: Number,
  impressions: Number,
  clicks: Number
});

module.exports = mongoose.model("Sales", salesSchema);
