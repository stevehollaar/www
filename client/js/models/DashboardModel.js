/**
 * @requires ../collections/FoursquareCheckinCollection.js
 */

var DashboardModel = Backbone.Model.extend({
    defaults: {
        foursquareCheckins: null
    },

    initialize: function(){
        this.set('foursquareCheckins', new FoursquareCheckinCollection());
    }
});