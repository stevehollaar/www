/**
 * @requires DashboardSectionView.js
 */

var FoursquareCheckinsView = DashboardSectionView.extend({
    map_: null,
    markers_: null,
    infoWindows_: null,
    selectedCheckin_: null,

    events: {
        'click li': 'selectCheckinEvt_',
    },

    initialize: function(){
        this.listenTo(this.collection, 'reset', this.render.bind(this));
    },

    render: function(){
        this.el.innerHTML = Templates.FoursquareCheckins(this.getTemplateData_());

        if (this.collection.length > 0) this.renderMap_();
    },

    renderMap_: function(){
        var mapOptions = {
          center: this.collection.models[0].getLatLng(),
          zoom: 14,
          disableDefaultUI: true,
          backgroundColor: '#FFB91E',
          scrollwheel: false,
          zoomControl: true
        };
        this.map_ = new google.maps.Map(this.el.querySelector('.map'), mapOptions);
        this.createMarkers_();
    },

    getTemplateData_: function(){
        var data = {
            checkins: this.collection.toJSON(),
            singleCheckin: this.collection.length === 1
        };
        return data;
    },

    selectCheckinEvt_: function(evt){
        var $target = $(evt.currentTarget);
        this.$el.find('li').removeClass('active');
        $target.addClass('active');
        var checkinModel = this.collection.get($target.data('id'));
        if (checkinModel !== this.selectedCheckin_){
            var index = this.collection.indexOf(checkinModel);
            this.panToCheckin_(checkinModel);
            this.openInfoWindow_(this.markers_[index], this.infoWindows_[index]);
            this.selectedCheckin_ = checkinModel;
        }
    },

    panToCheckin_: function(checkinModel){
         this.map_.panTo(checkinModel.getLatLng());
    },

    createMarkers_: function(){
        this.markers_ = [];
        this.infoWindows_ = [];
        this.collection.models.forEach(function(checkinModel){
            var marker = new google.maps.Marker({
                position: checkinModel.getLatLng(),
                map: this.map_
            });

            var infoWindow = new google.maps.InfoWindow({
                content: Templates.FoursquareCheckinInfoWindow(checkinModel.toJSON())
            });

            google.maps.event.addListener(marker, 'click', function(){
                this.openInfoWindow_(marker, infoWindow);
            }.bind(this));

            this.markers_.push(marker);
            this.infoWindows_.push(infoWindow);
        }, this);
    },

    openInfoWindow_: function(marker, infoWindow){
        this.infoWindows_.forEach(function(infoWindow){
            infoWindow.close();
        });
        infoWindow.open(this.map_, marker);
    }
});