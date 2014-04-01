/*
 * GET home page.
 */
module.exports.index = function(req, res){
    res.render('index', {});
};

module.exports.notFound = function(req, res){
    res.send('Nothing to see here.', 404);
};

module.exports.api = require('./api');