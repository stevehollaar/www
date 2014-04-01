var dateFormats = {
    short: 'DD MMMM - YYYY',
    long: 'ddd MMM DD, YYYY h:mma'
};

Handlebars.registerHelper("formatDate", function(datetime, format) {
    f = dateFormats[format];
    return moment(datetime).format(f);
});

Handlebars.registerHelper("formatSecondsDate", function(datetime, format) {
    f = dateFormats[format];
    return moment(datetime * 1000).format(f);
});