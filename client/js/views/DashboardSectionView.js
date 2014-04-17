var DashboardSectionView = Backbone.View.extend({
    expanded_: false,

    initialize: function(){
        this.listenTo(this.colection, 'updated', this.render.bind(this));
    },

    render: function(){
        this.el.innerHTML = Templates.DashboardSection()
    }
});