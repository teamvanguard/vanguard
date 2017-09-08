myApp.factory('UsersService', function($http, $location){
  console.log('UsersService Loaded');

  // avuc.users = []

  var appUsers = [];

  var usersService = {

    appUsers : appUsers,

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

    // Get transactions
    getTransactions: function() {
      console.log('get transactions');
      $http.get('/users/transactions').then(function(response){
        usersService.transactions = response.data
      });
    },

    getUsers : function(){
      console.log('Getting Students');
      $http.get('/users').then(function(response){
        // console.log(response.data);
        var users = response.data
        // console.log(users);
        for (var i = 0; i < users.length; i++) {
          var user = users[i];
          // console.log(user.role);
          if (user.role == ADMIN_ROLE) {
            user.role = 'Admin';
          } else if (user.role == STORE_MANAGER_ROLE) {
            user.role = 'Store Manager';
          } else if (user.role == TEACHER_ROLE) {
            user.role = 'Teacher';
          } else if (user.role == STUDENT_ROLE) {
            user.role = 'Student';
          }
          appUsers.push(user);
        }
        // console.log(avuc.users);
      });
    },
    // Send users' id in url
    deleteUser: function(user){
      console.log('deleteUser');
      $http.delete('/users/' + user.id).then(function(response){
        console.log('user', user.id, 'deleted');
        location.reload();
      });
    } //end of deleteUsers

  } //end of usersService

  return usersService
});
