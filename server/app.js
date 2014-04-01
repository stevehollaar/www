var express = require('express');
var mongoose = require('mongoose');
var http = require('http');
var path = require('path');
var Q = require('q');
var moment = require('moment');
var request = require('request');
var development = process.env.NODE_ENV !== 'production';

app = express();
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
app.config = require('./config');
app.routes = require('./routes');
app.schemas = require('./schemas');
app.models = require('./models');
app.harvesters = require('./harvesters');

mongoose.connect(process.env.MONGO_URL, {safe: true});
app.db = mongoose.connection;

if (development){
    console.log('In development environment');
    app.use(express.errorHandler());
} else {
    console.log('In production environment');
}

app.harvesters.Foursquare.setup();

app.get('/', app.routes.index);
app.get('/api/checkins', app.routes.api.checkins.index);
app.get('/api/checkins/stats', app.routes.api.checkins.stats);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
