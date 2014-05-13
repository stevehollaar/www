var NavView = Backbone.View.extend({
    app: null,

    events: {
        'click .page:not(.active)': 'navClickEvt_'
    },

    initialize: function(options){
        this.app = options.app;
    },

    render: function(){
        var activePage = this.$el.find('.page.active').data('page');
        App.model.setPage(activePage, {silent: true});
    },

    navClickEvt_: function(evt){
        this.$el.find('.page').removeClass('active');
        var $navEl = $(evt.currentTarget);
        $navEl.addClass('active');

        App.model.setPage($navEl.data('page'));
    }
});