/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var mongoose = require('mongoose');
var http = require('http');
var path = require('path');
var app = express();
var development = app.get('env') === 'development';
var mongoUrl = development ? 'mongodb://localhost/www' : process.env.MONGO_URL;
var test = process.env.MONGO_URL;

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
// mongoose.connect(mongoUrl, {safe: true});
// app.db = mongoose.connection;

if (development){
    console.log('In development environment');
    // app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/test', routes.test);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
