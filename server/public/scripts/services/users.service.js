myApp.factory('UsersService', function($http, $location){
  console.log('UserssService Loaded');

  var usersService = {

//send object with email and role properties
    addUser: function(newUser) {
      console.log(newUser);
      if(newUser.email == undefined || newUser.role == undefined || newUser.role == ""){
        console.log('user needs an email and a role!');
      } else {
        $http.post('/users', newUser).then(function(response) {
          console.log(response);
        });
      }
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
    },

// Get transactions
    getTransactions: function() {
      console.log('get transactions');
      $http.get('/users/transactions').then(function(response){
        console.log(response.data);
        usersService.transactions = response.data
      });
    }
  }

  return usersService
});
