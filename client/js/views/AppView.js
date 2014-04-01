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