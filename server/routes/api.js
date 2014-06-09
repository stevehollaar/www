module.exports = {
    checkins: {
        index: function(req, res){
            var model = app.models.FoursquareCheckin;
            var params = {
                fromDate: req.query.fromDate ? (req.query.fromDate / 1000) : null,
                toDate: req.query.toDate ? (req.query.toDate / 1000) : null,
                limit: req.query.limit
            };
            model.getCheckins(params).exec(function(error, results){
                if (error){
                    res.send(error);
                } else {
                    res.send(results);
                }
            });
        },

        stats: function(req, res){
            var model = app.models.FoursquareCheckin;
            var stats = {
                count: null,
                lastUpdated: null,
                formattedLastUpdated: null
            };
            var checkComplete = function(){
                var isComplete = !(stats.count === null || stats.lastUpdated === null);
                if (isComplete) res.send(stats);
            };
            model.count({}, function(error, results){
                if (error){
                    res.send(error);
                } else {
                    stats.count = results;
                    checkComplete();
                }
            });
            model.findOne().sort('-fetchedAt').exec(function(error, results){
                if (error){
                    res.send(error);
                } else {
                    stats.lastUpdated = results.createdAt;
                    stats.formattedLastUpdated = Date(results.createdAt);
                    checkComplete();
                }
            });
        }
    }
};