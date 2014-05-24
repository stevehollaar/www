var FoursquareCheckinModel = Backbone.Model.extend({
    default: {
        type: null,
        isMayor: null,
        timeZoneOffset: null,
        venue: null
    },

    getLatLng: function(){
        var lat = this.get('venue').location.lat;
        var lng = this.get('venue').location.lng;

        return {
            lat: lat,
            lng: lng
        };
    }
});