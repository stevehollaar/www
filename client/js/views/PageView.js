var PageView = Backbone.View.extend({
    activate: function(){
        this.$el.addClass('active');
    },

    deactivate: function(){
        this.$el.removeClass('active');
    }
});