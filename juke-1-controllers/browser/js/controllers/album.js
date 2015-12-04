app.controller('AlbumCtrl', function($scope, $http, $q, $rootScope, StatsFactory, PlayerFactory, AlbumFactory) {

  $scope.playing = PlayerFactory.isPlaying;
  $scope.currentSong = PlayerFactory.getCurrentSong;
  $scope.toggle = PlayerFactory.resume;
  $scope.next = PlayerFactory.next;
  $scope.prev = PlayerFactory.prev;
  
  AlbumFactory.fetchAll()
  .then(function(album) {
    $scope.album = album.data;
    StatsFactory.totalTime(album)
    .then(function(response){
      $scope.fullDuration = Math.floor(response/60);
    });
  });
});