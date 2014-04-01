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
        console.log('initialize FoursquareCheckinCollection')
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
        console.log('initialize AppModel');
        this.set('foursquareCheckins', new FoursquareCheckinCollection());
    }
});
var AppView = Backbone.View.extend({

    initialize: function(){
        // this.render();
        this.checkins = this.model.get('foursquareCheckins');
        this.listenTo(this.checkins, 'updated', this.render.bind(this));
    },

    render: function(){
        console.log('rendering')
        console.log(this.checkins.length)
        this.el.innerHTML = Templates.FoursquareCheckins({
            checkins: this.checkins.toJSON()
        });
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