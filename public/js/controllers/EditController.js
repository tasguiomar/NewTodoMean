var appControllers=angular.module('app.controllers');

appControllers.controller('EditController',function(TagService,$scope,BookmarkService,Helpers,$stateParams,$state,$modal,CONSTANT,$http,focus,toaster){

    $scope.editBookmark={};         
          
    $scope.editBookmarkMessage=null;

    BookmarkService.getBookmark($stateParams.id)
    .then(function(response){
       $scope.editBookmark=response.data;

      
    });


    



    $scope.updateBookmark=function(bookmark){
      $scope.editBookmarkMessage=null;
      console.log("Bookmark "+JSON.stringify(bookmark));
       if(Helpers.undefined_or_empty(bookmark.link)){$scope.editBookmarkMessage='Nay! looks like you forgot bookmark link'; return;}
       if(Helpers.undefined_or_empty(bookmark.description)){$scope.editBookmarkMessage='Please fill in bookmark description'; return;}
      
       var request_body={"link":bookmark.link,"description":bookmark.description};
       BookmarkService.updateBookmark($stateParams.id,request_body)
       .then(function(response){
               toaster.pop('success','Bookmark updated successfully');
               setTimeout(function(){$state.go('list');},2000);
            },
            function(error){ console.log("Error while updating bookmark"); }
          );
    }



    $scope.cancelUpdate=function(){
           $state.go('list');
    }

    

});


