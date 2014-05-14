/**
 * @requires models/AppModel.js
 * @requires views/AppView.js
 * @requires Router.js
 */

var App;
$(function(){
    App = new AppView({
        el: document.querySelector('body'),
        model: new AppModel()
    });

    FastClick.attach(document.body);

    App.router = new Router();
    Backbone.history.start({
        pushState: true,
        hashChange: false
    });

    App.render();
});