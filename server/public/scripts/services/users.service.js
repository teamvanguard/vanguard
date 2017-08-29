myApp.factory('UsersService', function($http, $location){
  console.log('UserssService Loaded');

  var itemsService = {

//send object with email and role properties
    addUser: function(newUser) {
      console.log(newUser);
      $http.post('/users', newUser).then(function(response) {
        console.log(response);
      });
    },

//send object with email and role properties
    editRole: function(user) {
      console.log(user);
      $http.put('/users', user).then(function(response) {
        console.log(response);
      });
    },

// Send users' id in url
    deleteUser: function(user){
      console.log(user);
      $http.delete('/users/' + user.id).then(function(response){
        console.log(response);
      });
    }
  }

  return itemsService
});
