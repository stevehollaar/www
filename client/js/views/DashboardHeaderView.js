var DashboardHeaderView = Backbone.View.extend({
    activeTimeFrame_: null,

    events: {
        'click .timeframe button': 'changeTimeFrame_'
    },

    initialize: function(){
        this.activeTimeFrame_ = DashboardHeaderView.TIMEFRAMES['day'];
    },

    render: function(){

    },

    changeTimeFrame_: function(evt){
        var $newTimeFrame = $(evt.currentTarget);
        this.$el.find('.timeframe button').removeClass('active');
        $newTimeFrame.addClass('active');
        this.trigger('changeTimeFrame', $newTimeFrame.data('timeframe'));
    }
});

DashboardHeaderView.TIMEFRAMES = {
    day: 0,
    week: 1,
    month: 2,
    year: 3,
    custom: 4
};