myApp.factory('UserService', function($http, $location){
  console.log('UserService Loaded');

  var userObject = {};

  return {
    userObject : userObject,

    getuser : function(){
      console.log('UserService -- getuser');
      $http.get('/user').then(function(response) {
          if(response.data.username) {
              // user has a curret session on the server
              // console.log(response.data);
              userObject.info = response.data;
              // console.log(userObject);
              // console.log(response.data);
              userObject.userName = response.data.username;
              // console.log('UserService -- getuser -- User Data: ', userObject.userName);
              if($location.$$path == '/user'){
              if(userObject.info.role == ADMIN_ROLE){
                $location.path("/adminusers");
              }else if (userObject.info.role == STORE_MANAGER_ROLE) {
                $location.path("/storefront");
              }else if (userObject.info.role == TEACHER_ROLE) {
                $location.path("/teachers");
              }else if (userObject.info.role == STUDENT_ROLE) {
                $location.path("/student");
              }else {
                $location.path("/user");
              }
          }

          } else {
              console.log('UserService -- getuser -- failure');
              // user has no session, bounce them back to the login page
              $location.path("/home");
          }
      },function(response){
        console.log('UserService -- getuser -- failure: ', response);
        $location.path("/home");
      });
    },

    logout : function() {
      console.log('UserService -- logout');
      $http.get('/user/logout').then(function(response) {
        console.log('UserService -- logout -- logged out');
        $location.path("/home");
      });
    }
  };
});
