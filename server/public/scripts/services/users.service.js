myApp.factory('UsersService', function($http, $location){
  console.log('UserssService Loaded');

  var usersService = {

//send object with email and role properties
    addUser: function(newUser) {
      console.log('addUser');
      if(newUser.email == undefined || newUser.role == undefined || newUser.role == ""){
        console.log('user needs an email and a role!');
      } else {
        $http.post('/users', newUser).then(function(response) {
          console.log('user added');
        });
      }
    },

//send object with email and role properties
    editUser: function(user) {
      console.log('editUser');
      console.log(user);
      $http.put('/users', user).then(function(response) {
        console.log('user role edited');
      });
    },

// Send users' id in url
    deleteUser: function(user){
      console.log('deleteUser');
      $http.delete('/users/' + user.id).then(function(response){
        console.log('user', user.id, 'deleted');
      });
    },

// Get transactions
    getTransactions: function() {
      console.log('get transactions');
      $http.get('/users/transactions').then(function(response){
        usersService.transactions = response.data
      });
    }
  }

  return usersService
});
