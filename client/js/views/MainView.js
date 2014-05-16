/**
 * @requires DashboardPageView.js
 * @requires HacksPageView.js
 * @requires ResumePageView.js
 * @requires HeaderView.js
 * @requires ../models/DashboardModel.js
 */
var MainView = Backbone.View.extend({
    app: null,

    pageViews_: null,

    initialize: function(options){
        this.app = options.app;

        this.pageViews_ = {
            dashboard: new DashboardPageView({
                el: this.el.querySelector('section.dashboard'),
                model: new DashboardModel()
            }),
            hacks: new HacksPageView({
                el: this.el.querySelector('section.hacks')
            }),
            resume: new ResumePageView({
                el: this.el.querySelector('section.resume')
            })
        }

        this.listenTo(this.app.model, 'change:page', this.render.bind(this));
    },

    render: function(){
        _.values(this.pageViews_).forEach(function(pageView){
            pageView.render();
        });

        var pageView = this.pageViews_[this.app.model.get('page')];
        this.activatePageView_(pageView);
    },

    activatePageView_: function(pageView){
        this.deactivateAllPages_();
        pageView.activate();
    },

    deactivateAllPages_: function(){
        _.values(this.pageViews_).forEach(function(pageView){
            pageView.deactivate();
        });
    }
});

