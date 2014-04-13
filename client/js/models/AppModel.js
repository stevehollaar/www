/**
 * @requires ../collections/FoursquareCheckinCollection.js
 */

var AppModel = Backbone.Model.extend({
    defaults: {
        foursquareCheckins: null
    },

    initialize: function(){
        this.set('foursquareCheckins', new FoursquareCheckinCollection());
    }
});