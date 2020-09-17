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
    
    // Add popular spotify playlists when page loads 
    angular.element(document).ready(function () {
        ExampleService.getData().then(function(result) {
            $ctrl.data = result.data; 
            
            // get playlist ids from data.json
            $ctrl.usTop = $ctrl.data['us-top-50']; 
            $ctrl.globalTop = $ctrl.data['global-top-50'];
            $ctrl.globalViral = $ctrl.data['global-viral-50'];
            $ctrl.base = "https://open.spotify.com/embed/playlist/"; 
            
            // set html soures to load playlists
            document.getElementById('usTop').src = $ctrl.base + $ctrl.data['us-top-50']; 
            document.getElementById('globalTop').src = $ctrl.base + $ctrl.data['global-top-50']; 
            document.getElementById('globalViral').src = $ctrl.base + $ctrl.data['global-viral-50']; 
        }); 
    }); 
    
    $ctrl.searchArtist = function() {
        var name = document.getElementById('search_artist').value;
        ExampleService.searchArtist(name).then(function(result) {
            // Search Spotify database for artist name
            console.log('result: ', result);
            $ctrl.searchResult = result;
            $ctrl.artist = $ctrl.searchResult['data']['artists']['items']['0'];
            $ctrl.artistID = $ctrl.searchResult['data']['artists']['items']['0']['id'];
            
            // update search history with artist object
            $ctrl.history.push($ctrl.artist);
            console.log($ctrl.history);
            
            /*
            ExampleService.getData().then(function(result) {
                $ctrl.data = result.data;
                $ctrl.data['artists'].push(`${$ctrl.artist}`);
                console.log($ctrl.data);
                ExampleService.postData($ctrl.data);
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
        artist: '<',
        onClick: '&'
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

var colorPicker = 0; 

// Artist Block Controller with dependency injection using $inject method
function HistoryController(ExampleService) {
    this.notifyClick = function(event) {
        console.log(event);
        console.log("CLICKED");
        var allBlocks = document.getElementsByClassName("blocks");
        var i; 
        for (i = 0; i < allBlocks.length; i ++) {
            if (colorPicker % 2 == 0) {
                allBlocks[i].style.backgroundColor = "#55bbe9"; 
            } else {
                allBlocks[i].style.backgroundColor = "#64ab1d"; 
            }
        }
        colorPicker += 1; 
    }
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
    
    // Method: Search for an artist
    function searchArtist(artist_name) {
        console.log(artist_name);
        return $http({
            method: 'GET',
            url: `https://api.spotify.com/v1/search?q=${artist_name}&type=artist`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer BQCdvu9oJ1WTjRTBEP_0Z6oMU-cvX3Od4MinnAjvtsfmR27FGgTWlPP4FCYT7u4PRdRU0Kcz6XMOh2mvyBuz7qlY695feJtRq04H3XqoPTAEsvYON3mWMdZeH5lhJqNLlK19YVdQwoe4qxjVawCKNw'
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
    
}

ExampleService.$inject = ['$http'];
angular.module('app').service('ExampleService', ExampleService)

/*--------------------- Example Service ---------------------*/
