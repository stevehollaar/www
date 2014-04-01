var mongoose = require('mongoose');
var moment = require('moment');

module.exports = new mongoose.Schema({
    id: String,
    type: String,
    isMayor: Boolean,
    timeZoneOffset: Number,
    venue: {
        id: String,
        name: String,
        location: {
            address: String,
            crossStreet: String,
            lat: Number,
            lng: Number,
            postalCode: String,
            cc: String,
            city: String,
            state: String,
            country: String
        },
        categories: [{
            id: String,
            name: String,
            pluralName: String,
            shortName: String,
            icon: {
                prefix: String,
                suffix: String
            },
            primary: Boolean
        }],
        verified: Boolean,
        stats: {
            checkinsCount: Number,
            usersCount: Number,
            tipCount: Number
        },
        like: Boolean,
        beenHere: {
            count: Number,
            marked: Boolean
        }
    }
});