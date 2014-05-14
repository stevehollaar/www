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