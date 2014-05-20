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
    falling: function(req, res){
        res.sendfile('static/hacks/falling/index.html');
    }
};

module.exports.resume = {
    index: function(req, res){
        res.render('index', {
            page: 'resume'
        })
    },
    html: function(req, res){
        res.render('resume');
    }
};

module.exports.notFound = function(req, res){
    res.send('Nothing to see here.', 404);
};

module.exports.api = require('./api');