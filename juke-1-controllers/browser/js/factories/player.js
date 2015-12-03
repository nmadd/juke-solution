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

    playerObj.play = function (event, song){
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

    return playerObj;
});