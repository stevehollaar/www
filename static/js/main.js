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
    url: 'api/checkins',

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

var AppModel = Backbone.Model.extend({
    defaults: {
        foursquareCheckins: null
    },

    initialize: function(){
        this.set('foursquareCheckins', new FoursquareCheckinCollection());
    }
});
var FoursquareCheckinsView = Backbone.View.extend({
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
/**
 * @requires models/AppModel.js
 * @requires views/AppView.js
 */

var App;
$(function(){
    App = new AppView({
        el: document.querySelector('body'),
        model: new AppModel()
    });
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