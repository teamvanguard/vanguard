myApp.controller('AdminViewUsersController', function(UserService, $http, UsersService) {
  console.log('AdminViewUsersController created');
  var avuc = this;
  avuc.userService = UserService;
  avuc.usersService = UsersService
  avuc.newUser = {};
  // avuc.newUser.role = 2;
  avuc.getUsers = function(){
    avuc.users = []
    console.log('Getting Students');
    $http.get('/users').then(function(response){
      console.log(response.data);
      var users = response.data
      console.log(users);
      for (var i = 0; i < users.length; i++) {
        var user = users[i];
        console.log(user.role);
        if (user.role == 1) {
          user.role = 'Admin';
        } else if (user.role == 2) {
          user.role = 'Store Manager';
        } else if (user.role == 3) {
          user.role = 'Teacher';
        } else if (user.role == 4) {
          user.role = 'Student';
        }
        avuc.users.push(user);
      }
      console.log(avuc.users);
    });
  };
  avuc.getUsers();
  avuc.orderBy = 'role';
  avuc.changeOrderBy = function(property, property2) {
    if(avuc.orderBy != property){
      avuc.orderBy = property;
    } else {
      avuc.orderBy = '-' + property;
    }

  }
  //send object with email and role properties
  // avuc.addUser = function(newUser) {
  //   console.log(newUser);
  //   $http.post('/users', newUser).then(function(response) {
  //     console.log(response);
  //   });
  // };
  // //send object with email and role properties
  // avuc.editRole = function(user) {
  //   console.log(user);
  //   $http.put('/users', user).then(function(response) {
  //     console.log(response);
  //   });
  // };
  // avuc.deleteUser = function(user){
  //   console.log(user);
  //   $http.delete('/users/' + user.id).then(function(response){
  //     console.log(response);
  //   });
  // };
});
