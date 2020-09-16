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
    
    // Keep history of user searches
    $ctrl.history = [];
    
    // Search for an artist
    $ctrl.searchArtist = function() {
        var name = document.getElementById('search_artist').value;
        ExampleService.searchArtist(name).then(function(result) {
            // Search Spotify database for artist name
            console.log('result: ', result);
            $ctrl.searchResult = result;
            $ctrl.artist = $ctrl.searchResult['data']['artists']['items']['0'];
            $ctrl.artistID = $ctrl.searchResult['data']['artists']['items']['0']['id'];
            
            // Update search history with artist object
            $ctrl.history.push($ctrl.artist);
            console.log($ctrl.history);
            
            // Example of how to load json data
            /*
            ExampleService.getData().then(function(result) {
                $ctrl.data = result.data;
                $ctrl.data['artists'].push(`${$ctrl.artist}`);
                console.log($ctrl.data);
            });
            */
        });
    }
    
}]);

/*--------------------- Home Component ---------------------*/






/*--------------------- Artist Block Component ---------------------*/

const artistblock = {
    templateUrl: './artistblock/artistblock.html',
    controller: 'ArtistBlockController',
    bindings: {
        artist: '<'
    }
}

// Artist Block Component with Routing (Routed / Stateful)
angular.module('app').component('artistblock', artistblock)

// Artist Block Controller with dependency injection using $inject method
function ArtistBlockController(ExampleService) {

}
ArtistBlockController.$inject = ['ExampleService'];
angular.module('app').controller('ArtistBlockController', ArtistBlockController);

/*--------------------- Artist Block Component ---------------------*/

/*--------------------- History Component ---------------------*/

const history = {
    templateUrl: './history/history.html',
    controller: 'HistoryController',
    bindings: {
        artists: '<'
    }
}

// Artist Block Component with Routing (Routed / Stateful)
angular.module('app').component('history', history)

// Artist Block Controller with dependency injection using $inject method
function HistoryController(ExampleService) {

}
HistoryController.$inject = ['ExampleService'];
angular.module('app').controller('HistoryController', HistoryController);

/*--------------------- History Component ---------------------*/






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
                'Authorization': 'Bearer BQBZY5fnL5NjQNs-2j2faSWMPv0106__MP_X_SUDuVu8tOwRa8Z0vbth0eQtRzzbVCeBYkS7NUx789M0u1dr8r_CGvUcakjcWGv_drpYvV5GJps2CxmLQ_7JULYIL9vieQ19EfY6AS26IHqZ2ktabA'
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



















