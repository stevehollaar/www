/**
 * @requires DashboardView.js
 * @requires HeaderView.js
 * @requires ../models/DashboardModel.js
 */

var MainView = Backbone.View.extend({
    dashboardView_: null,

    experimentsView_: null,

    initialize: function(){
        this.dashboardView_ = new DashboardView({
            el: this.el.querySelector('.dashboard'),
            model: new DashboardModel()
        });
        this.experimentsView_ = new ExperimentsView({
            el: this.el.querySelector('.experiments')
        });
    },

    render: function(){
        switch (document.location.pathname){
            case '/experiments':
            case '/experiments/':
                this.experimentsView_.render();
                break;
            default:
                this.dashboardView_.render();
                break;
        }
    },

    activate: function(page){
        switch(page){
            case 'dashboard':
                this.dashboardView_.$el.show();
                this.experimentsView_.$el.hide();
                break;
            case 'experiments':
                this.dashboardView_.$el.hide();
                this.experimentsView_.$el.show();
                break;
        }
    }
});