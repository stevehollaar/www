var mongoose = require('mongoose');
module.exports = function(){
    var schema = app.schemas.FoursquareCheckin;

    schema.statics.getCheckins = function(options){
        var query = this.model('FoursquareCheckin').find();
        if (options.fromDate) query.where('createdAt').gt(options.fromDate);
        if (options.toDate) query.where('createdAt').gt(options.toDate);
        if (options.limit) query.limit(options.limit);
        query.sort({createdAt: -1});
        return query;
    };

    return mongoose.model('FoursquareCheckin', schema);
}();