/**
 * @requires NavView.js
 * @requires PageDescriptionView.js
 */

var HeaderView = Backbone.View.extend({
    navView_: null,
    app: null,

    initialize: function(options){
        this.app = options.app;
        this.navView_ = new NavView({
            el: this.el.querySelector('nav'),
            app: this.app
        });
        this.pageDescriptionView_ = new PageDescriptionView({
            el: this.el.querySelector('.page-description-container'),
            app: this.app
        });
    },

    render: function(){
        this.navView_.render();
        this.pageDescriptionView_.render();
    }
});