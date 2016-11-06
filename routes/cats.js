// var mongoose = require('mongoose');
var catDB = require('../models/catModel.js');
var catData = require('./catData');
var names = catData.names;
var colors = catData.colors;
var cats = {};

//makes a cat and adds to database

cats.new = function (req, res) {

	var catColors = [];
	for (var i = 0; i < 2; i++) {
		catColors.push(colors[Math.floor(Math.random() * colors.length)]);
	}
	var catNames = names[Math.floor(Math.random() * names.length)];
	var age = Math.floor(Math.random() * 50 + 1);
	var formedCat = new catDB({
		name: catNames,
		colors: catColors,
		age: age
	});
	formedCat.save(function (err, formedCat) {
		if (err) return console.error(err);
		res.render('newcat', { message: formedCat.name });
	});
};


// returns all cats in the db sorted by age

cats.listAge = function (req, res) {
	catDB.find().sort({age: 1})
		.exec(function (err, cats) {
			if (err) {
				console.log('error occured');
			} else {
				res.render('listcat', { 'x': cats });
			};
		});
};


// removes oldest cat from the db

cats.delete = function (req, res) {
	catDB.findOneAndRemove({}, { sort: { age: -1 }}, function (err, cats) {
		if (err) {
			console.log("error occurred");
		} else {
			var oldCat = cats;
			if (oldCat == null) {
				res.render('error', {'message': "No cats left!"});
			} else {
			var oldCatName = oldCat.name;
			res.render('newcat', { 'message': oldCatName });
			}
		}
	})
};

// returns cats of a given color by age

cats.colors = function (req, res) {
	var catcolor = req.params.color;
	catDB.find({ colors: catcolor })
		.sort({ age: 1 })
		.exec(function (err, cats) {
			if (err) {
				console.log('error occurred');
				return;
			} else {
				res.render('listcat', { 'x': cats });
			}
		});
};

cats.nameAndColor = function (req, res) {
	var catcolor = req.params.color;
	var catname = req.params.name;
	catDB.find({$and: [{name: catname}, {colors: catcolor}]})
		.exec(function (err, cats) {
			if (err) {
				console.log('error ocurred');
				return;
			} else {
				res.render('listcat', {'x': cats});
			};
		});
};

cats.ageRange = function (req, res) {
	var catMinAge = req.params.min;
	var catMaxAge = req.params.max;
	catDB.find({$and: [{age: {$gte: catMinAge}}, {age: {$lte: catMaxAge}}]})
		.exec(function (err, cats) {
			if (err) {
				console.log('error ocurred');
				return;
			} else {
				res.render('listcat', {'x': cats});
			};
		});
};

module.exports = cats;