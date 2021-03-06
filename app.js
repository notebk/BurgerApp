var exphbs = require('express-handlebars');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var index = require('./routes/index');
var mongoose = require('mongoose');
var reqHandler = require('./routes/reqHandler');
var app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.home);
app.get('/ingredients', reqHandler.new);
app.post('/ingredients/add', reqHandler.getIngredientsPOST);
app.post('/ingredients/edit', reqHandler.editIngredientsPOST);
app.get('/order', reqHandler.order);
app.post('/order/new', reqHandler.newOrder);
app.get('/kitchen', reqHandler.kitchen);
app.post('/kitchen/delete', reqHandler.delete);

mongoose.connect('mongodb://localhost/ingredients');

app.listen(3000);