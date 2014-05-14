var Router = Backbone.Router.extend({
    routes: {
        '': 'dashboard',
        'dashboard': 'dashboard',
        'dashboard/': 'dashboard',
        'hacks': 'hacks',
        'resume': 'resume'
    },

    dashboard: function(){
        App.model.set('page', 'dashboard');
    },

    hacks: function(){
        App.model.set('page', 'hacks');
    },

    resume: function(){
        App.model.set('page', 'resume');
    }
});