var requiredVars = [
    'FOURSQUARE_CLIENT_ID',
    'FOURSQUARE_CLIENT_SECRET',
    'FOURSQUARE_CODE',
    'FOURSQUARE_ACCESS_TOKEN',
    'FOURSQUARE_VERSION',
    'MOVES_CLIENT_ID',
    'MOVES_CLIENT_SECRET',
    'MOVES_ACCESS_TOKEN',
    'MOVES_REFRESH_TOKEN',
    'MOVES_USER_ID',
    'MOVES_EARLIEST_DATE_STRING'
];
requiredVars.forEach(function(requiredVar){
    if (process.env[requiredVar] === undefined){
        console.error('ERROR: A required environment variable is undefined: ' + requiredVar);
    }
});

module.exports =  {
    foursquare: {
        clientId: process.env.FOURSQUARE_CLIENT_ID,
        clientSecret: process.env.FOURSQUARE_CLIENT_SECRET,
        code: process.env.FOURSQUARE_CODE,
        accessToken: process.env.FOURSQUARE_ACCESS_TOKEN,
        version: process.env.FOURSQUARE_VERSION,
        defaultLimit: 250,
        defaultOffset: 0,
        checkinsUrl: 'https://api.foursquare.com/v2/users/self/checkins'
    },
    moves: {
        clientId: process.env.MOVES_CLIENT_ID,
        clientSecret: process.env.MOVES_CLIENT_SECRET,
        accessToken: process.env.MOVES_ACCESS_TOKEN,
        refreshToken: process.env.MOVES_REFRESH_TOKEN,
        userId: process.env.MOVES_USER_ID,
        earliestDateString: process.env.MOVES_EARLIEST_DATE_STRING,
        storylineUrl: 'https://api.moves-app.com/api/v1/user/storyline/daily'
    }
}