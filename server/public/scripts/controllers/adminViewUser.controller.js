myApp.controller('AdminViewUserController', function(UserService, $http) {
  console.log('AdminViewUserController created');
  var avuc = this;
  avuc.userService = UserService;
  //send object with email and role properties
  avuc.addUser = function(newUser) {
    console.log(newUser);
    $http.post('/users', newUser).then(function(response) {
      console.log(response);
    });
  };
  //send object with email and role properties
  avuc.editRole = function(user) {
    console.log(user);
    $http.put('/users', user).then(function(response) {
      console.log(response);
    });
  };
  avuc.deleteUser = function(user){
    console.log(user);
    $http.delete('/users/' + user.id).then(function(response){
      console.log(response);
    });
  };
});
