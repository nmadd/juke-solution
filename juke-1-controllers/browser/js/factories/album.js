app.factory('AlbumFactory', function ($http) {
  return {
    fetchAll: function() {
      return $http.get('/api/albums/')
      .then(function(response) {
        return $http.get('/api/albums/' + response.data[2]._id);
      })
      .then(function(album) {
        album.data.imageUrl = '/api/albums/' + album.data._id + '.image';
        album.data.songs.forEach(function(song){
          song.audioUrl = '/api/songs/' + song._id + '.audio';
        });
        return album;
      });
    }
  }
});