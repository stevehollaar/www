/**
 * @requires DashboardSectionView.js
 */

var FoursquareCheckinsView = DashboardSectionView.extend({
    initialize: function(){
        this.listenTo(this.collection, 'updated', this.render.bind(this));
    },

    render: function(){
        this.el.innerHTML = Templates.FoursquareCheckins(this.getTemplateData_());
    },

    getTemplateData_: function(){
        var data = {
            checkins: this.collection.toJSON(),
            singleCheckin: this.collection.length === 1
        };
        return data;
    }
});