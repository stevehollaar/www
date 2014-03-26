var AppModel = Backbone.Model.extend({
    defaults: {

    },

    initialize: function(){
        console.log('initialize AppModel');
    }
});
/**
 * @requires models/AppModel.js
 */

$(function(){
    var App = new AppModel();
});