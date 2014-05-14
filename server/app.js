var express = require('express');
var mongoose = require('mongoose');
var http = require('http');
var path = require('path');
var Q = require('q');
var moment = require('moment');
var request = require('request');
var staticFavicon = require('static-favicon');
var methodOverride = require('method-override');
var morgan = require('morgan');
var compression = require('compression');
var errorHandler = require('errorhandler');
var development = process.env.NODE_ENV !== 'production';

app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(compression());
app.use(staticFavicon());
app.use(morgan('dev'));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, '../static')));
app.config = require('./config');
app.routes = require('./routes');
app.schemas = require('./schemas');
app.models = require('./models');
app.harvesters = require('./harvesters');

mongoose.connect(process.env.MONGO_URL, {safe: true});
app.db = mongoose.connection;

if (development){
    console.log('In development environment');
    app.use(errorHandler());
} else {
    console.log('In production environment');
}

app.harvesters.Foursquare.setup();

// Remove trailing slashes.
app.use(function(req, res, next) {
   if(req.url.substr(-1) == '/' && req.url.length > 1)
       res.redirect(301, req.url.slice(0, -1));
   else
       next();
});

app.get('/', app.routes.dashboard);
app.get('/dashboard', app.routes.dashboard);
app.get('/hacks', app.routes.hacks);
app.get('/resume', app.routes.resume);
app.get('/api/checkins', app.routes.api.checkins.index);
app.get('/api/checkins/stats', app.routes.api.checkins.stats);

app.use(function(req, res, next){
  res.send(404, 'Nothing to see here.');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
