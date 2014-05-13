module.exports.dashboard = function(req, res){
    res.render('index', {
        page: 'dashboard'
    });
};

module.exports.hacks = function(req, res){
    res.render('index', {
        page: 'hacks'
    });
};

module.exports.resume = function(req, res){
    res.render('index', {
        page: 'resume'
    });
};

module.exports.notFound = function(req, res){
    res.send('Nothing to see here.', 404);
};

module.exports.api = require('./api');