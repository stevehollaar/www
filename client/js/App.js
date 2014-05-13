/**
 * @requires models/AppModel.js
 * @requires views/AppView.js
 */

var App;
$(function(){
    App = new AppView({
        el: document.querySelector('body'),
        model: new AppModel()
    });
    App.render();
});