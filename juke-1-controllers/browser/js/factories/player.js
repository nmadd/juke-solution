app.factory('PlayerFactory', function ($q, AlbumFactory) {
    var tempAlbum;

    AlbumFactory.fetchAll()
    .then(function(album) {
        tempAlbum = album.data;
    });

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

    playerObj.resume = function(song) {
        if (playerObj.playing && song === playerObj.currentSong){
          playerObj.pause();
        }
        else{
          playerObj.start(song);
        }
    }

    var count = 0;
    var thisCount = 0;

    playerObj.isPlaying = function(){
      thisCount++;
      return playerObj.playing;
    }

    playerObj.getCurrentSong = function(){
      count++;
      if(!playerObj.currentSong) return null;
      return playerObj.currentSong;
    }
    
    playerObj.mod = function(num, m) { return ((num%m)+m)%m; };

    // jump `val` spots in album (negative to go back)
    playerObj.skip = function(val) {
        if (!playerObj.currentSong) return;
        var idx = tempAlbum.songs.indexOf(playerObj.currentSong) + 1;
        idx = playerObj.mod( (idx + (val || 1)), tempAlbum.songs.length );
        playerObj.start(tempAlbum.songs[idx]);
    };

    playerObj.next = function() { playerObj.skip(1); };
    playerObj.prev = function() { playerObj.skip(-1); };

    return playerObj;
});