var AppModel = Backbone.Model.extend({
    defaults: {
        page: null
    },

    setPage: function(page, options){
        options = options || {};

        this.set({page: page}, options);

        if (!options.silent){
            App.router.navigate(page);

            if (ga) ga('send', 'pageview');
        }
    }
});