/**
 * @requires ../models/FoursquareCheckinModel.js
 */

var FoursquareCheckinCollection = Backbone.Collection.extend({
    model: FoursquareCheckinModel,
    url: '/api/checkins',

    initialize: function(){
        this.fetch();
    },

    parse: function(results){
        this.set(results);
        this.trigger('updated');
    }
});