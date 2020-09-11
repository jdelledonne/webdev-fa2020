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
    
    // Call the getData function: getData is an async request
    ExampleService.getData().then(function(result) {
        console.log('result: ', result);
        $ctrl.exampleVariable = result;
        $ctrl.artist = $ctrl.exampleVariable['data']['artists']['0']['name']
        console.log($ctrl.artist);
        console.log('example var: ', $ctrl.exampleVariable);
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
    function getData() {
        return $http({
            method: 'GET',
            url: 'https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Baj',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer BQAZYnW0h5kcYUOhhg8M36HSbajgEIxfCgwGkcd6GyJq_fKdJgAWlmbxAn-hK3PrAuX5K0rCQOLtBKqFcm3K0Wnplii85v4cRuf5YAhV0tKPwJB6vZB7ZmBWcnjOQNo-J2bXj1xDZSHrVP8cGNTqJA'
            }
        })
    }
}
ExampleService.$inject = ['$http'];
angular.module('app').service('ExampleService', ExampleService)
/*--------------------- Example Service ---------------------*/



















