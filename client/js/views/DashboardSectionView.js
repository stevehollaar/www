var DashboardSectionView = Backbone.View.extend({
    app: null,
    expanded_: false,

    initialize: function(options){
        this.listenTo(this.colection, 'updated', this.render.bind(this));
    },

    render: function(){
        this.el.innerHTML = Templates.DashboardSection();
    }
});