/**
 * @requires DashboardView.js
 * @requires ExperimentsView.js
 */

 var AppView = Backbone.View.extend({
    headerView_: null,

    mainView_: null,

    model: null,

    initialize: function(){
        this.headerView_ = new HeaderView({
            el: this.el.querySelector('header'),
            app: this
        });
        this.mainView_ = new MainView({
            el: this.el.querySelector('main'),
            app: this
        });
    },

    render: function(){
        this.headerView_.render();
        this.mainView_.render();
    },

    activate: function(page){
        this.mainView_.activate(page)
    }
 });

