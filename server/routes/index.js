module.exports.dashboard = function(req, res){
    res.render('index', {
        page: 'dashboard'
    });
};

module.exports.hacks = {
    index: function(req, res){
        res.render('index', {
            page: 'hacks'
        })
    },
    falling: function(requ, res){
        res.sendfile('static/hacks/falling.html');
    }
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