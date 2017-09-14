myApp.controller('AdminViewUsersController', function(UserService, $http, UsersService) {
  console.log('AdminViewUsersController created');
  var avuc = this;
  avuc.userService = UserService;
  avuc.usersService = UsersService;
  avuc.newUser = {};

//dropdown list when editing user role 
  avuc.roleList = [
    {value: ADMIN_ROLE, text: 'Admin'},
    {value: STORE_MANAGER_ROLE, text: 'Store Manager'},
    {value: TEACHER_ROLE, text: 'Teacher'},
    {value: STUDENT_ROLE, text: 'Student'}
  ];

  avuc.usersService.getUsers();

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
