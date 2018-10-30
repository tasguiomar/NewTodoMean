var appControllers=angular.module('app.controllers');

appControllers.controller('BookmarkController',function(BookmarkService,TagService,Storage,focus,$scope,CONSTANT,Helpers,toaster,$state){
    $scope.bookmark={};
   
    
    $scope.bookmarkMessage=null;


  $scope.createBookmark=function(bookmark){
    $scope.bookmarkMessage=null;
     if(Helpers.undefined_or_empty(bookmark.link)){$scope.bookmarkMessage='Nay! looks like you forgot bookmark link'; return;}
     if(Helpers.undefined_or_empty(bookmark.description)){$scope.bookmarkMessage='Please fill in bookmark description'; return;}
  
     var post_body={"link":bookmark.link,"description":bookmark.description,
                       "created_at":Date.now().toString(),"created_by":Storage.getUsername()};

     BookmarkService.createBookmark(post_body)
     .then(function(response){
             toaster.pop('success','Bookmark created successfully');
             setTimeout(function(){$scope.bookmarkModal.hide();$scope.showBookmarks();},2000);
          },
          function(error){console.log("Error while creating bookmark"); }
        );
  }

  $scope.deleteBookmark=function(_id){
      BookmarkService.deleteBookmark(_id)
         .then(function(response){
                $scope.deleteBookmarkModal.hide();
                toaster.pop("success","Bookmark deleted successfully");
                setTimeout(function(){$scope.showBookmarks();},2000);
              });
   }

});
