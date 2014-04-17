var HeaderView = Backbone.View.extend({
    events: {
        'click nav li:not(".active")': 'navClickEvt_'
    },

    initialize: function(){

    },

    render: function(){

    },

    navClickEvt_: function(evt){
        $('nav li').removeClass('active');
        var $navEl = $(evt.currentTarget);
        $navEl.addClass('active');
        App.activate($navEl.data('page'));
    }
});