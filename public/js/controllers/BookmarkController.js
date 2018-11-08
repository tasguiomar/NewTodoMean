var appControllers = angular.module('app.controllers');

appControllers.controller('BookmarkController', function (BookmarkService, Storage, focus, $scope, CONSTANT, Helpers, toaster, $state) {
  $scope.bookmark = {};


  $scope.bookmarkMessage = null;

  $scope.createBookmark = function (bookmark) {
    $scope.bookmarkMessage = null;



    if (Helpers.undefined_or_empty(bookmark.description)) {
      $scope.bookmarkMessage = '**Name';
      return;
    }
    if (Helpers.undefined_or_empty(bookmark.link)) {
      $scope.bookmarkMessage = '**Description';
      return;
    }
   
    var post_body = {
      "link": bookmark.link,
      "description": bookmark.description,
      "created_at": Date.now().toString(),
      "created_by": Storage.getUsername()
    };

    BookmarkService.createBookmark(post_body)
      .then(function (response) {
            $scope.bookmarkModal.hide();
            $scope.showBookmarks();
        },
        function (error) {
          console.log("Error while creating ToDo");
        }
      );
  }

  $scope.deleteBookmark = function (_id) {
    BookmarkService.deleteBookmark(_id)
      .then(function (response) {
        $scope.deleteBookmarkModal.hide();
          $scope.showBookmarks();
      });
  }

});