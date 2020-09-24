angular
    .module('components.auth', [
    'ui.router',
    'ngParse'
])

    .config(function (ParseProvider) {
        var MY_PARSE_APP_ID = 'E33O0InrCwBjYDrYgxoWy1oN8LLLnQQgNOEESrnE'; 
        var MY_PARSE_JS_KEY = 'GC5CAPOaC1qTCmWTWsXS5JXlp0uBOgUty8wl9H1D';
        ParseProvider.initialize(MY_PARSE_APP_ID, MY_PARSE_JS_KEY); 
        ParseProvider.serverURL = 'https://parseapi.back4app.com/'; 
})