/**
 * @requires ../models/FoursquareCheckinModel.js
 */

var FoursquareCheckinCollection = Backbone.Collection.extend({
    model: FoursquareCheckinModel,
    url: '/api/checkins',

    initialize: function(){
        this.fetch({
            data: {
                fromDate: moment({hour: 0}).valueOf()
            },
            reset: true
        });
    }
});