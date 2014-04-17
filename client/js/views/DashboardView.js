/**
 * @requires DashboardHeaderView.js
 * @requires FoursquareCheckinsView.js
 */

var DashboardView = Backbone.View.extend({
    dashboardHeaderView_: null,
    foursquareCheckinsView_: null,

    initialize: function(){
        this.dashboardHeaderView_ = new DashboardHeaderView({
            el: this.el.querySelector('header')
        });
        this.dashboardHeaderView_.on('changeTimeFrame', function(timeframe){
            console.log(timeframe);
        });

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