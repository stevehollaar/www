/**
 * @requires FoursquareCheckinsView.js
 */

var AppView = Backbone.View.extend({
    foursquareCheckinsView_: null,

    initialize: function(){
        var foursquareCheckinsEl = this.el.querySelector('.foursquare-checkins');
        if (foursquareCheckinsEl){
            this.foursquareCheckinsView_ = new FoursquareCheckinsView({
                el: foursquareCheckinsEl,
                collection: this.model.get('foursquareCheckins')
            });
        }
    },

    render: function(){
        if (this.foursquareCheckinsView_) this.foursquareCheckinsView_.render();
    }
});