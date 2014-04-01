/**
 * @requires ../collections/FoursquareCheckinCollection.js
 */

var AppModel = Backbone.Model.extend({
    defaults: {
        foursquareCheckins: null
    },

    initialize: function(){
        console.log('initialize AppModel');
        this.set('foursquareCheckins', new FoursquareCheckinCollection());
    }
});