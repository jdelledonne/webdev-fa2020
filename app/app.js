/* Creating the module, passing array of other dependent modules */
angular.module('app', ['ngMaterial', 'ngMessages']);

/*--------------------- Home Component ---------------------*/

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
angular.module('app').controller('HomeController', ['SpotifyService', function (SpotifyService) {
    const $ctrl = this;
    
    // Keep history of user searches
    $ctrl.history = [];
    
    // Add popular spotify playlists when page loads 
    angular.element(document).ready(function () {
        SpotifyService.getData().then(function(result) {
            $ctrl.data = result.data; 
            
            // get playlist ids from data.json
            $ctrl.usTop = $ctrl.data['us-top-50']; 
            $ctrl.globalTop = $ctrl.data['global-top-50'];
            $ctrl.globalViral = $ctrl.data['global-viral-50'];
            $ctrl.base = "https://open.spotify.com/embed/playlist/"; 
            
            // set html sources to load playlists
            document.getElementById('usTop').src = $ctrl.base + $ctrl.data['us-top-50']; 
            document.getElementById('globalTop').src = $ctrl.base + $ctrl.data['global-top-50']; 
            document.getElementById('globalViral').src = $ctrl.base + $ctrl.data['global-viral-50']; 
        }); 
    }); 
    
    // Search for an artist using Spotify API Search feature
    $ctrl.searchArtist = function() {
        var name = document.getElementById('search_artist').value;
        SpotifyService.searchArtist(name).then(function(result) {
            // Search Spotify database for artist name
            console.log('result: ', result);
            $ctrl.searchResult = result;
            $ctrl.artist = $ctrl.searchResult['data']['artists']['items']['0'];
            $ctrl.artistID = $ctrl.searchResult['data']['artists']['items']['0']['id'];
            
            // update search history with artist object
            $ctrl.history.push($ctrl.artist);
            console.log($ctrl.history);
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
function ArtistBlockController(SpotifyService) {

}
ArtistBlockController.$inject = ['SpotifyService'];
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
function HistoryController(SpotifyService) {
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
HistoryController.$inject = ['SpotifyService'];
angular.module('app').controller('HistoryController', HistoryController);

/*--------------------- History Component ---------------------*/






/*--------------------- Spotify Service ---------------------*/

function SpotifyService($http) {
    
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
                'Authorization': 'Bearer BQCwOzpY-DkQG1MiDqQBBmwgmGMSmK37Wz9HfQww5ieBGS9jAUCxVopJU324VB8y1TytWjZ6GWFBj5Xn1sPm_JJbRqNbdsquChCmy-bbHMLPEPs-VXvXryRDuUYZQYNTdwG_bMutebQeCWYL7vMaYQ'
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

SpotifyService.$inject = ['$http'];
angular.module('app').service('SpotifyService', SpotifyService)

/*--------------------- Spotify Service ---------------------*/
