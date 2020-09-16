/* Creating the module, passing array of other dependent modules */
angular.module('app', ['ngMaterial', 'ngMessages']);





/*--------------------- Home Component ---------------------*/

// the child component will have the bindings
const home = {
    templateUrl: './home/home.html',
    controller: 'HomeController',
    bindings: {
        data: '<',
        onClick: '&'
    }
}

// Home Component with Routing (Routed / Stateful), registering a component to the module
angular.module('app').component('home', home);

// Home Controller with dependency injection using the array method
angular.module('app').controller('HomeController', ['ExampleService', function (ExampleService) {
    const $ctrl = this;
    console.log('example service: ', ExampleService);
    
    // Keep history of user searches
    $ctrl.history = [];
    
    $ctrl.searchArtist = function() {
        
        // Get artist information
        var name = document.getElementById('search_artist').value;
        ExampleService.searchArtist(name).then(function(result) {
            console.log('result: ', result);
            $ctrl.exampleVariable = result;
            $ctrl.artist = $ctrl.exampleVariable['data']['artists']['items']['0']['id'];
            
            $ctrl.history.push($ctrl.artist);
            console.log($ctrl.history);
            
            ExampleService.getData().then(function(result) {
                $ctrl.data = result.data;
                $ctrl.data['artists'].push(`${$ctrl.artist}`);
                console.log($ctrl.data);
                ExampleService.postData($ctrl.data);
            });
            
        });
        
    }
    
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
// 'this' refers to example service

function ExampleService($http) {
    
    // Method declarations
    this.getData = getData;
    this.searchArtist = searchArtist;
    this.postData = postData;
    
    // Method: Search for an artist
    function searchArtist(artist_name) {
        console.log(artist_name);
        return $http({
            method: 'GET',
            url: `https://api.spotify.com/v1/search?q=${artist_name}&type=artist`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer BQAWLt6AO78XQyb8_uQNk1_Etl1iZu9DO_sVAM1MY9YhWGJuWxCJ-1OXQJnoAvp4kaRXAlLoqRY5nUGXJ_O6SYUWKrWYsED7xpKjSf-q6b7g-r9M5Z6CkK-z_yTYiQ1IF2vfaaxEYV2kkm7yIoToBQ'
            }
        })
    }
    
    // Method: Get data from json file
    function getData() {
        return $http({
            method: 'GET',
            url: 'data.json'
        })
    }
    
    // Method: Update data in json file
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
