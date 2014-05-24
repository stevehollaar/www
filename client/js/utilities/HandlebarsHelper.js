var dateFormats = {
    short: 'DD MMMM - YYYY',
    long: 'ddd MMM DD, YYYY h:mma',
    timeOnly: 'h:mma'
};

Handlebars.registerHelper('formatDate', function(datetime, format) {
    return moment(datetime).format(dateFormats[format]);
});

Handlebars.registerHelper('formatSecondsDate', function(datetime, format) {
    return moment(datetime * 1000).format(dateFormats[format]);
});

Handlebars.registerHelper('pluralize', function(count){
    if (count !== 1){
        return 's';
    } else {
        return '';
    }
});