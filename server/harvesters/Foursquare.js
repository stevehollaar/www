var mongoose = require('mongoose');
var request = require('request');
var Q = require('q');

function FoursquareHavester(){
    this.POLL_INTERVAL = 10 * 1000;
    this.checkinModel = app.models.FoursquareCheckin;
    this.pollInterval = null;
}

FoursquareHavester.prototype.setup = function(){
    this.checkinModel.count({}, function(error, results){
        if (error){
            console.error('FoursquareHavester: ' + error);
        } else {
            console.log('FoursquareHavester: Setting up. Currently ' + results + ' checkins');
            if (results === 0){
                this.updateCheckinsAll();
            }
            this.startPolling();
        }
    }.bind(this));
};

FoursquareHavester.prototype.startPolling = function(){
    this.pollInterval = setInterval(this.updateCheckinsLatest.bind(this), this.POLL_INTERVAL)
};

FoursquareHavester.prototype.stopPolling = function(){
    clearInterval(this.pollInterval);
    this.pollInterval = null;
};

FoursquareHavester.prototype.updateCheckinsLatest = function(){
    var updatePromise = this.updateCheckins_({
        limit: 10
    });

    updatePromise.done(this.upsertCheckins_.bind(this), console.error);
};

FoursquareHavester.prototype.updateCheckinsAll = function(){
    Q.async(function *(){
        var checkins = [];
        var newCheckins;
        var options = {
            offset: 0
        };
        do {
            newCheckins = yield this.updateCheckins_(options);
            checkins = checkins.concat(newCheckins);
            options.offset += 250;
        } while (newCheckins.length === 250);
        this.upsertCheckins_(checkins);
    }.bind(this))();
};

FoursquareHavester.prototype.removeCheckins = function(){
    console.log('FoursquareHavester: Removing all checkins');
    this.checkinModel.remove({}, console.error);
};

FoursquareHavester.prototype.updateCheckins_ = function(options){
    var offset = options.offset || 0;
    var limit = options.limit || 250;
    console.log('FoursquareHavester: Getting checkins with offset ' + offset + ' and limit ' + limit);

    var updateRequest = Q.defer();
    var options = {
        url: app.config.foursquare.checkinsUrl,
        qs: {
            oauth_token: app.config.foursquare.accessToken,
            v: app.config.foursquare.version,
            limit: limit,
            offset: offset
        }
    };
    request(options, function(error, response, body){
        if (error){
            return updateRequest.reject('FoursquareHavester: ' + error.toString());
        }
        var checkins = [];
        try {
            checkins = JSON.parse(body).response.checkins.items;
        } catch (e){
            return updateRequest.reject('FoursquareHavester: Error parsing checkins: ' + e);
        }

        updateRequest.resolve(checkins);
    }.bind(this));

    return updateRequest.promise;
};

FoursquareHavester.prototype.upsertCheckins_ = function(checkins){
    checkins.forEach(this.upsertCheckin_.bind(this));
};

FoursquareHavester.prototype.upsertCheckin_ = function(checkin){
    var query = {"id": checkin.id};
    var options = {
        upsert: true
    };
    this.checkinModel.findOneAndUpdate(query, checkin, options, function(err){
        if (err){
            console.log('FoursquareHavester: ' + error)
        }
    });
};

module.exports = function(){
    return new FoursquareHavester();
};