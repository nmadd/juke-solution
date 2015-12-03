app.factory('PlayerFactory', function ($q) {
    var playerObj = {};

    // state variables
    playerObj.currentSong;
    playerObj.playing = false;
    playerObj.audio = document.createElement('audio');

    
    // functionality
    playerObj.pause = function () {
        playerObj.playing = false;
        playerObj.audio.pause();
    }

    playerObj.start = function (song){
      playerObj.pause();
      playerObj.playing = true;
      // resume current song
      if (song === playerObj.currentSong) return playerObj.audio.play();
      // enable loading new song
      playerObj.currentSong = song;
      playerObj.audio.src = song.audioUrl;
      playerObj.audio.load();
      playerObj.audio.play();
    };

    playerObj.resume = function (song) {
        if (playerObj.playing){
          playerObj.pause();
          playerObj.playing = false;
        }
        else{
          playerObj.start(song);
          playerObj.playing = true;
        }

     }

    playerObj.isPlaying = function(){
      return playerObj.playing;
    }
    playerObj.getPlaying = function(){
      return playerObj.playing;
    }

     playerObj.getCurrentSong = function(){
      if(!playerObj.currentSong) return null;
      return playerObj.currentSong;
    }

    playerObj.startToggle = function(song){
      return playerObj.toggle(song);
    }
    
  //  playerObj.mod = function(num, m) { return ((num%m)+m)%m; };

  // // jump `val` spots in album (negative to go back)
  //  playerObj.skip = function(val) {
  //   if (!playerObj.currentSong) return;
  //   var idx = $scope.album.songs.indexOf(PlayerFactory.currentSong);
  //   idx = mod( (idx + (val || 1)), $scope.album.songs.length );
  //   $rootScope.$broadcast('play', $scope.album.songs[idx]);
  //  };

  // playerObj.next =function() { skip(1); };
  // playerObj.prev =function() { skip(-1); };
  
  return playerObj;
});