/**
 * @requires views/AppView.js
 */

var App;
$(function(){
    App = new AppView({
        el: document.querySelector('body')
    });
    App.render();
});