var AppModel = Backbone.Model.extend({
    defaults: {
        page: null
    },

    setPage: function(page, options){
        options = options || {};

        this.set({page: page}, options);

        if (!options.silent){
            App.router.navigate(page);
            if (ga) ga('send', 'pageview', '/' + page);
        }
    }
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
var PageView = Backbone.View.extend({
    activate: function(){
        this.$el.addClass('active');
    },

    deactivate: function(){
        this.$el.removeClass('active');
    }
});
var DashboardHeaderView = Backbone.View.extend({
    activeTimeFrame_: null,

    events: {
        'click .timeframe button': 'changeTimeFrame_'
    },

    initialize: function(){
        this.activeTimeFrame_ = DashboardHeaderView.TIMEFRAMES.day;
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
        this.el.innerHTML = Templates.DashboardSection();
    }
});
/**
 * @requires DashboardSectionView.js
 */

var FoursquareCheckinsView = DashboardSectionView.extend({
    map_: null,
    markers_: null,
    infoWindows_: null,
    selectedCheckin_: null,

    events: {
        'click li': 'selectCheckinEvt_',
    },

    initialize: function(){
        this.listenTo(this.collection, 'reset', this.render.bind(this));
    },

    render: function(){
        this.el.innerHTML = Templates.FoursquareCheckins(this.getTemplateData_());

        if (this.collection.length > 0) this.renderMap_();
    },

    renderMap_: function(){
        var mapOptions = {
          center: this.collection.models[0].getLatLng(),
          zoom: 14,
          disableDefaultUI: true,
          backgroundColor: '#FFB91E',
          scrollwheel: false,
          zoomControl: true
        };
        this.map_ = new google.maps.Map(this.el.querySelector('.map'), mapOptions);
        this.createMarkers_();
    },

    getTemplateData_: function(){
        var data = {
            checkins: this.collection.toJSON(),
            singleCheckin: this.collection.length === 1
        };
        return data;
    },

    selectCheckinEvt_: function(evt){
        var $target = $(evt.currentTarget);
        this.$el.find('li').removeClass('active');
        $target.addClass('active');
        var checkinModel = this.collection.get($target.data('id'));
        if (checkinModel !== this.selectedCheckin_){
            var index = this.collection.indexOf(checkinModel);
            this.panToCheckin_(checkinModel);
            this.openInfoWindow_(this.markers_[index], this.infoWindows_[index]);
            this.selectedCheckin_ = checkinModel;
        }
    },

    panToCheckin_: function(checkinModel){
         this.map_.panTo(checkinModel.getLatLng());
    },

    createMarkers_: function(){
        this.markers_ = [];
        this.infoWindows_ = [];
        this.collection.models.forEach(function(checkinModel){
            var marker = new google.maps.Marker({
                position: checkinModel.getLatLng(),
                map: this.map_
            });

            var infoWindow = new google.maps.InfoWindow({
                content: Templates.FoursquareCheckinInfoWindow(checkinModel.toJSON())
            });

            google.maps.event.addListener(marker, 'click', function(){
                this.openInfoWindow_(marker, infoWindow);
            }.bind(this));

            this.markers_.push(marker);
            this.infoWindows_.push(infoWindow);
        }, this);
    },

    openInfoWindow_: function(marker, infoWindow){
        this.infoWindows_.forEach(function(infoWindow){
            infoWindow.close();
        });
        infoWindow.open(this.map_, marker);
    }
});
var CurrentTimeView = Backbone.View.extend({
    initialize: function(){
        setInterval(this.render.bind(this), 10);
    },

    render: function(){
        this.el.innerHTML = moment().format('h:mm:ss.Sa');
    }
});
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
/**
 * @requires PageView.js
 */
var HacksPageView = PageView.extend({
});
/**
 * @requires PageView.js
 */
var ResumePageView = PageView.extend({
});
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
/**
 * @requires ../models/FoursquareCheckinModel.js
 */

var FoursquareCheckinCollection = Backbone.Collection.extend({
    model: FoursquareCheckinModel,
    url: '/api/checkins',

    initialize: function(){
        this.fetch({
            data: {
                fromDate: moment({hour: 0}).valueOf()
            },
            reset: true
        });
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
        };

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


/**
 * @requires HeaderView.js
 * @requires MainView.js
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
        this.mainView_.activate(page);
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
var dateFormats = {
    short: 'DD MMMM - YYYY',
    long: 'ddd MMM DD, YYYY h:mma',
    timeOnly: 'h:mma'
};

Handlebars.registerHelper('formatDate', function(datetime, format) {
    return moment(datetime).format(dateFormats[format]);
});

Handlebars.registerHelper('formatSecondsDate', function(datetime, format) {
    return moment(datetime * 1000).format(dateFormats[format]);
});

Handlebars.registerHelper('pluralize', function(count){
    if (count !== 1){
        return 's';
    } else {
        return '';
    }
});