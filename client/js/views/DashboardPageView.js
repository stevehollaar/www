/**
 * @requires PageView.js
 * @requires DashboardHeaderView.js
 * @requires FoursquareCheckinsView.js
 * @requires CurrentTimeView.js
 */
var DashboardPageView = PageView.extend({
    dashboardHeaderView_: null,
    foursquareCheckinsView_: null,
    currentTimeView_: null,

    initialize: function(options){
        this.dashboardHeaderView_ = new DashboardHeaderView({
            el: this.el.querySelector('header')
        });
        this.currentTimeView_ = new CurrentTimeView({
            el: this.el.querySelector('.current-time')
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
        // this.el.innerHTML = Templates.DashboardPageView();



        // if (this.foursquareCheckinsView_) this.foursquareCheckinsView_.render();
    }
});