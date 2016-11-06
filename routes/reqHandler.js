// Requires the MongoDB model
var path = require('path');
var ingredientDB = require('../models/ingredientModel.js');
var orderDB = require('../models/orderModel.js');

var ingredient = {};

ingredient.new = function (req, res) {

    ingredientDB.find()
		.exec(function (err, ingredients) {
			if (err) {
				console.log('error occured');
			} else {
				res.render('ingredientList', { 'x': ingredients });
			};
        });
};

ingredient.getIngredientsPOST = function (req, res) {
    var name = req.body.name;
    var price = req.body.price;

    var formedIngredient = new ingredientDB({
	name: name,
	price: price,
	inStock: true
	});

	formedIngredient.save(function (err, formedIngredient) {
		if (err) return console.error(err);
		});
};

ingredient.list = function (req, res) {

    ingredientDB.find()
		.exec(function (err, ingredients) {
			if (err) {
				console.log('error occured');
			} else {
				res.render('ingredientList2', { 'x': ingredients });
			};
        });
};

module.exports = ingredient;