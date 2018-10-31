var appControllers = angular.module('app.controllers');

appControllers.controller('EditController', function (TagService, $scope, BookmarkService, Helpers, $stateParams, $state, $modal, CONSTANT, $http, focus, toaster) {

  $scope.editBookmark = {};

  $scope.editBookmarkMessage = null;

  BookmarkService.getBookmark($stateParams.id)
    .then(function (response) {
      $scope.editBookmark = response.data;
    });


  $scope.updateBookmark = function (bookmark) {
    $scope.editBookmarkMessage = null;
    console.log("Bookmark " + JSON.stringify(bookmark));

    var request_body = {
      "link": bookmark.link,
      "description": bookmark.description
    };
    BookmarkService.updateBookmark($stateParams.id, request_body)
      .then(function (response) {

          setTimeout(function () {
            $state.go('list');
          }, 0);
        },
        function (error) {
          console.log("Error");
        }
      );
  }

  $scope.cancelUpdate = function () {
    $state.go('list');
  }



});