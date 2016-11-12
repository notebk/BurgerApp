// Requires the MongoDB model
var path = require('path');
var ingredientDB = require('../models/ingredientModel.js');
var orderDB = require('../models/orderModel.js');

var ingredient = {};
// var order = {};


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
    res.send(".");
};

ingredient.editIngredientsPOST = function (req, res) {
    var objToUpdate = {};
    var name = req.body.name;
    if (req.body.price) objToUpdate.price = req.body.price;
    objToUpdate.inStock = req.body.inStock;

    var setObj = { $set: objToUpdate };

    ingredientDB.find({ "name": name })
        //  .update(setObj);
        .exec(function (err, ingredient) {
            if (err) {
                console.log('error occurred');
                return;
            } else {
                ingredientDB.update({ "name": name }, setObj, function (err, updated) {
                    res.send(updated);
                });

            }
        });
};

ingredient.order = function (req, res) {
    ingredientDB.find({"inStock": true}, {name: 1, price: 1})
        .exec(function (err, ingredient) {
            if (err) {
                console.log('error occurred');
                return;
            } else {
                res.render('orders', {'ingredient': ingredient});
            }
        });
}

ingredient.newOrder = function (req, res) {
    var customer = req.body.customer;
    var cost = req.body.cost; //not in use at the moment
    var ingredients = req.body['ingredients[]'];

   var formedOrder = new orderDB({
        customer: customer,
        ingredients: ingredients,
        cost: cost
    });

    formedOrder.save(function (err, formedOrder) {
        if (err) return console.error(err);
    });
    res.send('/order/done');
};

ingredient.kitchen = function (req, res) {
    orderDB.find()
        .exec(function (err, order) {
            if (err) {
                console.log('error occurred');
                return;
            } else {
                res.render('orderList', {'order': order});
            }
        });
}

ingredient.delete = function (req, res) {
    var customer = req.body.customer;
    orderDB.remove({"customer": customer})
        .exec(function (err, order) {
            if (err) {
                console.log('error occurred');
                return;
            } else {
                res.send(".");
            }
        });
    
}

module.exports = ingredient;