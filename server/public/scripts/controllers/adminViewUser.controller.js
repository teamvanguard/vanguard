myApp.controller('AdminViewUserController', function(UserService, $http) {
  console.log('AdminViewUserController created');
  var avuc = this;
  avuc.userService = UserService;
  avuc.addUser = function(newUser) {
    console.log(newUser);
    $http.post('/users', newUser).then(function(response) {
      console.log(response);
    });
  };
  avuc.editRole = function(user) {
    console.log(user);
    $http.put('/users', user).then(function(response) {
      console.log(response);
    });
  };
});
