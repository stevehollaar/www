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