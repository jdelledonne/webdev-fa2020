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
    
    $ctrl.searchArtist = function() {
        
        // Get artist information
        var name = document.getElementById('search_artist').value;
        ExampleService.searchArtist(name).then(function(result) {
            console.log('result: ', result);
            $ctrl.exampleVariable = result;
            $ctrl.artist = $ctrl.exampleVariable['data']['artists']['items']['0']['id'];
            
            ExampleService.getData().then(function(result) {
                $ctrl.data = result.data;
                $ctrl.data['artists'].push(`${$ctrl.artist}`);
                console.log($ctrl.data);
                ExampleService.postData($ctrl.data);
            });
            
        });
        
        // Update json with artist genres
        ExampleService.getData().then(function(result) {
            $ctrl.data = result.data;
            
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
    this.searchArtist = searchArtist;
    this.postData = postData;
    
    // Search for an artist
    function searchArtist(artist_name) {
        console.log(artist_name);
        return $http({
            method: 'GET',
            url: `https://api.spotify.com/v1/search?q=${artist_name}&type=artist`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer BQBxgZwnyLnLR1JJ-G4ohmRE0R2_75WfweoYWGlzZTIn81rIZDMjfi9mjEx_WHjHN7cUbCvc8-x7wHlr0r8Ugz3aHeUDGUeSgmhDNjdbCY1vlhP5o7CkIPdpQ-vuKoGWVodT-ZqppdKBJM_Dp7tacw'
            }
        })
    }
    
    // Get data
    function getData() {
        return $http({
            method: 'GET',
            url: 'data.json'
        })
    }
    
    // Update data
    function postData(data) {
        $http({
           method: "PUT",
           url: "data.json",
           data: data,
           headers: { 'Content-Type': 'application/json' }
        });
    }
}
ExampleService.$inject = ['$http'];
angular.module('app').service('ExampleService', ExampleService)
/*--------------------- Example Service ---------------------*/



















