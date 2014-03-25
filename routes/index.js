/*
 * GET home page.
 */
exports.index = function(req, res){
  res.render('index', {});
};

exports.test = function(req, res){
    res.send(process.env.MONGO_URL)
};