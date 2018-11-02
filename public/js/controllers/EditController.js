var appControllers = angular.module('app.controllers');

appControllers.controller('EditController', function ($scope, BookmarkService, Helpers, $stateParams, $state, $modal, CONSTANT, $http, focus, toaster) {

  $scope.editBookmark = {};
  $scope.editBookmarkMessage = null;

  BookmarkService.getBookmark($stateParams.id)
    .then(function (response) {
      $scope.editBookmark = response.data;

    });

  $scope.updateBookmark = function (bookmark) {
    $scope.editBookmarkMessage = null;
    console.log("Bookmark " + JSON.stringify(bookmark));
    if (Helpers.undefined_or_empty(bookmark.link)) {
      $scope.editBookmarkMessage = '****';
      return;
    }
    if (Helpers.undefined_or_empty(bookmark.description)) {
      $scope.editBookmarkMessage = '****';
      return;
    }


    var request_body = {
      "link": bookmark.link,
      "description": bookmark.description
    };
    BookmarkService.updateBookmark($stateParams.id, request_body)
      .then(function (response) {
            $state.go('list');
        },
        function (error) {
          console.log("Error ToDo");
        }
      );
  }

  $scope.cancelUpdate = function () {
    $state.go('list');
  }

});