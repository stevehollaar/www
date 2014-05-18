var CurrentTimeView = Backbone.View.extend({
    initialize: function(){
        setInterval(this.render.bind(this), 10);
    },

    render: function(){
        this.el.innerHTML = moment().format('h:mm:ss.Sa');
    }
});