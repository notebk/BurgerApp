//This type of file is usually found in app/models/robotModel.js
var mongoose = require('mongoose');

// ingredient schema
var ingSchema = mongoose.Schema({
  name: String,
  price: Number,
  inStock: Boolean
});

module.exports = mongoose.model("ingredients", ingSchema);


