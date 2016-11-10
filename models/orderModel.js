//This type of file is usually found in app/models/robotModel.js
var mongoose = require('mongoose');

// order schema
var orderSchema = mongoose.Schema({
  customer: String,
  ingredients: [],
  cost: Number
});

module.exports = mongoose.model("orderdb", orderSchema);
