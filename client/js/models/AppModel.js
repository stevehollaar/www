var AppModel = Backbone.Model.extend({
    defaults: {
        page: null
    },

    setPage: function(page){
        this.set('page', page);
    }
});