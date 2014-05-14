var AppModel = Backbone.Model.extend({
    defaults: {
        page: null
    },

    setPage: function(page, options){
        options = options || {}

        this.set({page: page}, options);

        if (!options.silent) App.router.navigate(page);
    }
});
var DashboardHeaderView = Backbone.View.extend({
    activeTimeFrame_: null,

    events: {
        'click .timeframe button': 'changeTimeFrame_'
    },

    initialize: function(){
        this.activeTimeFrame_ = DashboardHeaderView.TIMEFRAMES['day'];
    },

    render: function(){

    },

    changeTimeFrame_: function(evt){
        var $newTimeFrame = $(evt.currentTarget);
        this.$el.find('.timeframe button').removeClass('active');
        $newTimeFrame.addClass('active');
        this.trigger('changeTimeFrame', $newTimeFrame.data('timeframe'));
    }
});

DashboardHeaderView.TIMEFRAMES = {
    day: 0,
    week: 1,
    month: 2,
    year: 3,
    custom: 4
};
var DashboardSectionView = Backbone.View.extend({
    expanded_: false,

    initialize: function(){
        this.listenTo(this.colection, 'updated', this.render.bind(this));
    },

    render: function(){
        this.el.innerHTML = Templates.DashboardSection()
    }
});
/**
 * @requires DashboardSectionView.js
 */

var FoursquareCheckinsView = DashboardSectionView.extend({
    initialize: function(){
        this.listenTo(this.collection, 'updated', this.render.bind(this));
    },

    render: function(){
        this.el.innerHTML = Templates.FoursquareCheckins({
            checkins: this.collection.toJSON()
        });
    }
});
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
var ExperimentsView = Backbone.View.extend({
    render: function(){
        console.log('experiments view render');
    }
});
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


var Router = Backbone.Router.extend({
    routes: {
        '': 'dashboard',
        'dashboard': 'dashboard',
        'dashboard/': 'dashboard',
        'hacks': 'hacks',
        'resume': 'resume'
    },

    dashboard: function(){
        App.model.set('page', 'dashboard');
    },

    hacks: function(){
        App.model.set('page', 'hacks');
    },

    resume: function(){
        App.model.set('page', 'resume');
    }
});
/**
 * @requires models/AppModel.js
 * @requires views/AppView.js
 * @requires Router.js
 */

var App;
$(function(){
    App = new AppView({
        el: document.querySelector('body'),
        model: new AppModel()
    });

    FastClick.attach(document.body);

    App.router = new Router();
    Backbone.history.start({
        pushState: true,
        hashChange: false
    });

    App.render();
});
var FoursquareCheckinModel = Backbone.Model.extend({
    default: {
        type: null,
        isMayor: null,
        timeZoneOffset: null,
        venue: null
    },

    initialize: function(){

    }
});
/**
 * @requires ../models/FoursquareCheckinModel.js
 */

var FoursquareCheckinCollection = Backbone.Collection.extend({
    model: FoursquareCheckinModel,
    url: '/api/checkins',

    initialize: function(){
        this.fetch();
    },

    parse: function(results){
        this.set(results);
        this.trigger('updated')
    }
});
/**
 * @requires ../collections/FoursquareCheckinCollection.js
 */

var DashboardModel = Backbone.Model.extend({
    defaults: {
        foursquareCheckins: null
    },

    initialize: function(){
        this.set('foursquareCheckins', new FoursquareCheckinCollection());
    }
});
var dateFormats = {
    short: 'DD MMMM - YYYY',
    long: 'ddd MMM DD, YYYY h:mma'
};

Handlebars.registerHelper("formatDate", function(datetime, format) {
    f = dateFormats[format];
    return moment(datetime).format(f);
});

Handlebars.registerHelper("formatSecondsDate", function(datetime, format) {
    f = dateFormats[format];
    return moment(datetime * 1000).format(f);
});
var NavView = Backbone.View.extend({
    app: null,

    events: {
        'click .page:not(.active)': 'navClickEvt_'
    },

    initialize: function(options){
        this.app = options.app;
        var activePage = this.$el.find('.page.active').data('page');
        this.app.model.set('page', activePage);
        this.listenTo(this.app.model, 'change:page', this.changePageEvt_.bind(this));
    },

    navClickEvt_: function(evt){
        var $navEl = $(evt.currentTarget);

        this.app.model.setPage($navEl.data('page'));
    },

    changePageEvt_: function(){
        var activePage = this.app.model.get('page');
        var $navEl = this.$el.find('.page[data-page="' + activePage + '"]');

        this.$el.find('.page').removeClass('active');
        $navEl.addClass('active');
    }
});
var PageDescriptionView = Backbone.View.extend({
    app: null,

    initialize: function(options){
        this.app = options.app;
        this.listenTo(this.app.model, 'change:page', this.changePageEvt_.bind(this));
    },

    changePageEvt_: function(){
        var activePage = this.app.model.get('page');
        this.$el.find('.page-description').removeClass('active');
        this.$el.find('.page-description.' + activePage).addClass('active');
    }
});
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