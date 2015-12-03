app.controller('AlbumCtrl', function($scope, $http, $q, $rootScope, StatsFactory, PlayerFactory) {

  // load our initial data
  $http.get('/api/albums/')
  .then(res => $http.get('/api/albums/' + res.data[2]._id))
  .then(res => res.data)
  .then(album => {
    album.imageUrl = '/api/albums/' + album._id + '.image';
    album.songs.forEach(function(song){
      song.audioUrl = '/api/songs/' + song._id + '.audio';
    });
    $scope.album = album;
    StatsFactory.totalTime(album)
    .then(function(response){
      $scope.fullDuration = Math.floor(response/60);
    })
  }).catch(console.error.bind(console));

  // main toggle
  //$scope.toggle = PlayerFactory.startToggle();
  $scope.toggle = function (song) {
    if (PlayerFactory.playing) $rootScope.$broadcast('pause');
    else $rootScope.$broadcast('play', song);
  }

  // incoming events (from Player, toggle, or skip)
  $scope.$on('pause', PlayerFactory.pause);
  $scope.$on('play', PlayerFactory.play);
  $scope.$on('next', next);
  $scope.$on('prev', prev);

  // a "true" modulo that wraps negative to the top of the range
  function mod (num, m) { return ((num%m)+m)%m; };

  // jump `val` spots in album (negative to go back)
  function skip (val) {
    if (!PlayerFactory.currentSong) return;
    var idx = $scope.album.songs.indexOf(PlayerFactory.currentSong);
    idx = mod( (idx + (val || 1)), $scope.album.songs.length );
    $rootScope.$broadcast('play', $scope.album.songs[idx]);
  };
  function next () { skip(1); };
  function prev () { skip(-1); };

});
