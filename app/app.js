/* Creating the module, passing array of other dependent modules */
angular.module('app', ['ngMaterial', 'ngMessages']);

/*--------------------- Home Component ---------------------*/
const home = {
    templateUrl: './home/home.html',
    controller: 'HomeController'
}

// Home Component with Routing (Routed / Stateful), registering a component to the module
angular.module('app').component('home', home);

// Home Controller with dependency injection using the array method
angular.module('app').controller('HomeController', ['ExampleService', function (ExampleService) {
    const $ctrl = this;
    console.log('example service: ', ExampleService);
    
    // 0sNOF9WDwhWunNAHPD3Baj
    
    $ctrl.getName = function() {
        var name = document.getElementById('artistname').value;
        ExampleService.getData(name).then(function(result) {
            console.log('result: ', result);
            $ctrl.exampleVariable = result;
            $ctrl.artist = $ctrl.exampleVariable['data']['artists']['0']['name']
            console.log('example var: ', $ctrl.exampleVariable);
        });
    }
    
    // Call the getData function: getData is an async request
    ExampleService.getData().then(function(result) {
        /*
        console.log('result: ', result);
        $ctrl.exampleVariable = result;
        $ctrl.artist = document.getElementById('artist').value
        //console.log($ctrl.artist);
        //$ctrl.artist = $ctrl.exampleVariable['data']['artists']['0']['name']
        console.log('example var: ', $ctrl.exampleVariable);
        */
    });
    
}]);
/*--------------------- Home Component ---------------------*/

/*--------------------- Settings Component ---------------------*/
const settings = {
    templateUrl: '',
    controller: 'SettingsController'
}

// Settings Component with Routing (Routed / Stateful)
angular.module('app').component('settings', settings)

// Settings Controller with dependency injection using $inject method
function SettingsController(ExampleService) {

}
SettingsController.$inject = ['ExampleService'];
angular.module('app').controller('SettingsController', SettingsController);
/*--------------------- Settings Component ---------------------*/

/*--------------------- Example Service ---------------------*/
// dependency injection: this depends on $http
function ExampleService($http) {
    // 'this' refers to example service
    
    // Services are Singletons
    // Properties
    // Methods
    this.getData = getData;
    
    // Function to get data from 3rd party API
    function getData(albumID) {
        console.log(albumID);
        return $http({
            method: 'GET',
            url: `https://api.spotify.com/v1/albums/${albumID}`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer BQDzN-M0b6p8vG3dUZQN_pivUouHW9Ml00F9O20bt-pwIJU1sd76LtKY57lkhKVyyvqNb-Tt_4W1XwkVjsPYPr_6FHXuxRtmrhkEV3aeJdEWOXwM4j-qcT0GeFhrX-EkUwXnpchxFZsf2dpIijyHQQ'
            }
        })
    }
}
ExampleService.$inject = ['$http'];
angular.module('app').service('ExampleService', ExampleService)
/*--------------------- Example Service ---------------------*/



















