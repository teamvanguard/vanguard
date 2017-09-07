myApp.controller('AdminViewUsersController', function(UserService, $http, UsersService) {
  console.log('AdminViewUsersController created');
  var avuc = this;
  avuc.userService = UserService;
  avuc.usersService = UsersService
  avuc.newUser = {};

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
        if (user.role == ADMIN_ROLE) {
          user.role = 'Admin';
        } else if (user.role == STORE_MANAGER_ROLE) {
          user.role = 'Store Manager';
        } else if (user.role == TEACHER_ROLE) {
          user.role = 'Teacher';
        } else if (user.role == STUDENT_ROLE) {
          user.role = 'Student';
        }
        avuc.users.push(user);
      }
      console.log(avuc.users);
    });
  }; //end of getUsers

  avuc.getUsers();
  avuc.orderBy = 'role';
  avuc.changeOrderBy = function(property, property2) {
    console.log(property);
    if(avuc.orderBy != property){
      avuc.orderBy = property || property2;
    } else {
      avuc.orderBy = '-' + property;
    }
  } //end of changeOrderBy

});
