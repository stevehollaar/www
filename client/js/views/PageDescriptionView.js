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