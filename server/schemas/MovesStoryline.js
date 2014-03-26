var mongoose = require('mongoose');
var moment = require('moment');

var parseDate = function(dateString){
    return moment(dateString, 'YYYYMMDDTHHmmssZ').toDate();
};

module.exports = new mongoose.Schema({
    dateString: String,
    date: Date,
    fetchedAt: {
        type: Date,
        default: Date.now
    },
    caloriesIdle: Number,
    segments: [{
        type: {
            type: String
        },
        startTime: {
            type: Date,
            set: parseDate
        },
        endTime: {
            type: Date,
            set: parseDate
        },
        place: {
            id: Number,
            type: {
                type: String
            },
            location: {
                lat: Number,
                lon: Number
            }
        },
        activities: [{
            activity: String,
            startTime: {
                type: Date,
                set: parseDate
            },
            endTime: {
                type: Date,
                set: parseDate
            },
            duration: Number,
            distance: Number,
            steps: Number,
            calories: Number,
            trackPoints: [{
                lat: Number,
                lon: Number,
                time: {
                    type: Date,
                    set: parseDate
                }
            }]
        }]
    }]
});