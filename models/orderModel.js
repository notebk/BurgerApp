//This type of file is usually found in app/models/robotModel.js
var mongoose = require('mongoose');

// order schema
var orderSchema = mongoose.Schema({
  customer: String,
  ingredients: [String],
  Cost: Number
});

module.exports = mongoose.model("order", orderSchema);
