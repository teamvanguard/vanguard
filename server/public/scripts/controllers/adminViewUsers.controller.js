myApp.controller('AdminViewUsersController', function(UserService, $http, UsersService) {
  console.log('AdminViewUsersController created');
  var avuc = this;
  avuc.userService = UserService;
  avuc.usersService = UsersService;
  avuc.newUser = {};

  avuc.roleList = [
    {value: '1', text: 'Admin'},
    {value: '2', text: 'Store Manager'},
    {value: '3', text: 'Teacher'},
    {value: '4', text: 'Student'}
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
